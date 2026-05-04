// Resource types 
// ESI 3: >= 2 distinct types
// ESI 4: = 1
// ESI 5: = 0
export type ResourceType =
  | 'labs'       // blood tests, cultures etc.
  | 'imaging'    // X-ray, ultrasound
  | 'ekg'
  | 'rx'         // radiograph (plain film)
  | 'ct'
  | 'iv_fluids'
  | 'urine'      // urinalysis / dipstick
  | 'echo'       // ultrasound (ecografie)
  | 'meds_iv'    // IV / IM medication administration
  | 'consult'    // specialist consult
  | 'procedure'  // laceration repair, foreign body removal etc.
  | 'suture'
  | 'abx';       // IV antibiotics

// what a context modifier does when its condition is satisfied
export type ContextModifierAction =
  | 'UPGRADE_ESI_2'   // forces ESI 2 
  | 'FLAG_HIGH_RISK'; // sets a visual alert, no upgrade

// every condition maps 1-to-1 to a flag in TriageFlags 
// or is derived from AGE_VALUE
export type ContextCondition =
  | 'IS_IMMUNO'
  | 'IS_BLOOD_THINNER'
  | 'IS_OBSTETRIC_RISK'
  | 'PAIN_ALERT'     // derived: PAIN_LEVEL >= 7
  | 'AGE_LT_28_DAYS' // AGE_VALUE < 28/365
  | 'AGE_GT_65';     // AGE_VALUE > 65

export interface ContextModifier {
  condition: ContextCondition;
  action: ContextModifierAction;
  reason: { en: string; ro: string };
}

// entries in the knowledge base
export interface TokenEntry {
  id: string;
  description_ro: string;
  description_en: string;
  is_critical: boolean;      // critical tokens force ESI 2 with no context needed
  base_resources: number;    // default resource count before context modifiers
  resource_types: ResourceType[]; 
  context_modifiers: ContextModifier[]; 
}

export type KnowledgeBase = Record<string, TokenEntry>;
