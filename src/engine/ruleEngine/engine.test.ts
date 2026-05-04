import { runRuleEngine } from './engine';

const base = {
  AGE_VALUE: 35, SEX_BIO: 'F' as const,
  IS_CONFUSED: false, IS_SUICIDAL: false,
  PAIN_LEVEL: 5, PAIN_ALERT: false,
  IS_IMMUNO: false, IS_BLOOD_THINNER: false, IS_OBSTETRIC_RISK: false,
};

const t1 = runRuleEngine(['SYM_CHEST_PAIN_TYPICAL'], base);
console.log('T1 critical    ->', t1.level, '|', t1.triggeredBy);

const t2 = runRuleEngine(['SYM_FEVER'], { ...base, IS_IMMUNO: true });
console.log('T2 ctx upgrade ->', t2.level, '|', t2.triggeredBy);

const t3 = runRuleEngine(['SYM_ABDO_PAIN'], base);
console.log('T3 ESI 3       ->', t3.level, '|', t3.resourceTypes);

const t4 = runRuleEngine(['SYM_FEVER'], base);
console.log('T4 ESI 4       ->', t4.level, '|', t4.resourceTypes);

const t5 = runRuleEngine(['SYM_REFILL_ADMIN'], base);
console.log('T5 ESI 5       ->', t5.level, '|', t5.resourceTypes);

const t6 = runRuleEngine(['SYM_FEVER'], { ...base, AGE_VALUE: 70 });
console.log('T6 FLAG alert  ->', t6.level, '|', t6.highRiskAlerts.length, 'alert(s) |', t6.highRiskAlerts[0]?.reason.en);

const t7 = runRuleEngine(['SYM_FEVER', 'SYM_BACK_PAIN'], { ...base, IS_BLOOD_THINNER: true });
console.log('T7 multi-token ->', t7.level, '|', t7.triggeredBy);
