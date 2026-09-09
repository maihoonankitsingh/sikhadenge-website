import { expect, test } from "@playwright/test";

const ADMIN_EMAIL =
  process.env.DASHBOARD_ADMIN_EMAIL || "admin@example.invalid";
const ADMIN_PASSWORD =
  process.env.DASHBOARD_ADMIN_PASSWORD || "CI-only-password-12345";

const MODULE_ROUTES = [
  "/contacts",
  "/leads",
  "/team",
  "/engagement",
  "/analytics",
  "/knowledge",
  "/training",
  "/campaigns",
  "/automation",
  "/templates",
  "/integrations",
  "/settings",
  "/admin",
  "/cutover",
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "mobile", width: 390, height: 844 },
];

async function waitForFonts(page) {
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
}

async function attachViewport(page, testInfo, name) {
  const body = await page.screenshot({ fullPage: false });
  await testInfo.attach(name, { body, contentType: "image/png" });
}

async function expectNoRootHorizontalOverflow(page) {
  const geometry = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));

  expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 2);
  expect(geometry.bodyScrollWidth).toBeLessThanOrEqual(geometry.innerWidth + 2);
}

async function expectInterFont(page) {
  const family = await page.locator("body").evaluate(
    (node) => getComputedStyle(node).fontFamily.toLowerCase(),
  );
  expect(family).toContain("inter");
}

async function login(page) {
  await page.goto("/login", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".auth")).toBeVisible();
  await page.getByLabel("Email address").fill(ADMIN_EMAIL);
  await page.getByLabel("Password").fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/inbox(?:\?|$)/);
  await expect(page.locator(".sx-inbox")).toBeVisible();
}

async function validateModuleShell(page, viewport) {
  const shell = page.locator(".sx-module");
  await expect(shell).toBeVisible();
  await expect(page.locator(".sx-workspace")).toBeVisible();
  await expect(page.locator(".sx-workspace-copy h1")).toBeVisible();

  const titleSize = await page.locator(".sx-workspace-copy h1").evaluate(
    (node) => Number.parseFloat(getComputedStyle(node).fontSize),
  );
  expect(titleSize).toBeGreaterThanOrEqual(18);
  expect(titleSize).toBeLessThanOrEqual(25);

  if (viewport.width <= 767) {
    await expect(page.locator(".sx-side")).toBeHidden();
    await expect(page.locator(".sx-mobile-dock")).toBeVisible();
  } else {
    await expect(page.locator(".sx-side")).toBeVisible();
  }
}

async function validateInbox(page, viewport) {
  await expect(page.locator(".sx-inbox")).toBeVisible();
  await expect(page.locator(".sx-list")).toBeVisible();
  await expect(page.locator(".sx-list-title")).toBeVisible();

  const listTitleSize = await page.locator(".sx-list-title").evaluate(
    (node) => Number.parseFloat(getComputedStyle(node).fontSize),
  );
  expect(listTitleSize).toBeGreaterThanOrEqual(17);
  expect(listTitleSize).toBeLessThanOrEqual(19);

  const selected = page.locator(".conversation-item.selected");
  await expect(selected).toHaveCount(1);

  if (viewport.width <= 767) {
    await selected.dispatchEvent("click");
    await expect(page.locator(".sx-chat")).toBeVisible();
    await expect(page.locator(".sx-composer")).toBeVisible();

    const composerFontSize = await page
      .locator(".sx-composer-row textarea")
      .evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize));
    expect(composerFontSize).toBeGreaterThanOrEqual(16);
  } else {
    await expect(page.locator(".sx-chat")).toBeVisible();
  }
}

for (const viewport of VIEWPORTS) {
  test(`enterprise UI remains stable across ${viewport.name} routes`, async ({ page }, testInfo) => {
    test.setTimeout(180_000);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    await page.goto("/login", { waitUntil: "domcontentloaded" });
    await waitForFonts(page);
    await expect(page.locator(".auth__shell")).toBeVisible();
    await expectInterFont(page);
    await expectNoRootHorizontalOverflow(page);
    await attachViewport(page, testInfo, `${viewport.name}-login`);

    await login(page);
    await waitForFonts(page);
    await expectInterFont(page);
    await validateInbox(page, viewport);
    await expectNoRootHorizontalOverflow(page);
    await attachViewport(page, testInfo, `${viewport.name}-inbox`);

    for (const route of MODULE_ROUTES) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await waitForFonts(page);
      await expect(page).toHaveURL(new RegExp(`${route.replace("/", "\\/")}(?:\\?|$)`));
      await expectInterFont(page);
      await validateModuleShell(page, viewport);
      await expectNoRootHorizontalOverflow(page);
      await attachViewport(
        page,
        testInfo,
        `${viewport.name}-${route.slice(1).replaceAll("/", "-")}`,
      );
    }
  });
}
