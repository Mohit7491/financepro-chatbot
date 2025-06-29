export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are supported' 
    });
  }

  try {
    const { issue, preference } = req.body;

    // Input validation
    if (!issue || !preference) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Both "issue" and "preference" are required',
        expected: {
          issue: 'string (E405, planUpgrade, dataRecovery, billingDispute, integration)',
          preference: 'string (quick, detailed)'
        }
      });
    }

    // Validate preference values
    if (!['quick', 'detailed'].includes(preference)) {
      return res.status(400).json({
        error: 'Invalid preference',
        message: 'Preference must be either "quick" or "detailed"'
      });
    }

    // Response templates
    const responses = {
      E405: {
        quick: "Try running the installer as administrator (right-click → 'Run as administrator'). If that doesn't work, I can connect you with our Level 2 tech team who can walk you through it. They're available 9am–9pm IST. Need me to escalate this?",
        detailed: "Thanks for choosing the detailed walkthrough! Error E-405 is typically a permissions-related issue during installation. First, close the installer completely, then right-click on the setup file and select 'Run as administrator.' If that doesn't work, try temporarily disabling your antivirus, run the installer again, then re-enable antivirus. I can escalate this to our Level 2 support if needed—available 9am–9pm IST. Want me to set up a callback?"
      },
      planUpgrade: {
        quick: "Perfect! Moving from 5 to 15 users puts you in our Professional plan with a 10% volume discount. The upgrade is prorated for this billing cycle. I can process this right now—want me to do it?",
        detailed: "With 15 users, you qualify for our Professional plan (up to 25 users), which includes advanced reporting and priority support. You also get a 10% volume discount, and the billing is prorated. Your new plan includes enhanced user management tools and faster processing. Shall I process the upgrade and email you the confirmation?"
      },
      dataRecovery: {
        quick: "Good news! We can recover your deleted transaction data for free within 30 days. I've initiated the recovery—it will be restored within 2–4 hours. You'll get a confirmation email once done.",
        detailed: "Don't worry—your data isn't lost! We offer free data recovery within 30 days of deletion. I've initiated the recovery process using our automated backups, and your transaction data will be restored within 2–4 hours. You'll receive an email confirmation once complete. I also recommend enabling our daily backup feature to prevent future issues. Want help setting that up after recovery?"
      },
      billingDispute: {
        quick: "This looks like a mistaken charge during your free trial signup. I'm processing your full refund now and activating your proper 30-day free trial. The refund will reflect within 24 hours.",
        detailed: "You're absolutely right to expect a 30-day free trial without any charges. This was clearly a billing error on our end. I've issued a complete refund and activated your proper 30-day trial. The refund will appear on your payment method within 24 hours. I've also added a note to your account to prevent this from happening again, and you'll receive a confirmation email with your trial details."
      },
      integration: {
        quick: "Perfect! We have pre-built integrations for both Shopify and PayPal at no extra cost. These are among our most popular connections. I can send you setup guides right now, or arrange a demo if you'd prefer.",
        detailed: "Excellent! We have robust pre-built integrations for both Shopify and PayPal included at no additional cost. The Shopify integration automatically syncs orders, inventory, and customer data, while PayPal handles transaction reconciliation and payment tracking. Setup typically takes about 15 minutes per integration. I can send you step-by-step guides, or arrange a demo call with our integration specialist to show you exactly how they work. What would you prefer?"
      },
      // Add fallback for unknown technical issues
      technicalSupport: {
        quick: "I can help you with that technical issue. Our Level 1 support is available 24/7, and Level 2 support is available 9am-9pm IST. Would you like me to escalate this or try some troubleshooting steps first?",
        detailed: "I'm here to help resolve your technical issue. We offer Level 1 support 24/7 via chat, and our Level 2 technical team is available 9am-9pm IST, Monday-Saturday for more complex issues. Critical problems are escalated within 2 hours. Would you like me to connect you with the appropriate support level, or shall we try some initial troubleshooting steps first?"
      },
      // General fallback
      general: {
        quick: "I'm here to help! Can you provide more details about your specific issue so I can give you the best assistance?",
        detailed: "I'd be happy to help you with your inquiry. To provide you with the most accurate and helpful response, could you please share more details about your specific situation? This will help me direct you to the right solution or connect you with the appropriate specialist if needed."
      }
    };

    // Find the response
    const reply = responses[issue]?.[preference];
    
    if (reply) {
      return res.status(200).json({ 
        success: true,
        message: reply,
        issue: issue,
        preference: preference,
        timestamp: new Date().toISOString()
      });
    } else {
      // Provide helpful error with available options
      const availableIssues = Object.keys(responses);
      return res.status(400).json({
        error: 'Invalid issue type',
        message: `Issue type "${issue}" not found. Please use one of the available issue types.`,
        availableIssues: availableIssues,
        requestedIssue: issue,
        requestedPreference: preference
      });
    }

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong processing your request. Please try again.',
      timestamp: new Date().toISOString()
    });
  }
}

// Optional: Add CORS support if needed
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
