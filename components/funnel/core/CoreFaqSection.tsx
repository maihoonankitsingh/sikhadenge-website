const faqs = [
  ["Is the AI Expert Program the same as the implementation workshop?", "No. The workshop is a focused product-specific implementation bridge. The AI Expert Program is the broader structured program covering transferable AI work across research, productivity, content, data, creative workflows, automation and application."],
  ["Do I need to buy the implementation workshop first?", "For this funnel path, yes. The program checkout is issued only to a lead with a verified captured implementation-workshop payment. This keeps the backend offer tied to learners who have already demonstrated implementation intent."],
  ["Is the ₹14,999 fee fixed?", "The payable program amount is controlled by server configuration and verified against Razorpay. The browser cannot set or alter the amount."],
  ["Does the program guarantee a job, salary increase or business result?", "No. Sikhadenge provides education, guided practice and project-based learning. Employment, income and business outcomes depend on many factors and are not guaranteed."],
  ["Is this officially affiliated with OpenAI or Anthropic?", "No. SikhaDenge is an independent education provider. ChatGPT is a product of OpenAI and Claude is a product of Anthropic. Product names are used to describe tools taught in the learning workflow."],
  ["Can I speak to someone before enrolling?", "If the advisor channel is enabled for the cohort, the page provides an optional advisor CTA. The advisor path is for fit and program questions; it is not required to unlock checkout."],
  ["What happens after payment?", "Enrollment is confirmed only after server-side verification of the Razorpay signature, provider payment status, exact amount and currency. The confirmation page then shows the verified enrollment state."],
] as const;

export default function CoreFaqSection() {
  return (
    <section className="core-section core-section-light">
      <div className="core-section-head">
        <span className="core-kicker">FAQ</span>
        <h2>Clear expectations before a higher-value enrollment.</h2>
      </div>
      <div className="core-faqs">
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
