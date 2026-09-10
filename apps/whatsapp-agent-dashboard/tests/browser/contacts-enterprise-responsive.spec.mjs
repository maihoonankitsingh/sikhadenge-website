import { expect, test } from "@playwright/test";

const ADMIN_EMAIL =
  process.env.DASHBOARD_ADMIN_EMAIL || "admin@example.invalid";
const ADMIN_PASSWORD =
  process.env.DASHBOARD_ADMIN_PASSWORD || "CI-only-password-12345";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "mobile", width: 390, height: 844 },
];

async function login(page) {
  await page.goto("/login", { waitUntil: "domcontentloaded" });
  await page.getByLabel("Email address").fill(ADMIN_EMAIL);
  await page.getByLabel("Password").fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/inbox(?:\?|$)/);
}

async function expectNoRootOverflow(page) {
  const geometry = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));

  expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 2);
  expect(geometry.bodyScrollWidth).toBeLessThanOrEqual(geometry.innerWidth + 2);
}

async function expectInsideViewport(locator, viewportWidth) {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  expect(box.x).toBeGreaterThanOrEqual(-1);
  expect(box.x + box.width).toBeLessThanOrEqual(viewportWidth + 1);
}

for (const viewport of VIEWPORTS) {
  test(`Contacts stays enterprise-usable at ${viewport.name}`, async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await login(page);

    await page.goto("/contacts", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/contacts(?:\?|$)/);
    await expect(page.locator(".contact-manager")).toBeVisible();
    await expect(page.locator(".contact-metrics > article")).toHaveCount(4);
    await expect(page.locator(".contact-toolbar")).toBeVisible();
    await expect(page.locator(".contact-directory")).toBeVisible();
    await expect(page.locator(".contact-editor")).toBeVisible();

    await expect(page.getByText("Loading contacts...", { exact: true })).toHaveCount(0);
    await expectNoRootOverflow(page);

    const directoryBox = await page.locator(".contact-directory").boundingBox();
    const editorBox = await page.locator(".contact-editor").boundingBox();
    expect(directoryBox).not.toBeNull();
    expect(editorBox).not.toBeNull();

    if (viewport.width >= 1180) {
      expect(editorBox.x).toBeGreaterThan(directoryBox.x + directoryBox.width - 2);
    } else {
      expect(editorBox.y).toBeGreaterThan(directoryBox.y + directoryBox.height - 2);
    }

    if (viewport.width <= 767) {
      const searchControls = page.locator(
        ".contact-search-group > input, .contact-search-group > select",
      );
      await expect(searchControls).toHaveCount(3);
      for (let index = 0; index < 3; index += 1) {
        await expectInsideViewport(searchControls.nth(index), viewport.width);
      }

      const actions = page.locator(
        ".contact-toolbar-actions > button, .contact-toolbar-actions > a",
      );
      await expect(actions).toHaveCount(3);
      for (let index = 0; index < 3; index += 1) {
        await expectInsideViewport(actions.nth(index), viewport.width);
      }

      const formGeometry = await page.locator(".contact-form-grid label").evaluateAll((nodes) =>
        nodes.slice(0, 2).map((node) => {
          const rect = node.getBoundingClientRect();
          return { left: rect.left, top: rect.top, width: rect.width };
        }),
      );
      expect(formGeometry).toHaveLength(2);
      expect(Math.abs(formGeometry[0].left - formGeometry[1].left)).toBeLessThanOrEqual(2);
      expect(formGeometry[1].top).toBeGreaterThan(formGeometry[0].top);

      const tableWrap = page.locator(".contact-table-wrap");
      await expectInsideViewport(tableWrap, viewport.width);
      const tableGeometry = await tableWrap.evaluate((node) => ({
        clientWidth: node.clientWidth,
        scrollWidth: node.scrollWidth,
        overflowX: getComputedStyle(node).overflowX,
      }));
      expect(["auto", "scroll"]).toContain(tableGeometry.overflowX);
      expect(tableGeometry.scrollWidth).toBeGreaterThanOrEqual(tableGeometry.clientWidth);
    }

    if (viewport.width === 390) {
      const metricBoxes = await page.locator(".contact-metrics > article").evaluateAll((nodes) =>
        nodes.map((node) => {
          const rect = node.getBoundingClientRect();
          return { left: rect.left, top: rect.top, width: rect.width };
        }),
      );
      expect(metricBoxes).toHaveLength(4);
      expect(Math.abs(metricBoxes[0].top - metricBoxes[1].top)).toBeLessThanOrEqual(2);
      expect(metricBoxes[2].top).toBeGreaterThan(metricBoxes[0].top);
      expect(metricBoxes[0].width).toBeGreaterThan(140);
    }

    await testInfo.attach(`contacts-${viewport.name}`, {
      body: await page.screenshot({ fullPage: false }),
      contentType: "image/png",
    });
  });
}
