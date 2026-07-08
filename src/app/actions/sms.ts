"use server";

import twilio from "twilio";

// These will come from your .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

/**
 * Send an SMS message using Twilio.
 * If API keys are not configured, it will simulate a successful send for testing.
 */
export async function sendSMS(to: string, message: string) {
  try {
    // Check if Twilio keys are configured
    if (!accountSid || !authToken || !fromPhone) {
      console.log("\n=============================================");
      console.log("📱 SMS MOCK MODE (Twilio not configured)");
      console.log(`To: ${to}`);
      console.log(`Message: ${message}`);
      console.log("=============================================\n");
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true, mocked: true };
    }

    // Actual Twilio Integration
    const client = twilio(accountSid, authToken);
    
    const response = await client.messages.create({
      body: message,
      from: fromPhone,
      to: to, // Must be E.164 format (e.g., +1234567890)
    });

    console.log(`✅ SMS successfully sent to ${to}. Twilio SID: ${response.sid}`);
    return { success: true, messageId: response.sid };

  } catch (error: any) {
    console.error("❌ Failed to send SMS:", error);
    return { success: false, error: error.message };
  }
}
