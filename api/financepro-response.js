export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are supported' 
    });
  }

  const { issue, preference } = req.body;

  const responses = {
    E405: {
      quick: "Try running the installer as administrator...",
      detailed: "Thanks for choosing the detailed walkthrough..."
    },
    planUpgrade: {
      quick: "Perfect! Moving from 5 to 15 users...",
      detailed: "With 15 users, you qualify for our Professional plan..."
    },
    dataRecovery: {
      quick: "Good news! We can recover your deleted data...",
      detailed: "We offer free data recovery within 30 days..."
    },
    billingDispute: {
      quick: "This looks like a mistaken charge...",
      detailed: "You're absolutely right to expect a 30-day trial..."
    },
    integration: {
      quick: "Perfect! We have pre-built integrations...",
      detailed: "Excellent! We have robust integrations for Shopify and PayPal..."
    },
    technicalSupport: {
      quick: "Our Level 1 support is available 24/7...",
      detailed: "We offer Level 1 & Level 2 technical support depending on need..."
    },
    general: {
      quick: "I'm here to help! Can you provide more details?",
      detailed: "I'd be happy to help — please share more details..."
    }
  };

  const reply = responses[issue]?.[preference];

  if (reply) {
    return res.status(200).json({
      message: reply,
      issue,
      preference
    });
  } else {
    return res.status(400).json({
      error: 'Invalid issue or preference'
    });
  }
}
