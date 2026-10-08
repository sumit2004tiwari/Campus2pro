# Campus2Pro verification

Verified locally on 8 October 2026 using Node.js 22.14.0 and the production static export.

## Automated results

- Production Next.js build and strict TypeScript check passed.
- Six enquiry utility tests passed: required fields, consent, Indian mobile numbers, email, graduation years, length limits, optional field handling, honeypot handling, complete WhatsApp message formatting, and special-character encoding.
- Twenty browser checks passed across Google Chrome, Microsoft Edge, Firefox, Android Chrome emulation, and iPhone WebKit emulation.
- Browser checks cover navigation, responsive overflow, program filtering, curriculum previews, program-to-enquiry handoff, FAQ interaction, step validation, Back navigation, consent, message preparation, popup fallback, submit cooldown, keyboard focus trapping and restoration, privacy page, and analytics without personal field values.
- Automated WCAG A/AA checks found no violations on the homepage and the initial enquiry screen across those browser profiles. Automated checks are not a substitute for a complete manual accessibility review.
- Homepage, privacy page, favicon, Open Graph image, Apple icon, robots, and sitemap returned HTTP 200.
- Dependency audit reported zero vulnerabilities after temporary benchmark dependencies were removed.

## Lighthouse

An isolated Lighthouse 12.6.1 mobile run against the compressed local production preview returned:

| Category       | Score |
| -------------- | ----- |
| Performance    | 91    |
| Accessibility  | 100   |
| Best practices | 100   |
| SEO            | 100   |

First contentful paint: 1.4 seconds. Largest contentful paint: 2.6 seconds. Total blocking time: 260 milliseconds. Cumulative layout shift: 0.

These are local measurements, not a guarantee of deployed scores. Hosting, device load, and network conditions can change results. The preview server uses gzip and cache headers; the Vercel deployment uses Vercel's delivery infrastructure.

Local screenshots and raw audit results are available in the ignored `qa/` directory. The Lighthouse tool was used temporarily and is not a shipped dependency.

## Before public launch

1. Set `SITE_URL` in `src/lib/config.ts` to the actual deployed domain and rebuild. Its current value is a placeholder.
2. Confirm upcoming batch dates, fees, duration, learning modes, and locations with the Campus2Pro team before publishing those details.
3. On an actual Android phone and iPhone, complete an enquiry, confirm the WhatsApp app opens, review the message, and manually send it only if desired. No real message was sent during automated testing.
4. On desktop, confirm the WhatsApp Web/login fallback. Browser tests validated URL construction and popup fallback, not WhatsApp account login or message delivery.
5. Verify the deployed site on real mobile devices and confirm the final production Lighthouse results.

The project is ready to import into Vercel. It has not been deployed or pushed to a remote repository in this session.
