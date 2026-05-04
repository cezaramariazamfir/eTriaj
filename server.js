import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

app.post('/api/extract-tokens', async (req, res) => {
  const { symptoms } = req.body;
  if (!symptoms?.trim()) {
    return res.status(400).json({ error: 'No symptoms provided' });
  }

  try {
    const result = await generateWithRetry(`Patient symptoms: "${symptoms}"`);
    const text = result.response.text();
    const tokens = JSON.parse(text);
    console.log('Symptoms:', symptoms);
    console.log('Tokens:', tokens);
    res.json({ tokens });
  } catch (err) {
    console.error('Gemini error:', err?.status, err?.message);
    res.status(500).json({ error: 'Token extraction failed after retries.' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
