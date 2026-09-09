export type TenantPlanLimits = {
  maxSeats: number;
  maxConnections: number;
  maxMonthlyOutbound: number;
  publicApiEnabled: boolean;
  whiteLabelEnabled: boolean;
};

export type TenantUsage = {
  seats: number;
  connections: number;
  monthlyOutbound: number;
};

export type PlanLimitKey = keyof Pick<
  TenantPlanLimits,
  "maxSeats" | "maxConnections" | "maxMonthlyOutbound"
>;

export function assertUsageWithinPlan(
  limits: TenantPlanLimits,
  usage: TenantUsage,
): void {
  const values = [limits.maxSeats, limits.maxConnections, limits.maxMonthlyOutbound];
  if (values.some((value) => !Number.isInteger(value) || value < 0)) {
    throw new Error("Tenant plan limits must be non-negative integers.");
  }
  if (usage.seats > limits.maxSeats) throw new Error("Seat limit exceeded.");
  if (usage.connections > limits.maxConnections) throw new Error("Connection limit exceeded.");
  if (usage.monthlyOutbound > limits.maxMonthlyOutbound) {
    throw new Error("Monthly outbound limit exceeded.");
  }
}

export function assertTenantScope(activeWorkspaceId: string, resourceWorkspaceId: string): void {
  if (!activeWorkspaceId.trim() || !resourceWorkspaceId.trim()) {
    throw new Error("Workspace scope is required.");
  }
  if (activeWorkspaceId !== resourceWorkspaceId) {
    throw new Error("Cross-tenant access denied.");
  }
}

export type PublicApiScope =
  | "conversations.read"
  | "contacts.read"
  | "contacts.write"
  | "messages.send"
  | "analytics.read";

export function apiKeyAllows(
  grantedScopes: readonly PublicApiScope[],
  requiredScope: PublicApiScope,
): boolean {
  return grantedScopes.includes(requiredScope);
}
