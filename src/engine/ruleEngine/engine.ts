import type { TriageFlags } from '../types';
import type { ContextCondition, ResourceType, TokenEntry } from '../knowledgeBase/types';
import { CRITICAL_TOKENS } from '../knowledgeBase/criticalTokens';
import { GENERAL_TOKENS } from '../knowledgeBase/generalTokens';

// ── Knowledge Base lookup map: token ID → TokenEntry ─────────────────────────
// Built once at module load. O(1) lookup during rule evaluation.
const KB = new Map<string, TokenEntry>(
  [...CRITICAL_TOKENS, ...GENERAL_TOKENS].map((t) => [t.id, t]),
);

// ── Types ─────────────────────────────────────────────────────────────────────

export interface HighRiskAlert {
  tokenId: string;
  condition: ContextCondition;
  reason: { en: string; ro: string };
}

export interface RuleEngineResult {
  level: 2 | 3 | 4 | 5;
  triggeredBy: string;
  reason: { en: string; ro: string };
  highRiskAlerts: HighRiskAlert[];
  resourceTypes: ResourceType[];
}

// ── Condition evaluator ───────────────────────────────────────────────────────
// Maps each ContextCondition to the corresponding flag in TriageFlags.
// AGE conditions are derived from AGE_VALUE (stored in years).

function evaluateCondition(condition: ContextCondition, flags: TriageFlags): boolean {
  switch (condition) {
    case 'IS_IMMUNO':         return flags.IS_IMMUNO;
    case 'IS_BLOOD_THINNER':  return flags.IS_BLOOD_THINNER;
    case 'IS_OBSTETRIC_RISK': return flags.IS_OBSTETRIC_RISK;
    case 'PAIN_ALERT':        return flags.PAIN_ALERT;
    case 'AGE_LT_28_DAYS':   return flags.AGE_VALUE < 28 / 365; // 28 days expressed in years
    case 'AGE_GT_65':         return flags.AGE_VALUE > 65;
  }
}

// ── Main Rule Engine — Table 8: Forward Chaining ──────────────────────────────

export function runRuleEngine(
  tokenIds: string[],
  flags: TriageFlags,
): RuleEngineResult {
  const highRiskAlerts: HighRiskAlert[] = [];
  const allResourceTypes: ResourceType[] = [];

  // Resolve token IDs to KB entries, silently skip unknown IDs.
  const tokens = tokenIds.flatMap((id) => {
    const entry = KB.get(id);
    return entry !== undefined ? [entry] : [];
  });

  // ── Step 1: Critical Token check ─────────────────────────────────────────
  // Any single critical token → ESI 2 immediately, no further evaluation.
  for (const token of tokens) {
    if (token.is_critical) {
      return {
        level: 2,
        triggeredBy: token.id,
        reason: { en: token.description_en, ro: token.description_ro },
        highRiskAlerts: [],
        resourceTypes: [],
      };
    }
  }

  // ── Step 2: Contextual Upgrade (alethic logic matrix) ────────────────────
  // For each token, evaluate every context modifier against Stage A flags.
  // First UPGRADE_ESI_2 match wins and short-circuits everything.
  // FLAG_HIGH_RISK matches are collected for the UI but don't stop the loop.
  for (const token of tokens) {
    for (const modifier of token.context_modifiers) {
      if (!evaluateCondition(modifier.condition, flags)) continue;

      if (modifier.action === 'UPGRADE_ESI_2') {
        return {
          level: 2,
          triggeredBy: `${token.id}:${modifier.condition}`,
          reason: modifier.reason,
          highRiskAlerts,
          resourceTypes: [],
        };
      }

      if (modifier.action === 'FLAG_HIGH_RISK') {
        highRiskAlerts.push({
          tokenId: token.id,
          condition: modifier.condition,
          reason: modifier.reason,
        });
      }
    }

    // Collect resource types for Step 3 (done here to avoid a second loop).
    allResourceTypes.push(...token.resource_types);
  }

  // ── Step 3: Resource summation ────────────────────────────────────────────
  // Count *distinct* resource types across all tokens.
  // CBC + Electrolytes = 1 type (both 'labs').
  // CBC + EKG = 2 types ('labs' + 'ekg').
  const distinctTypes = [...new Set(allResourceTypes)];
  const count = distinctTypes.length;

  // ── Step 4: ESI Classification ────────────────────────────────────────────
  const level: 3 | 4 | 5 = count >= 2 ? 3 : count === 1 ? 4 : 5;

  const classificationReason = {
    en: `${count} distinct resource type${count !== 1 ? 's' : ''} → ESI ${level}`,
    ro: `${count} tip${count !== 1 ? 'uri' : ''} de resurse distincte → ESI ${level}`,
  };

  return {
    level,
    triggeredBy: 'RESOURCE_COUNT',
    reason: classificationReason,
    highRiskAlerts,
    resourceTypes: distinctTypes,
  };
}
