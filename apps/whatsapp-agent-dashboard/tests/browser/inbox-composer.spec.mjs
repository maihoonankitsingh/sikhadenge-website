import { expect, test } from "@playwright/test";

const ADMIN_EMAIL =
  process.env.DASHBOARD_ADMIN_EMAIL || "admin@example.invalid";
const ADMIN_PASSWORD =
  process.env.DASHBOARD_ADMIN_PASSWORD || "CI-only-password-12345";

async function login(page) {
  await page.goto("/login");
  await page.getByLabel("Email address").fill(ADMIN_EMAIL);
  await page.getByLabel("Password").fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/inbox(?:\?|$)/);
  await expect(page.locator(".conversation-item.selected")).toBeVisible();
}

async function openMobileConversation(page) {
  const inbox = page.locator(".sx-inbox");
  const className = (await inbox.getAttribute("class")) || "";
  if (className.includes("sx-mv-list")) {
    await page.locator(".conversation-item.selected").click();
  }
}

async function waitForDock(page) {
  await expect
    .poll(() =>
      page
        .locator(".sx-composer")
        .getAttribute("data-runtime-docked"),
    )
    .toBe("true");
  await expect(page.locator(".sx-composer")).toBeVisible();
}

test("template dialog stays above the docked tablet composer", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 760 });
  await login(page);
  await openMobileConversation(page);
  await waitForDock(page);

  await page
    .getByTitle("Open templates and targeted campaigns")
    .click();

  const overlay = page.locator(".inbox-template-overlay");
  const dialog = page.getByRole("dialog", { name: "Send approved template" });
  const queueButton = page.getByRole("button", { name: "Queue template" });

  await expect(overlay).toBeVisible();
  await expect(dialog).toBeVisible();
  await expect(queueButton).toBeVisible();
  await queueButton.scrollIntoViewIfNeeded();

  const stacking = await page.evaluate(() => {
    const composer = document.querySelector(".sx-composer");
    const modal = document.querySelector(".inbox-template-overlay");
    if (!(composer instanceof HTMLElement) || !(modal instanceof HTMLElement)) {
      throw new Error("Composer or template overlay was not rendered.");
    }
    return {
      composer: Number.parseInt(getComputedStyle(composer).zIndex, 10),
      modal: Number.parseInt(getComputedStyle(modal).zIndex, 10),
    };
  });

  expect(stacking.composer).toBeLessThan(stacking.modal);
  await queueButton.click({ trial: true });
});

test("compact controls return after the viewport widens", async ({ page }) => {
  await page.setViewportSize({ width: 680, height: 760 });
  await login(page);
  await openMobileConversation(page);
  await waitForDock(page);

  const channelNote = page.locator(".sx-composer-channel-note");
  const tools = page.locator(".sx-composer-tools");
  const divider = page.locator(".sx-composer-divider");

  await expect.poll(() => channelNote.evaluate((node) => getComputedStyle(node).display)).toBe("none");
  await expect.poll(() => tools.evaluate((node) => getComputedStyle(node).display)).toBe("none");
  await expect.poll(() => divider.evaluate((node) => getComputedStyle(node).display)).toBe("none");

  await page.setViewportSize({ width: 1180, height: 760 });

  await expect
    .poll(() => channelNote.evaluate((node) => getComputedStyle(node).display))
    .not.toBe("none");
  await expect
    .poll(() => tools.evaluate((node) => getComputedStyle(node).display))
    .not.toBe("none");
  await expect
    .poll(() => divider.evaluate((node) => getComputedStyle(node).display))
    .not.toBe("none");
});

test("composer remains visible on mobile, tablet, and desktop", async ({ page }) => {
  for (const viewport of [
    { width: 390, height: 760, docked: true },
    { width: 1024, height: 760, docked: true },
    { width: 1366, height: 900, docked: false },
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await login(page);
    await openMobileConversation(page);

    const composer = page.locator(".sx-composer");
    await expect(composer).toBeVisible();

    if (viewport.docked) {
      await waitForDock(page);
    } else {
      await expect
        .poll(() => composer.getAttribute("data-runtime-docked"))
        .toBeNull();
    }

    const geometry = await composer.evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return {
        top: rect.top,
        bottom: rect.bottom,
        viewportHeight: window.visualViewport?.height || window.innerHeight,
      };
    });

    expect(geometry.top).toBeGreaterThanOrEqual(0);
    expect(geometry.bottom).toBeLessThanOrEqual(geometry.viewportHeight + 1);

    await page.context().clearCookies();
  }
});
