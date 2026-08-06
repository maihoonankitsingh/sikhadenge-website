export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  try {
    const { applyMasterclassConfigToEnvironment, getMasterclassFlowConfig } =
      await import("./lib/automation/masterclass-registration-flow");
    const config = await getMasterclassFlowConfig();
    applyMasterclassConfigToEnvironment(config);
  } catch (error) {
    console.error(
      "[masterclass-flow] runtime configuration bootstrap failed:",
      error instanceof Error ? error.message : error,
    );
  }
}
