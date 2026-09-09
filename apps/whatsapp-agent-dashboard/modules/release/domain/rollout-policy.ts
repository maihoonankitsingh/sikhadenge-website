export type RolloutMode =
  | "SHADOW"
  | "APPROVAL_ONLY"
  | "LIMITED_AUTOPILOT"
  | "FULL_AUTOPILOT_FOR_APPROVED_FLOWS";

export type RolloutEvidence = {
  exactShaVerified: boolean;
  buildVerified: boolean;
  rollbackTested: boolean;
  monitoringActive: boolean;
  permissionsVerified: boolean;
  policyVerified: boolean;
  unresolvedCriticalIncidents: number;
  unexplainedDuplicateSends: number;
  emergencyStopActive: boolean;
};

export type RolloutDecision =
  | { allowed: true; targetMode: RolloutMode }
  | { allowed: false; reason: string };

const ORDER: readonly RolloutMode[] = [
  "SHADOW",
  "APPROVAL_ONLY",
  "LIMITED_AUTOPILOT",
  "FULL_AUTOPILOT_FOR_APPROVED_FLOWS",
];

export function evaluateRolloutPromotion(input: {
  currentMode?: RolloutMode;
  targetMode: RolloutMode;
  evidence: RolloutEvidence;
}): RolloutDecision {
  if (input.evidence.emergencyStopActive) {
    return { allowed: false, reason: "Emergency stop is active." };
  }
  if (input.evidence.unresolvedCriticalIncidents > 0) {
    return { allowed: false, reason: "Critical incidents remain unresolved." };
  }
  if (input.evidence.unexplainedDuplicateSends > 0) {
    return { allowed: false, reason: "Duplicate-send incidents require resolution." };
  }
  if (
    !input.evidence.exactShaVerified ||
    !input.evidence.buildVerified ||
    !input.evidence.rollbackTested ||
    !input.evidence.monitoringActive ||
    !input.evidence.permissionsVerified ||
    !input.evidence.policyVerified
  ) {
    return { allowed: false, reason: "Required release evidence is incomplete." };
  }

  if (input.currentMode) {
    const current = ORDER.indexOf(input.currentMode);
    const target = ORDER.indexOf(input.targetMode);
    if (target > current + 1) {
      return { allowed: false, reason: "Rollout modes must be promoted one controlled step at a time." };
    }
  }
  return { allowed: true, targetMode: input.targetMode };
}
