import type { TokenEntry } from './types';

export const GENERAL_TOKENS: TokenEntry[] = [

  // ── ESI 3 default (2+ distinct resource types) ───────────────────────────

  {
    id: 'SYM_ABDO_PAIN',
    description_ro: 'Durere abdominală, orice cadran',
    description_en: 'Abdominal pain, any quadrant',
    is_critical: false,
    base_resources: 2,
    resource_types: ['labs', 'imaging'],
    context_modifiers: [
      { condition: 'IS_OBSTETRIC_RISK', action: 'UPGRADE_ESI_2',  reason: { ro: 'Sarcină/postpartum + durere abdominală — risc ectopic, preeclampsie', en: 'Pregnancy/postpartum + abdominal pain — ectopic, preeclampsia risk' } },
      { condition: 'PAIN_ALERT',        action: 'UPGRADE_ESI_2',  reason: { ro: 'Durere severă sistemică — risc hipoperfuzie', en: 'Severe systemic pain — hypoperfusion risk' } },
      { condition: 'AGE_GT_65',         action: 'UPGRADE_ESI_2',  reason: { ro: 'Vârstnic — subtriaj 52%, patologie vasculară frecventă', en: 'Elderly — 52% undertriage rate, frequent vascular pathology' } },
      { condition: 'IS_IMMUNO',         action: 'FLAG_HIGH_RISK', reason: { ro: 'Imunocompromis — prezentare atipică posibilă', en: 'Immunocompromised — atypical presentation possible' } },
    ],
  },

  {
    id: 'SYM_VOMIT_DIARRHEA',
    description_ro: 'Vărsături, diaree, deshidratare',
    description_en: 'Vomiting, diarrhea, dehydration',
    is_critical: false,
    base_resources: 2,
    resource_types: ['labs', 'iv_fluids'],
    context_modifiers: [
      { condition: 'IS_IMMUNO',         action: 'UPGRADE_ESI_2',  reason: { ro: 'Imunocompromis + deshidratare — risc sepsis enteric', en: 'Immunocompromised + dehydration — enteric sepsis risk' } },
      { condition: 'IS_OBSTETRIC_RISK', action: 'UPGRADE_ESI_2',  reason: { ro: 'Sarcină + vărsături severe — risc hiperemezie/deshidratare critică', en: 'Pregnancy + severe vomiting — hyperemesis/critical dehydration risk' } },
      { condition: 'AGE_LT_28_DAYS',   action: 'UPGRADE_ESI_2',  reason: { ro: 'Nou-născut — deshidratarea progresează rapid', en: 'Neonate — dehydration progresses rapidly' } },
      { condition: 'AGE_GT_65',         action: 'FLAG_HIGH_RISK', reason: { ro: 'Vârstnic — rezervă renală redusă, deshidratare periculoasă', en: 'Elderly — reduced renal reserve, dangerous dehydration' } },
    ],
  },

  {
    id: 'SYM_CHEST_PAIN_ATYPICAL',
    description_ro: 'Junghi toracic, durere perete toracic',
    description_en: 'Atypical chest pain, chest wall pain',
    is_critical: false,
    base_resources: 2,
    resource_types: ['ekg', 'rx'],
    context_modifiers: [
      { condition: 'IS_OBSTETRIC_RISK', action: 'UPGRADE_ESI_2', reason: { ro: 'Sarcină + durere toracică — risc embolie pulmonară', en: 'Pregnancy + chest pain — pulmonary embolism risk' } },
      { condition: 'PAIN_ALERT',        action: 'UPGRADE_ESI_2', reason: { ro: 'Durere severă — posibil SCA atipic', en: 'Severe pain — possible atypical ACS' } },
      { condition: 'AGE_GT_65',         action: 'UPGRADE_ESI_2', reason: { ro: 'Vârstnic — prezentare atipică SCA frecventă', en: 'Elderly — atypical ACS presentation is common' } },
    ],
  },

  {
    id: 'SYM_SYNCOPE',
    description_ro: 'Istoric leșin, acum conștient',
    description_en: 'History of syncope, now conscious',
    is_critical: false,
    base_resources: 2,
    resource_types: ['ekg', 'labs'],
    context_modifiers: [
      { condition: 'IS_BLOOD_THINNER',  action: 'UPGRADE_ESI_2', reason: { ro: 'Leșin pe anticoagulante — risc hemoragie/aritmie fatală', en: 'Syncope on anticoagulants — hemorrhage/fatal arrhythmia risk' } },
      { condition: 'IS_OBSTETRIC_RISK', action: 'UPGRADE_ESI_2', reason: { ro: 'Leșin în sarcină — instabilitate hemodinamică', en: 'Syncope in pregnancy — hemodynamic instability' } },
      { condition: 'AGE_GT_65',         action: 'UPGRADE_ESI_2', reason: { ro: 'Vârstnic — aritmie fatală posibilă cu semne vitale normale', en: 'Elderly — fatal arrhythmia possible with normal vital signs' } },
    ],
  },

  {
    id: 'SYM_VAGINAL_BLEEDING',
    description_ro: 'Sângerare vaginală (pacientă non-gravidă)',
    description_en: 'Vaginal bleeding (non-pregnant patient)',
    is_critical: false,
    base_resources: 2,
    resource_types: ['labs', 'consult'],
    context_modifiers: [
      { condition: 'IS_BLOOD_THINNER',  action: 'UPGRADE_ESI_2', reason: { ro: 'Anticoagulant + sângerare — risc hemoragie necontrolată', en: 'Anticoagulant + bleeding — uncontrolled hemorrhage risk' } },
      { condition: 'IS_OBSTETRIC_RISK', action: 'UPGRADE_ESI_2', reason: { ro: 'Postpartum + sângerare — risc hemoragie puerperală', en: 'Postpartum + bleeding — puerperal hemorrhage risk' } },
    ],
  },

  {
    id: 'SYM_FLANK_PAIN',
    description_ro: 'Durere rinichi / flanc, colic renal',
    description_en: 'Flank pain, renal colic',
    is_critical: false,
    base_resources: 3,
    resource_types: ['urine', 'echo', 'meds_iv'],
    context_modifiers: [
      { condition: 'IS_IMMUNO',        action: 'UPGRADE_ESI_2', reason: { ro: 'Imunocompromis + durere flanc — risc pionefrită severă', en: 'Immunocompromised + flank pain — severe pyelonephritis risk' } },
      { condition: 'IS_BLOOD_THINNER', action: 'UPGRADE_ESI_2', reason: { ro: 'Anticoagulant + colic renal — hematom retroperitoneal posibil', en: 'Anticoagulant + renal colic — retroperitoneal hematoma possible' } },
      { condition: 'PAIN_ALERT',       action: 'UPGRADE_ESI_2', reason: { ro: 'Durere severă — colic complicat sau patologie vasculară', en: 'Severe pain — complicated colic or vascular pathology' } },
      { condition: 'AGE_GT_65',        action: 'UPGRADE_ESI_2', reason: { ro: 'Vârstnic — anevrism aortic abdominal în diagnostic diferențial', en: 'Elderly — abdominal aortic aneurysm in differential diagnosis' } },
    ],
  },

  {
    id: 'SYM_FOREIGN_BODY_INGESTED',
    description_ro: 'Corp străin înghițit sau abdominal (risc perforație/obstrucție)',
    description_en: 'Ingested or abdominal foreign body (perforation/obstruction risk)',
    is_critical: false,
    base_resources: 2,
    resource_types: ['procedure', 'imaging'],
    context_modifiers: [
      { condition: 'AGE_LT_28_DAYS', action: 'UPGRADE_ESI_2',  reason: { ro: 'Nou-născut — orice ingestie corp străin = urgență chirurgicală', en: 'Neonate — any foreign body ingestion = surgical emergency' } },
      { condition: 'AGE_GT_65',      action: 'FLAG_HIGH_RISK', reason: { ro: 'Vârstnic — risc perforație crescut, peristaltism redus', en: 'Elderly — increased perforation risk, reduced peristalsis' } },
    ],
  },

  {
    id: 'SYM_SKIN_INFECTION',
    description_ro: 'Abces, furuncul, zonă roșie/umflată',
    description_en: 'Abscess, furuncle, erythema and swelling',
    is_critical: false,
    base_resources: 2,
    resource_types: ['procedure', 'abx'],
    context_modifiers: [
      { condition: 'IS_IMMUNO',       action: 'UPGRADE_ESI_2',  reason: { ro: 'Imunocompromis + infecție cutanată — risc fasciită necrozantă, sepsis', en: 'Immunocompromised + skin infection — necrotizing fasciitis, sepsis risk' } },
      { condition: 'AGE_LT_28_DAYS', action: 'UPGRADE_ESI_2',  reason: { ro: 'Nou-născut — orice infecție cutanată poate fi sepsis', en: 'Neonate — any skin infection may indicate sepsis' } },
      { condition: 'AGE_GT_65',       action: 'FLAG_HIGH_RISK', reason: { ro: 'Vârstnic — răspuns inflamator atenuat, sepsis subclinic posibil', en: 'Elderly — attenuated inflammatory response, subclinical sepsis possible' } },
    ],
  },

  // ── ESI 4 default (1 distinct resource type) ─────────────────────────────

  {
    id: 'SYM_FEVER',
    description_ro: 'Febră raportată sau măsurată',
    description_en: 'Reported or measured fever',
    is_critical: false,
    base_resources: 1,
    resource_types: ['labs'],
    context_modifiers: [
      { condition: 'IS_IMMUNO',         action: 'UPGRADE_ESI_2',  reason: { ro: 'Risc sepsis la pacient imunocompromis', en: 'Sepsis risk in immunocompromised patient' } },
      { condition: 'IS_OBSTETRIC_RISK', action: 'UPGRADE_ESI_2',  reason: { ro: 'Febra postpartum — risc sepsis puerperal', en: 'Postpartum fever — puerperal sepsis risk' } },
      { condition: 'AGE_LT_28_DAYS',   action: 'UPGRADE_ESI_2',  reason: { ro: 'Nou-născut febril — risc sepsis neonatal', en: 'Febrile neonate — neonatal sepsis risk' } },
      { condition: 'AGE_GT_65',         action: 'FLAG_HIGH_RISK', reason: { ro: 'Vârstnic febril — monitorizare atentă', en: 'Febrile elderly — close monitoring required' } },
    ],
  },

  {
    id: 'SYM_PALPITATIONS',
    description_ro: 'Bătăi neregulate ale inimii, fără durere toracică',
    description_en: 'Irregular heartbeat, no chest pain',
    is_critical: false,
    base_resources: 1,
    resource_types: ['ekg'],
    context_modifiers: [
      { condition: 'IS_BLOOD_THINNER',  action: 'UPGRADE_ESI_2', reason: { ro: 'Anticoagulant + palpitații — FA pe anticoagulare suboptimă', en: 'Anticoagulant + palpitations — AF on suboptimal anticoagulation' } },
      { condition: 'IS_OBSTETRIC_RISK', action: 'UPGRADE_ESI_2', reason: { ro: 'Sarcină + palpitații — aritmie gestațională cu risc fetal', en: 'Pregnancy + palpitations — gestational arrhythmia with fetal risk' } },
      { condition: 'AGE_GT_65',         action: 'UPGRADE_ESI_2', reason: { ro: 'Vârstnic + palpitații — FA cu risc embolic crescut', en: 'Elderly + palpitations — AF with increased embolic risk' } },
    ],
  },

  {
    id: 'SYM_TRAUMA_LIMB',
    description_ro: 'Traumă membre, entorsă, fractură suspectată',
    description_en: 'Limb trauma, sprain, suspected fracture',
    is_critical: false,
    base_resources: 1,
    resource_types: ['rx'],
    context_modifiers: [
      { condition: 'IS_BLOOD_THINNER', action: 'UPGRADE_ESI_2',  reason: { ro: 'Anticoagulant + traumă — risc hematom extensiv/compartiment', en: 'Anticoagulant + trauma — extensive hematoma/compartment syndrome risk' } },
      { condition: 'AGE_GT_65',        action: 'FLAG_HIGH_RISK', reason: { ro: 'Vârstnic — fractură de șold frecventă, osteoporoză', en: 'Elderly — frequent hip fracture, osteoporosis' } },
    ],
  },

  {
    id: 'SYM_TRAUMA_HEAD',
    description_ro: 'Lovitură la cap, fără pierdere de cunoștință',
    description_en: 'Head trauma, no loss of consciousness',
    is_critical: false,
    base_resources: 1,
    resource_types: ['ct'],
    context_modifiers: [
      { condition: 'IS_BLOOD_THINNER', action: 'UPGRADE_ESI_2', reason: { ro: 'Anticoagulant + traumă craniană — risc hematom subdural la impact minor', en: 'Anticoagulant + head trauma — subdural hematoma risk even from minor impact' } },
      { condition: 'AGE_GT_65',        action: 'UPGRADE_ESI_2', reason: { ro: 'Vârstnic — hematom subdural frecvent chiar la traumatisme minore', en: 'Elderly — subdural hematoma common even from minor trauma' } },
    ],
  },

  {
    id: 'SYM_BACK_PAIN',
    description_ro: 'Durere de spate, sciatică, blocaj lombar',
    description_en: 'Back pain, sciatica, lumbar blockage',
    is_critical: false,
    base_resources: 1,
    resource_types: ['meds_iv'],
    context_modifiers: [
      { condition: 'IS_BLOOD_THINNER',  action: 'UPGRADE_ESI_2', reason: { ro: 'Anticoagulant + durere lombară — risc hematom epidural spinal', en: 'Anticoagulant + back pain — spinal epidural hematoma risk' } },
      { condition: 'IS_OBSTETRIC_RISK', action: 'UPGRADE_ESI_2', reason: { ro: 'Sarcină + durere lombară — risc abrupție placentară, travaliu prematur', en: 'Pregnancy + back pain — placental abruption, preterm labor risk' } },
      { condition: 'PAIN_ALERT',        action: 'UPGRADE_ESI_2', reason: { ro: 'Durere severă + lombară — anevrism aortic abdominal în DD', en: 'Severe back pain — abdominal aortic aneurysm in differential' } },
      { condition: 'AGE_GT_65',         action: 'UPGRADE_ESI_2', reason: { ro: 'Vârstnic + durere lombară — patologie vasculară, fracturi de compresie', en: 'Elderly + back pain — vascular pathology, compression fractures' } },
    ],
  },

  {
    id: 'SYM_URINARY_SYMPTOMS',
    description_ro: 'Usturime la urinat, urinare frecventă',
    description_en: 'Urinary burning, frequent urination',
    is_critical: false,
    base_resources: 1,
    resource_types: ['urine'],
    context_modifiers: [
      { condition: 'IS_IMMUNO',         action: 'UPGRADE_ESI_2', reason: { ro: 'Imunocompromis + simptome urinare — risc urosepsis', en: 'Immunocompromised + urinary symptoms — urosepsis risk' } },
      { condition: 'IS_OBSTETRIC_RISK', action: 'UPGRADE_ESI_2', reason: { ro: 'Sarcină + ITU — risc pielonefrită, urgență obstetricală', en: 'Pregnancy + UTI — pyelonephritis risk, obstetric emergency' } },
      { condition: 'AGE_GT_65',         action: 'UPGRADE_ESI_2', reason: { ro: 'Vârstnic + simptome urinare — sepsis urinar cu febră absentă posibil', en: 'Elderly + urinary symptoms — urosepsis without fever possible' } },
    ],
  },

  {
    id: 'SYM_GYN_PAIN',
    description_ro: 'Durere pelvină, secreții anormale',
    description_en: 'Pelvic pain, abnormal discharge',
    is_critical: false,
    base_resources: 1,
    resource_types: ['labs'],
    context_modifiers: [
      { condition: 'IS_OBSTETRIC_RISK', action: 'UPGRADE_ESI_2', reason: { ro: 'Postpartum + durere pelvină — risc endometrită, sepsis', en: 'Postpartum + pelvic pain — endometritis, sepsis risk' } },
      { condition: 'PAIN_ALERT',        action: 'UPGRADE_ESI_2', reason: { ro: 'Durere pelvină severă — torsiune ovariană, sarcină ectopică', en: 'Severe pelvic pain — ovarian torsion, ectopic pregnancy' } },
    ],
  },

  {
    id: 'SYM_HEADACHE_MILD',
    description_ro: 'Durere de cap obișnuită, migrena tipică',
    description_en: 'Ordinary headache, typical migraine',
    is_critical: false,
    base_resources: 1,
    resource_types: ['meds_iv'],
    context_modifiers: [
      { condition: 'IS_OBSTETRIC_RISK', action: 'UPGRADE_ESI_2',  reason: { ro: 'Sarcină/postpartum + cefalee — risc preeclampsie/eclampsie', en: 'Pregnancy/postpartum + headache — preeclampsia/eclampsia risk' } },
      { condition: 'PAIN_ALERT',        action: 'UPGRADE_ESI_2',  reason: { ro: 'Cefalee severă — thunderclap neconfirmat prin NLP', en: 'Severe headache — thunderclap not confirmed by NLP' } },
      { condition: 'AGE_GT_65',         action: 'FLAG_HIGH_RISK', reason: { ro: 'Vârstnic — arterită temporală, debut AVC posibil', en: 'Elderly — temporal arteritis, possible stroke onset' } },
    ],
  },

  {
    id: 'SYM_FOREIGN_BODY_EXTERNAL',
    description_ro: 'Corp străin în nas, ureche, ochi sau piele',
    description_en: 'Foreign body in nose, ear, eye, or skin',
    is_critical: false,
    base_resources: 1,
    resource_types: ['procedure'],
    context_modifiers: [],
  },

  {
    id: 'SYM_CONSTIPATION',
    description_ro: 'Balonare, absența tranzitului intestinal',
    description_en: 'Bloating, absence of bowel movements',
    is_critical: false,
    base_resources: 1,
    resource_types: ['rx'],
    context_modifiers: [
      { condition: 'AGE_GT_65', action: 'FLAG_HIGH_RISK', reason: { ro: 'Vârstnic — obstrucție intestinală sau volvulus în diagnostic diferențial', en: 'Elderly — bowel obstruction or volvulus in differential diagnosis' } },
    ],
  },

  {
    id: 'SYM_GENERAL_MALAISE',
    description_ro: 'Stare generală alterată, amețeală nespecifică',
    description_en: 'General malaise, non-specific dizziness',
    is_critical: false,
    base_resources: 1,
    resource_types: ['labs'],
    context_modifiers: [
      { condition: 'IS_IMMUNO',         action: 'UPGRADE_ESI_2', reason: { ro: 'Imunocompromis + stare alterată — sepsis cu prezentare atipică', en: 'Immunocompromised + malaise — sepsis with atypical presentation' } },
      { condition: 'IS_OBSTETRIC_RISK', action: 'UPGRADE_ESI_2', reason: { ro: 'Sarcină + stare alterată — preeclampsie, embolie pulmonară', en: 'Pregnancy + malaise — preeclampsia, pulmonary embolism' } },
      { condition: 'AGE_LT_28_DAYS',   action: 'UPGRADE_ESI_2', reason: { ro: 'Nou-născut — orice alterare a stării generale = urgență', en: 'Neonate — any altered general state = emergency' } },
      { condition: 'AGE_GT_65',         action: 'UPGRADE_ESI_2', reason: { ro: 'Vârstnic — AVC, sepsis, IM silențios în diagnostic diferențial', en: 'Elderly — stroke, sepsis, silent MI in differential diagnosis' } },
    ],
  },

  {
    id: 'SYM_CUT_COMPLEX',
    description_ro: 'Plagă tăiată adâncă, deschisă',
    description_en: 'Deep laceration, open wound',
    is_critical: false,
    base_resources: 1,
    resource_types: ['suture'],
    context_modifiers: [
      { condition: 'IS_BLOOD_THINNER', action: 'UPGRADE_ESI_2',  reason: { ro: 'Anticoagulant + plagă deschisă — hemostază dificilă, risc hemoragie', en: 'Anticoagulant + open wound — difficult hemostasis, hemorrhage risk' } },
      { condition: 'AGE_GT_65',        action: 'FLAG_HIGH_RISK', reason: { ro: 'Vârstnic — vindecare lentă, risc infecție crescut', en: 'Elderly — slow healing, increased infection risk' } },
    ],
  },

  // ── ESI 5 default (0 resource types) ─────────────────────────────────────

  {
    id: 'SYM_CUT_MINOR',
    description_ro: 'Zgârietură, julitură superficială',
    description_en: 'Minor scratch, superficial abrasion',
    is_critical: false,
    base_resources: 0,
    resource_types: [],
    context_modifiers: [
      { condition: 'IS_IMMUNO', action: 'UPGRADE_ESI_2', reason: { ro: 'Imunocompromis — orice soluție de continuitate poate deveni sepsis cutanat', en: 'Immunocompromised — any skin break can progress to cutaneous sepsis' } },
    ],
  },

  {
    id: 'SYM_ANIMAL_BITE',
    description_ro: 'Mușcătură animal fără sângerare majoră',
    description_en: 'Animal bite without major bleeding',
    is_critical: false,
    base_resources: 0,
    resource_types: [],
    context_modifiers: [
      { condition: 'IS_IMMUNO', action: 'UPGRADE_ESI_2', reason: { ro: 'Imunocompromis — risc infecție polimicrobiană severă', en: 'Immunocompromised — severe polymicrobial infection risk' } },
    ],
  },

  {
    id: 'SYM_RESPIRATORY_INF',
    description_ro: 'Tuse, roșu în gât, febricică (răceală)',
    description_en: 'Cough, sore throat, low-grade fever (cold)',
    is_critical: false,
    base_resources: 0,
    resource_types: [],
    context_modifiers: [
      { condition: 'IS_IMMUNO',         action: 'UPGRADE_ESI_2',  reason: { ro: 'Imunocompromis + IACRS — risc pneumonie cu germeni oportuniști', en: 'Immunocompromised + URTI — opportunistic pneumonia risk' } },
      { condition: 'IS_OBSTETRIC_RISK', action: 'UPGRADE_ESI_2',  reason: { ro: 'Sarcină + infecție respiratorie — risc pneumonie severă, hipoxie fetală', en: 'Pregnancy + respiratory infection — severe pneumonia, fetal hypoxia risk' } },
      { condition: 'AGE_LT_28_DAYS',   action: 'UPGRADE_ESI_2',  reason: { ro: 'Nou-născut — orice simptom respirator = urgență', en: 'Neonate — any respiratory symptom = emergency' } },
      { condition: 'AGE_GT_65',         action: 'FLAG_HIGH_RISK', reason: { ro: 'Vârstnic — evoluție rapidă spre pneumonie, decompensare cardiacă', en: 'Elderly — rapid progression to pneumonia, cardiac decompensation' } },
    ],
  },

  {
    id: 'SYM_DENTAL_PAIN',
    description_ro: 'Durere măsea, abces dentar',
    description_en: 'Toothache, dental abscess',
    is_critical: false,
    base_resources: 0,
    resource_types: [],
    context_modifiers: [
      { condition: 'IS_IMMUNO', action: 'UPGRADE_ESI_2', reason: { ro: 'Imunocompromis — abces dentar poate progresa spre angina Ludwig, sepsis', en: "Immunocompromised — dental abscess can progress to Ludwig's angina, sepsis" } },
    ],
  },

  {
    id: 'SYM_REFILL_ADMIN',
    description_ro: 'Rețetă, concediu medical, solicitare administrativă',
    description_en: 'Prescription refill, sick note, administrative request',
    is_critical: false,
    base_resources: 0,
    resource_types: [],
    context_modifiers: [],
  },
];
