import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const privacyPolicyMarkdown = `
# Privacy Policy

**Tendr Property Management Pty Ltd**
ABN 92 697 124 708 · 19/5 Manning St, South Brisbane QLD 4101

**Effective:** 16 May 2026
**Version:** 1.0

---

This Privacy Policy explains what personal information Tendr Property Management collects, why we collect it, how we use and protect it, and the rights you have over it. We follow the Australian Privacy Principles set out in the *Privacy Act 1988* (Cth).

---

## 1. About this policy

This Privacy Policy applies to **Tendr Property Management Pty Ltd** (ABN 92 697 124 708, trading as *Tendr*), of 19/5 Manning St, South Brisbane QLD 4101 ("Tendr", "we", "us", or "our"). It covers personal information we collect through our website, online customer agreement form, in-person interactions, phone, SMS, email, and when we attend properties to provide our services.

By using our services or providing personal information to us, you agree that we may collect, hold, use, and disclose your personal information in accordance with this Policy.

## 2. What we collect

The personal information we collect depends on how you interact with us. It typically includes:

- **Identity & contact details** — your name, postal and property address, email address, and phone number.
- **Property details** — site access notes, gate codes, location of pets, hazards, irrigation lines, and other relevant features you share with us.
- **Service history** — services requested and provided, scheduling preferences, quotes, invoices, and payments.
- **Payment information** — billing details and a record of transactions. Card details are processed by our payment provider and are not stored by Tendr.
- **Photos** — "before and after" images of work areas, used for quality, record, and (with your consent) marketing purposes.
- **Communications** — emails, SMS, and notes from phone calls about your account or services.
- **Website data** — basic technical information about your visit (see section 9).

We don't intentionally collect sensitive information (such as health or biometric information). If you provide it to us voluntarily, we will only use it for the purpose for which it was given.

## 3. How we collect it

We collect personal information directly from you whenever practicable, including when you:

- request a quote or submit our online customer agreement form;
- book or vary a service by phone, SMS, or email;
- communicate with us about a property or invoice;
- visit our website (limited technical information — see section 9).

Where we cannot reasonably collect information directly from you, we may collect it from a third party — for example, from a property owner if you are a tenant, from a property manager who has engaged us on your behalf, or from a referral source.

## 4. Why we collect it

We collect, hold, use, and disclose personal information so we can:

- provide quotes and deliver the property maintenance services you've requested;
- schedule visits and communicate with you about access, timing, and weather;
- issue invoices and process payments;
- maintain records of work performed and respond to any service issues;
- manage our customer relationships and respond to your enquiries;
- improve our services and train our team;
- send you service updates and (with your consent) marketing communications;
- comply with our legal and regulatory obligations.

## 5. Who we share with

We do not sell your personal information. We may disclose it to:

- **Our team and subcontractors** — to schedule and perform services at your property;
- **Service providers** — payment processors, accounting and bookkeeping providers, cloud hosting, customer relationship management, scheduling software, email and SMS providers, and electronic signature platforms;
- **Property owners or managers** — if you are a tenant and we need to confirm scope or access;
- **Professional advisers** — lawyers, insurers, and auditors, where reasonably required;
- **Regulators or law enforcement** — where required or authorised by law.

We require our service providers to handle personal information in line with the Privacy Act and only for the purposes for which we share it.

## 6. Overseas disclosure

Some of the cloud-based service providers we use may store data on servers located outside Australia (typically in the United States or the European Union). Where this happens, we take reasonable steps to ensure those providers handle your information in a manner consistent with the Australian Privacy Principles.

By providing personal information to us, you consent to this disclosure to overseas service providers as described above.

## 7. Photos & imagery

We take "before and after" photographs of work areas for quality control and record purposes. These photos may include features of your property but are not intended to capture identifiable individuals.

> **Your choice.** We will only use photographs of your property in marketing materials (such as our website, social media, or printed materials) **with your prior written consent**. You can give or withdraw consent at any time by contacting us at the details in section 14.

## 8. Direct marketing

From time to time we may contact you with information about services, seasonal offers, or other content we think you'll find useful. We will only do this where we are permitted to under the Privacy Act and the *Spam Act 2003* (Cth).

Every marketing message will include a simple way to unsubscribe. You can also opt out at any time by emailing us at <hello@tendr.services>. Opting out of marketing won't affect service communications about your account.

## 9. Cookies & website analytics

Our website may use cookies and similar technologies to remember your preferences and understand how visitors use the site. We may use analytics tools (such as Google Analytics) which collect anonymous information about device type, browser, pages visited, and approximate location.

You can disable cookies in your browser settings. Doing so may affect some site functionality.

## 10. Storage & security

We hold personal information in secure cloud-based systems and, where necessary, in paper form. We take reasonable steps to protect it from misuse, interference, loss, and unauthorised access, modification, or disclosure — including access controls, encrypted transmission, and staff training.

We retain personal information for as long as we need it for the purposes set out in this Policy, and to meet our legal, tax, accounting, and insurance obligations. When we no longer need it, we will destroy or de-identify it.

## 11. Access & correction

You have a right to ask us:

- what personal information we hold about you;
- for a copy of that information; and
- to correct any information that is inaccurate, out-of-date, incomplete, or misleading.

To make a request, contact us at <hello@tendr.services>. We will respond within a reasonable time, usually within 30 days. We may need to verify your identity before providing information. There is no charge to make a request, but we may recover reasonable costs of providing access in some cases.

## 12. Complaints

If you think we have mishandled your personal information or breached the Australian Privacy Principles, please contact our Privacy Officer at <hello@tendr.services>. We take privacy concerns seriously and will:

- acknowledge your complaint within 7 days;
- investigate and respond within 30 days where reasonably possible;
- let you know our findings and any steps we'll take.

If you're not satisfied with our response, you can refer the matter to the Office of the Australian Information Commissioner (OAIC) at [www.oaic.gov.au](https://www.oaic.gov.au) or on 1300 363 992.

## 13. Changes to this policy

We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other reasons. When we do, we'll update the "Effective" date at the top of this page. For material changes, we'll take reasonable steps to notify you — for example, by email or a prominent notice on our website.

## 14. Contact us

If you have a question about this Policy, want to access or correct your information, or wish to make a complaint, please get in touch.

**Privacy Officer · Tendr Property Management Pty Ltd**

| | |
|---|---|
| Email | <hello@tendr.services> |
| Post  | 19/5 Manning St, South Brisbane QLD 4101 |
| ABN   | 92 697 124 708 |

---

*Tendr Property Management Pty Ltd · ABN 92 697 124 708 · 19/5 Manning St, South Brisbane QLD 4101*
`;

export function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="markdown-body prose prose-slate max-w-none dark:prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {privacyPolicyMarkdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
