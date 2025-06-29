export default function handler(req, res) {
  const { issue, preference } = req.body;

  // Responses based on issue and preference
  const responses = {
    E405: {
      quick: "Try running the installer as administrator (right-click → 'Run as administrator'). If that doesn't work, I can connect you with our Level 2 tech team who can walk you through it. They're available 9am–9pm IST. Need me to escalate this?",
      detailed: "Thanks for choosing the detailed walkthrough! Error E-405 is typically a permissions-related issue during installation. First, close the installer completely, then right-click on the setup file and select 'Run as administrator.' If that doesn’t work, try temporarily disabling your antivirus, run the installer again, then re-enable antivirus. I can escalate this to our Level 2 support if needed—available 9am–9pm IST. Want me to set up a callback?"
    },
    planUpgrade: {
      quick: "Perfect! Moving from 5 to 15 users puts you in our Professional plan with a 10% volume discount. The upgrade is prorated for this billing cycle. I can process this right now—want me to do it?",
      detailed: "With 15 users, you qualify for our Professional plan (up to 25 users), which includes advanced reporting and priority support. You also get a 10% volume discount, and the billing is prorated. Shall I process the upgrade and email you the confirmation?"
    },
    dataRecovery: {
      quick: "Good news! We can recover your deleted transaction data for free within 30 days. I’ve initiated the recovery—it will be restored within 2–4 hours. You’ll get a confirmation email once done.",
      detailed: "Don’t worry—your data isn’t lost! We offer free recovery within 30 days. I’ve initiated the process, and your backup will restore in 2–4 hours. You’ll get an email once complete. I also recommend enabling our daily backup feature. Want help setting that up later?"
    },
    billingDispute: {
      quick: "This looks like a mistaken charge during your free trial. I’m processing your refund now, and activating your 30-day free trial. Refund will reflect within 24 hours.",
      detailed: "You're right to expect a 30-day free trial without charges. I’ve issued a full refund and activated your proper trial. Refund reflects in 24 hours. A note has been added to your account to prevent future issues. Confirmation email sent too!"
    },
    integration: {
      quick: "We support both Shopify and PayPal integrations out-of-the-box. I can send you setup guides now, or arrange a demo if you'd prefer.",
      detailed: "We have pre-built integrations for Shopify and PayPal—no extra cost. Shopify syncs orders and customer data, while PayPal tracks payments and reconciliation. Setup takes ~15 minutes. I can also arrange a live demo with our integration specialist. Want to schedule that?"
    },
  };

  // Find the response based on inputs
  const reply = responses[issue]?.[preference];

  if (reply) {
    res.status(200).json({ message: reply });
  } else {
    res.status(200).json({
      message: "Sorry, I couldn't find a matching response. Please double-check your selections.",
    });
  }
}
