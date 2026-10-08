import { test, expect } from "@playwright/test";
test("navigation, program filtering, curriculum, FAQs and layout", async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Campus2Pro/);
  await expect(page.locator("h1")).toContainText("From Campus");
  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .locator("#mobile-nav")
      .getByRole("link", { name: "Programs", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toBeVisible();
  } else
    await page
      .locator(".desktop-nav")
      .getByRole("link", { name: "Programs", exact: true })
      .click();
  await page.getByRole("button", { name: "Data & AI", exact: true }).click();
  await expect(page.locator(".program-card")).toHaveCount(2);
  await page
    .getByRole("button", { name: "Explore Program", exact: true })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toContainText("Generative AI");
  await page
    .getByRole("button", { name: "Enquire About This Program" })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Student enquiry" }),
  ).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.locator(".faq-item").first().locator("summary").click();
  await expect(page.locator(".faq-item").first()).toHaveAttribute("open", "");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  for (const id of [
    "home",
    "programs",
    "why-campus2pro",
    "how-it-works",
    "placement",
    "faq",
    "career-assessment",
    "about",
  ])
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  await expect(page.locator(".floating-whatsapp")).toHaveAttribute(
    "href",
    "https://wa.me/919005666050",
  );
  expect(errors).toEqual([]);
});
test("enquiry validates, preserves steps, prepares correct WhatsApp link and prevents rapid submits", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (req) => {
    if (req.method() === "POST") requests.push(req.url());
  });
  await page.goto("/");
  await page.evaluate(() => {
    (window as unknown as { opened: string[] }).opened = [];
    window.open = ((url: string | URL) => {
      (window as unknown as { opened: string[] }).opened.push(String(url));
      return null;
    }) as typeof window.open;
  });
  await page.locator(".nav-join").click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(dialog.getByText("Please enter your full name.")).toBeVisible();
  await expect(page.locator("#field-fullName")).toBeFocused();
  await page.getByLabel("Full name").fill("Rahul Sharma");
  await page.getByLabel("Mobile number", { exact: false }).fill("9876543210");
  await page.getByLabel("Email address").fill("rahul@example.com");
  await page.getByLabel("City", { exact: false }).fill("Lucknow");
  await dialog.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("College / University").fill("ABC College");
  await page.getByLabel("Course / Degree").fill("B.Tech");
  await page.getByLabel("Branch / Specialization").fill("Computer Science");
  await page.getByLabel("Current year / Semester").fill("3rd Year");
  await page.getByLabel("Graduation year").fill("2027");
  await page.getByLabel("CGPA / Percentage").fill("7.8");
  await dialog.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.getByLabel("Full name")).toHaveValue("Rahul Sharma");
  await dialog.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByLabel("College / University")).toHaveValue(
    "ABC College",
  );
  await dialog.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByLabel("What are you looking for?")
    .selectOption("Placement Preparation");
  await page.getByLabel("Current skill level").selectOption("Basic");
  await page
    .getByRole("checkbox", { name: "Full Stack Development", exact: true })
    .check();
  await page
    .getByRole("checkbox", { name: "AI / Machine Learning", exact: true })
    .check();
  await page.getByLabel("Biggest career challenge").selectOption("Interview");
  await dialog.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Preferred learning mode").selectOption("Offline");
  await page.getByLabel("Preferred timing").selectOption("Evening");
  await page
    .getByLabel("Additional message")
    .fill("I want projects & interview preparation.");
  await dialog
    .getByRole("button", { name: "Submit & Connect on WhatsApp" })
    .click();
  await expect(dialog.getByText(/Please agree to be contacted/)).toBeVisible();
  await page.getByRole("checkbox", { name: /I agree to be contacted/ }).check();
  await dialog
    .getByRole("button", { name: "Submit & Connect on WhatsApp" })
    .click();
  await expect(
    dialog.getByRole("heading", { name: "You’re almost there!" }),
  ).toBeVisible();
  await expect(dialog.getByText(/browser blocked/)).toBeVisible();
  const opened = await page.evaluate(
    () => (window as unknown as { opened: string[] }).opened,
  );
  expect(opened).toHaveLength(1);
  const url = new URL(opened[0]);
  expect(url.pathname).toBe("/919005666050");
  expect(url.searchParams.get("text")).toContain(
    "Interested Areas: Full Stack Development, AI / Machine Learning",
  );
  expect(url.searchParams.get("text")).toContain(
    "Message: I want projects & interview preparation.",
  );
  await expect(
    dialog.getByRole("button", { name: /Opening WhatsApp/ }),
  ).toBeDisabled();
  await expect(
    dialog.getByRole("link", { name: /Open WhatsApp directly/ }),
  ).toHaveAttribute("href", opened[0]);
  expect(requests).toEqual([]);
  const events = await page.evaluate(() => window.dataLayer);
  expect(events?.some((e) => e.event === "form_completed")).toBe(true);
  expect(JSON.stringify(events)).not.toContain("rahul@example.com");
});
test("keyboard focus trap, Escape close, and privacy page", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".nav-join").click();
  await expect(
    page.getByRole("button", { name: "Close enquiry form" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Continue", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close enquiry form" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator(".nav-join")).toBeFocused();
  await page.goto("/privacy/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Privacy at Campus2Pro",
  );
});
