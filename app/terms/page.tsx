export const dynamic = "force-dynamic";
export const revalidate = 0;
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Terms & Conditions — Sikhadenge",
  description: "Terms and conditions for using Sikhadenge (ThinkGrow Pvt. Ltd.).",
  alternates: { canonical: "https://sikhadenge.in/terms" },
};

function PageShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:pt-12 pb-16">
        <div className="text-sm text-slate-500">
          <Link
            href="/"
            aria-label="Home"
            className="mr-2 inline-flex items-center hover:text-slate-900"
          >
            🏠
          </Link>
          <span className="mx-1">›</span>
          <span>{title}</span>
        </div>

        <h1 className="mt-6 text-4xl sm:text-6xl font-normal tracking-tight">
          {title}
        </h1>

        <div className="mt-4 text-[13px] sm:text-[14px] text-slate-600">
          {updated}
        </div>

        <div className="mt-10 max-w-5xl leading-relaxed text-[16px] sm:text-[17px] text-slate-900">
          {children}
        </div>
      </section>
    </main>
  );
}

function renderPolicyBlocks(raw: string) {
  const normalized = raw.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();

  const blocks = normalized
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block, idx) => {
    const oneLine = !block.includes("\n");

    const isHeading =
      oneLine &&
      block.length <= 80 &&
      !/[.?!:]$/.test(block) &&
      !block.toLowerCase().includes("http");

    if (isHeading) {
      return (
        <h2 key={idx} className="mt-10 font-semibold text-slate-900">
          {block}
        </h2>
      );
    }

    const lines = block.split("\n").map((x) => x.trim());
    const isBullets = lines.every((x) => x.startsWith("- "));

    if (isBullets) {
      return (
        <ul key={idx} className="mt-8 list-disc pl-6">
          {lines.map((x, j) => (
            <li key={j} className="mt-3">
              {x.replace(/^- /, "")}
            </li>
          ))}
        </ul>
      );
    }

    const text = block.replace(/\n+/g, " ");
    return (
      <p key={idx} className="mt-8">
        {text}
      </p>
    );
  });
}

export default function TermsPage() {
  const content = `Terms and Conditions

Last Updated on 20th Feb 2026

Introduction

This website under the name and style "Sikhadenge" and available at https://sikhadenge.in, is owned, operated, and made available by ThinkGrow Private Limited, with its registered office situated at Varanasi, Uttar Pradesh 221008 and includes any of our affiliates, associates, assignees or successors-in-interest as determined by us at our sole discretion and without requiring any prior notice or intimation ("Company", "we" or "us" or "our") to the person accessing, viewing or using the Website ("You" or "Your" or "User").

Please read these terms and conditions (“Terms and Conditions”), along with the Company’s privacy policy available at https://sikhadenge.in/privacy-policy and all other rules and policies made available or published on the Website as they shall govern Your use of the Website and the Services (defined below) provided thereunder.

Please note that You must be at least 18 (eighteen) years old to access, register on the Website and avail the Services. In case You represent an entity or an Institution (defined below), You hereby confirm that You have been duly authorized by such entity or Institution and further confirm that You are 18 (eighteen) years old or above and that You have the authority and all necessary approvals to enter into these Terms and Conditions and the Privacy Policy. If You are a Child, You are not permitted to access or register on this Website unless such access and registration is completed by a parent or legal guardian or the Instructor (defined below) as applicable. We may, in our sole discretion, refuse to offer the Service (defined below) to any person or entity and change the eligibility criteria at any time. Anyone below 18 (eighteen) years of age is assumed to be a child (“Child”) and requires parental consent to use the Website. The parents/legal guardian of the Child or users above 18 (eighteen) years of age are hereinafter referred to as “You” or “Your”.

The Website’s privacy practices regarding the collection, use and safeguard of Your information including any personal and sensitive personal information shall be governed by the Company’s Privacy Policy.

By using or visiting the Website, You confirm Your agreement to these Terms and Conditions and the Privacy Policy.

These Terms and Conditions are an electronic record as per the Information Technology Act, 2000 (as amended / re-enacted) and rules thereunder and is published in accordance with the provisions of Rule 3 (1)(b) of the Information Technology (Intermediaries Guidelines and Digital Media Ethics Code) Rules, 2021, which mandates publishing of rules and regulations, privacy policy and terms and conditions for access or usage of any application or website. This electronic record is generated by a computer system.

Acceptance of Terms

By accessing or using the Website or Services, You agree to be bound by these Terms and Conditions and the Privacy Policy. If You do not agree, do not use the Website or Services.

Overview of the Services

We as an intermediary make available certain features and tools that enable the Instructors to interact, work with and mentor the Students (defined below) through various digital learning solutions such as video conferencing in order to provide such Students with tutorial, educational and other education-related services (“Services”). The Website is a platform through which You can obtain information about us and our Services. You may use the Website to subscribe to the Services in accordance with the Terms and Conditions and the Privacy Policy.

The Website allows teachers, mentors and instructors to subscribe to our Services which further enables them to share, access, and provide various educational content including sessions, classes, lectures and webinars (“Instructors”) to various students across the globe who have subscribed to our Services to receive such educational content (“Students”).

As part of the Services, we also enable users of the Website to access various Company Materials (defined below) as may be provided by us on the Website from time to time. These Terms and Conditions apply to all Your and/or Your Child’s activities on the Website, our mobile application, other related services and platform as communicated to You by us from time to time.

Please note that we only act as an intermediary between the Instructors and the Students for the provision of Services. Any services provided by the Instructors shall be provided on an “as is” basis and we shall not be made responsible and/or liable for any performance and obligation of the Instructors including any warranty for the services being provided by such Instructors.

Additionally, as part of the Services, there are currently educational courses on various subjects offered by us, and depending upon the course module selected by You, we grant You access to the course module’s material, content, curriculum, documents and other information and data (“Company Material”) which may be in the form of video, audio, written, graphic, recorded, photographic, or any other format as may be prescribed and provided by us. Upon availing of the Services, we grant You a limited, non-transferable, non-exclusive and revocable license to access, view and use the Website, the Services and the Company Material for non-commercial purposes only. Any rights not expressly granted to You herein are reserved by the Company. You shall abide by and maintain all copyright notices, information, and restrictions contained in any such Company Material. It is hereby clarified that such Company Material may be provided by third parties and that the Company does not monitor, curate, edit or has any control over such Company Material. All Company Material is made available on an “as is” and “as available” basis and without any representations or warranties whatsoever.

It is further clarified that access to the Services under this Clause is for a limited period of time as communicated by us on the Website from time to time and any payment of Fees (defined below) does not entitle You or Your Child to unlimited access to the Services and/or the Company Materials.

Access

Subject to these Terms and Conditions and the Privacy Policy, we offer to provide the Services, which are selected by You, solely for Your benefit, and not for the use or benefit of any third party.

If there is any particular content You wish to procure from the Website pertaining to any Service, You may be required to send us an email from Your registered email-id, requesting us for access to such content. You agree and acknowledge that grant of any such request shall be at the sole discretion of the Company.

Registration and Eligibility

In order to use and avail the Services, You are required to register with us by providing personal information relating to You and/or the Child, and covenant that You shall provide us with accurate, correct and complete registration information and maintain its accuracy.

You acknowledge that Your user ID and password for the Website (“Login Details”) is for Your exclusive use only. You are solely responsible and liable for any activity that occurs on Your account and You shall not use or share Your Login Details with another user or person.

Registration as a user is only a one-time process and if You have been previously registered, You shall login / sign into Your account using the existing Login Details.

Notwithstanding anything contained herein, You shall not:
- provide any false personal information to us (including a false/fraudulent Login Details) or create any account for anyone other than Yourself without such person's explicit permission;
- use the Login Details that is the name of another person with the intent to impersonate that person;
- use the Login Details that is subject to any rights of a person other than You without appropriate authorization; or
- use/generate the Login Details that may be, in our sole opinion, offensive, vulgar, obscene or otherwise unlawful.

The subscription of the Services is not transferable, i.e., only the person or entity on whose name the subscription is made will be eligible to avail the Services.

Instructor Content

As an Instructor, You are responsible for all content that You post, including lectures, quizzes, coding exercises, practice tests, assignments, resources, answers, course landing page content, labs, assessments, and announcements (“Instructor Content”). The Company does not monitor or edit the Instructor Content provided by the Instructors. The Company may decline to accept and/or remove any Instructor Content that contains any information inconsistent with the Terms and Conditions and the Privacy Policy. Any Instructor Content uploaded/added by the Instructors shall be subject to applicable laws and these Terms and Conditions and the Privacy Policy and may be disabled or may be subject to investigation under applicable laws. The Instructor shall abide by and maintain all copyright notices, information, and restrictions contained in any such Instructor Content accessed by the Students. You agree and acknowledge that we shall assume no liability for the quality and standard of such Instructor Content and shall not represent and warrant that such Instructor Content shall not be infringing any third-party intellectual property and/or applicable laws.

Fees and Payment

The Services are made available to You on a subscription basis. The fees for subscription to the Services availed by You and/or Your Child (“Fees”) shall be communicated by us on the Website from time to time and shall be valid until the completion of the period of your selected Service or until cancelled or terminated in accordance with these Terms and Conditions and Privacy Policy.

At present, we may charge for the Services in INR (Indian Rupees) and/or in USD (United States Dollars). You explicitly agree to pay the Fees for the Services that You or Your Child avail and the Company Materials that You or Your Child access on the Website. All payment of Fees shall be through the payment mechanism put in place by the Company on the Website and You shall be responsible for paying all Fees and applicable taxes in a timely manner as per the mechanism associated with the Service availed by You or Your Child. The payment terms may be reviewed and revised at our sole discretion.

All payment of Fees made towards obtaining the subscription for the Services shall be made directly to us via the channels provided to You and shall not be made to the Instructors directly at any point of time. We reserve the right to delete or suspend Your or Your Child’s access to Services for incomplete payment of Fees and any applicable charges.

While making payments through payment gateways set up by us, You agree to be governed and bound by the terms and conditions of the third-party payment gateway service providers, including any convenience fee levied by such service provider.

Data and Privacy

When You avail the Services, You agree that You are involved in the transmission of sensitive and personal information, especially information related to Your Child. You agree and consent to us collecting, using, storing and processing such information, in accordance with our Privacy Policy read along with these Terms and Conditions.

Intellectual Property and Company Materials

All trademarks, information, content, marks, texts, video, software and material (including the Company Material) on the Website and Services are the intellectual property of the Company and/or its licensors. You covenant not to reproduce whether in whole or partly of the aforementioned intellectual property, except with the prior written consent of the Company. You undertake to use the Services and the Company’s intellectual property only for the purposes specified in these Terms and Conditions.

We may make available on the Services certain Company Materials that are owned by us or our third-party licensors. We grant You and/or Your Child a non-exclusive, non-transferable right to access and use such Company Materials solely for Your personal and non-commercial purposes. Unless expressly indicated on the Services that a particular item is made available under alternate license terms, You or Your Child may not download, distribute, sell, lease, modify, or otherwise provide access to the Company Material to any third party.

Prohibited Use

As a condition of use, You covenant not to use the Services and the Company Materials for any purpose that is prohibited by these Terms and Conditions, the Privacy Policy and by the applicable laws in force. You are responsible for all of Your activity in connection with the Services and the Company Materials.

Compliance and Disclosure

We reserve the right to access, read, preserve, and disclose any information as we reasonably believe is necessary to satisfy applicable law, enforce these Terms, detect/prevent fraud and technical issues, respond to support requests, or protect rights and safety.

No Personal Liability

Nothing contained herein shall be deemed to exclude or limit your liability in respect of any indemnity given by you under these Terms. Without prejudice to the foregoing, none of the directors, officers, employees, and agents of Sikhadenge/ThinkGrow Pvt. Ltd. shall be personally liable for any action in connection with the Website or Services.

User Content

Subject to these Terms and Conditions and the Privacy Policy, we may provide You access to submit, post, publish, or broadcast content on our Website so as to provide feedback on the Services (“User Content”). You agree that we reserve the right to remove any User Content at our sole discretion. The Company does not monitor or edit the User Content provided by You. The Company may decline to accept and/or remove any User Content that contains any information inconsistent with the Terms and Conditions and the Privacy Policy.

Indemnity

To the extent permitted by law, You agree to indemnify and keep indemnified, defend and hold the Company and its affiliates and its and their respective officers, directors, shareholders, employees, agents and representatives harmless from and against any and all losses and damages, including reasonable fees and expenses, relating to claims arising out of (i) Your use of the Services; (ii) any breach of these Terms and Conditions by You; and (iii) violation of any applicable law by You.

Termination

We may terminate Your access to all or any part of the Service at any time and/or deactivate Your account or limit Your access to the Website if You breach these Terms/Privacy Policy, if Your use may create a security issue, or for any other reason we deem fit. If You wish to terminate Your account, you may do so by initiating a support request by email from Your registered email-id or through such other means as provided on the Website. Fees paid are non-refundable except where a refund is expressly approved under our Refund Policy or required by applicable law. Provisions which by their nature survive termination shall survive.

Governing Law and Jurisdiction

These Terms and Conditions along with the Privacy Policy shall be governed by and construed in accordance with the laws of India.

Modification of Terms and Conditions

We may update these Terms and Conditions from time to time. The updated Terms will be posted on the Website with a revised “Last Updated” date. Continued use indicates acceptance of the updated Terms.

Advertisements and Third-Party Links

We may display advertisements. The Website may include links to third-party websites/applications. Their terms and privacy practices may differ. Access/use of such third-party websites is at Your sole risk and we disclaim liability for losses arising therefrom.

Company Address and Support

Registered Office: ThinkGrow Private Limited, Varanasi, Uttar Pradesh 221008, India.
Support Email: support@sikhadenge.in

Contact

Should You have questions about these Terms and Conditions and the Privacy Policy or information practices, you may contact our support team at support@sikhadenge.in.
`;

  return (
    <PageShell title="Terms & Conditions" updated="Last Updated on 20th Feb 2026">
      {renderPolicyBlocks(content)}
    </PageShell>
  );
}
