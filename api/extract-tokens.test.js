import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are a medical triage token extractor.
You receive a free-text symptom description in Romanian or English.
Map it to known symptom token IDs and return ONLY a valid JSON array of strings.
No explanation, no markdown, no code blocks — just the raw JSON array.

CRITICAL tokens (higher severity — prefer these over GENERAL if both could match):
SYM_CHEST_PAIN_TYPICAL, SYM_BREATHING_DIFFICULTY, SYM_NEURO_DEFICIT,
SYM_HEADACHE_SEVERE, SYM_VISION_LOSS, SYM_TESTICULAR_PAIN,
SYM_TRAUMA_HIGH_KINETIC, SYM_TOXIC_INGESTION, SYM_EYE_CHEM, SYM_VAGINAL_BLEEDING_PREG

GENERAL tokens:
SYM_ABDO_PAIN, SYM_VOMIT_DIARRHEA, SYM_CHEST_PAIN_ATYPICAL, SYM_SYNCOPE,
SYM_VAGINAL_BLEEDING, SYM_FLANK_PAIN, SYM_FOREIGN_BODY_INGESTED, SYM_FEVER,
SYM_PALPITATIONS, SYM_TRAUMA_LIMB, SYM_TRAUMA_HEAD, SYM_BACK_PAIN,
SYM_URINARY_SYMPTOMS, SYM_GYN_PAIN, SYM_SKIN_INFECTION, SYM_HEADACHE_MILD,
SYM_FOREIGN_BODY_EXTERNAL, SYM_CONSTIPATION, SYM_GENERAL_MALAISE, SYM_CUT_COMPLEX,
SYM_CUT_MINOR, SYM_ANIMAL_BITE, SYM_RESPIRATORY_INF, SYM_DENTAL_PAIN, SYM_REFILL_ADMIN

Rules:
- Return only IDs from the lists above
- Return [] if nothing matches
- A symptom can match multiple tokens
- Do NOT invent new IDs`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction: SYSTEM_PROMPT,
  generationConfig: { responseMimeType: 'application/json' },
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateWithRetry(prompt, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await model.generateContent(prompt);
    } catch (err) {
      if (err?.status === 429 && attempt < maxRetries) {
        const delayStr = err?.errorDetails?.find((d) => d.retryDelay)?.retryDelay ?? '60s';
        const delaySec = parseInt(delayStr.replace('s', ''), 10);
        console.log(`Rate limited. Waiting ${delaySec}s then retrying (attempt ${attempt}/${maxRetries})...`);
        await sleep(delaySec * 1000);
      } else {
        throw err;
      }
    }
  }
}

const ROMANIAN_CASES = [
  'ma doare tot corpul si am febra si nu pot dormi de 3 zile.',
  'am o iriatie la ochi de cateva zile, e ros si ma mananca ingrozitor.',
  'nu am febra dar ma simt foarte obosit si fara energie de o saptamana.',
  'am avut dureri de burta ieri dar acum e mai bine, poate mai vin.',
  'ceva nu e ok cu mine, am un sentiment ciudat in piept dar nu ma doare.',
  'ma doare capul groaznic de ieri si am si greata.',
  'am o taietura adanca la deget de la un accident in bucatarie.',
  'am urinat cu sange ieri si ma doare si spatele.',
  'am mancat ceva stricat si am diaree si varsaturi de azi dimineata.',
  'am cazut de pe bicicleta si ma doare piciorul, nu pot calca pe el.',
];

const ENGLISH_CASES = [
  'i feel terrible all over my body and i have a fever and i cant sleep.',
  'i have a rash on my arm that has been spreading for 3 days now.',
  'no fever but i feel extremely tired and weak for about a week.',
  'i had bad stomach pain yesterday but it went away, might come back.',
  'something feels off in my chest but it doesnt really hurt just weird.',
  'i have a terrible headache since yesterday and i feel nauseous.',
  'i have a deep cut on my finger from cooking this morning.',
  'i noticed blood in my urine yesterday and my back hurts.',
  'i ate something bad and have been vomiting and having diarrhea since this morning.',
  'i fell off my bike and my leg hurts a lot, i cannot walk properly.',
];

async function runCase(label, symptoms) {
  let rawText;
  try {
    const result = await generateWithRetry(`Patient symptoms: "${symptoms}"`);
    rawText = result.response.text();
    const tokens = JSON.parse(rawText);
    console.log(`${label} -> [${tokens.join(', ')}]`);
    console.log(`   "${symptoms}"`);
  } catch (err) {
    console.log(`${label} -> ERROR: ${err?.message}`);
    console.log(`   "${symptoms}"`);
    if (rawText !== undefined) {
      console.log(`   RAW RESPONSE: ${JSON.stringify(rawText)}`);
    }
  }
}

const DELAY_BETWEEN_CASES_MS = 20000;

console.log('--- Romanian ---');
for (let i = 0; i < ROMANIAN_CASES.length; i++) {
  await runCase(`RO${i + 1}`, ROMANIAN_CASES[i]);
  await sleep(DELAY_BETWEEN_CASES_MS);
}

console.log('\n--- English ---');
for (let i = 0; i < ENGLISH_CASES.length; i++) {
  await runCase(`EN${i + 1}`, ENGLISH_CASES[i]);
  await sleep(DELAY_BETWEEN_CASES_MS);
}
