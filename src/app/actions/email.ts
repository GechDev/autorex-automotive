"use server";

import { Resend } from "resend";

// This will come from your .env file
const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"; // Default Resend test email

/**
 * Send an Email message using Resend.
 * If API keys are not configured, it will simulate a successful send for testing.
 */
export async function sendEmail(to: string, subject: string, message: string) {
  try {
    // Check if Resend keys are configured
    if (!resendApiKey) {
      console.log("\n=============================================");
      console.log("📧 EMAIL MOCK MODE (Resend API Key not found)");
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message:\n${message}`);
      console.log("=============================================\n");
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true, mocked: true };
    }

    // Actual Resend Integration
    const resend = new Resend(resendApiKey);
    
    const { data, error } = await resend.emails.send({
      from: `AutoRex Automotive <${fromEmail}>`,
      to: [to],
      subject: subject,
      html: `<div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
               <h2>${subject}</h2>
               <p style="white-space: pre-wrap; line-height: 1.5;">${message}</p>
               <br/>
               <hr style="border: none; border-top: 1px solid #eaeaea;" />
               <p style="font-size: 12px; color: #888;">Thank you for choosing AutoRex Automotive Services.</p>
             </div>`,
    });

    if (error) {
      console.error("❌ Failed to send Email:", error);
      return { success: false, error: error.message };
    }

    console.log(`✅ Email successfully sent to ${to}. ID: ${data?.id}`);
    return { success: true, messageId: data?.id };

  } catch (error: any) {
    console.error("❌ Failed to send Email:", error);
    return { success: false, error: error.message };
  }
}
