import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("qa", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
await page.goto("http://127.0.0.1:3000/");
await page.waitForTimeout(500);
await page.screenshot({ path: "qa/desktop.png" });
for (
  let y = 0;
  y < (await page.evaluate(() => document.body.scrollHeight));
  y += 700
) {
  await page.evaluate((v) => scrollTo(0, v), y);
  await page.waitForTimeout(80);
}
await page.evaluate(() => scrollTo(0, 0));
await page.waitForTimeout(700);
await page.screenshot({ path: "qa/full-desktop.png", fullPage: true });
const home = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
await page.locator(".nav-join").click();
const form = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
await page.screenshot({ path: "qa/registration.png" });
const slim = (result) =>
  result.violations.map((v) => ({
    id: v.id,
    nodes: v.nodes.map((n) => ({
      target: n.target,
      summary: n.failureSummary,
    })),
  }));
await writeFile(
  "qa/accessibility.json",
  JSON.stringify({ home: slim(home), form: slim(form) }, null, 2),
);
console.log(JSON.stringify({ home: slim(home), form: slim(form) }));
await page.getByRole("button", { name: "Close enquiry form" }).click();
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => scrollTo(0, 0));
await page.screenshot({ path: "qa/mobile.png" });
await page.locator(".nav-join").click();
await page.screenshot({ path: "qa/mobile-registration.png" });
await browser.close();
