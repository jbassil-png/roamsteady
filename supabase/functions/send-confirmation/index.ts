import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  email: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  plan: string;
  reservationId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, destination, startDate, endDate, plan, reservationId }: ConfirmationEmailRequest = await req.json();

    console.log("Sending confirmation email to:", email);

    const planNames: Record<string, string> = {
      standard: 'Standard ($8/day)',
      unlimited: 'Unlimited ($12/day)',
      premium: 'Premium ($18/day)',
    };

    const emailResponse = await resend.emails.send({
      from: "RoamSteady <onboarding@resend.dev>",
      to: [email],
      subject: "Your RoamSteady Reservation is Confirmed! 🌍",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Reservation Confirmed!</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hi ${name},</p>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                Great news! Your RoamSteady travel WiFi device reservation is confirmed. Get ready to stay connected on your journey!
              </p>
              
              <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea;">
                <h2 style="margin-top: 0; color: #667eea; font-size: 20px;">Reservation Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>Reservation ID:</strong></td>
                    <td style="padding: 8px 0; text-align: right;"><code style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 14px;">${reservationId.slice(0, 8)}</code></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>Destination:</strong></td>
                    <td style="padding: 8px 0; text-align: right;">${destination}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>Travel Dates:</strong></td>
                    <td style="padding: 8px 0; text-align: right;">${startDate} - ${endDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>Plan:</strong></td>
                    <td style="padding: 8px 0; text-align: right;">${planNames[plan] || plan}</td>
                  </tr>
                </table>
              </div>
              
              <div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #92400e; font-size: 18px;">📦 What Happens Next?</h3>
                <ul style="margin: 10px 0; padding-left: 20px; color: #78350f;">
                  <li style="margin: 8px 0;">Your device will be shipped <strong>2-3 days before</strong> your departure date</li>
                  <li style="margin: 8px 0;">You'll receive tracking information via email</li>
                  <li style="margin: 8px 0;">Return the device within <strong>3 days</strong> of your return date</li>
                  <li style="margin: 8px 0;">The $200 device hold will be refunded upon safe return</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #666; margin-bottom: 15px;">Need to check or modify your reservation?</p>
                <a href="${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '.lovable.app') || 'https://roamsteady.lovable.app'}/my-reservations" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                  View My Reservations
                </a>
              </div>
              
              <div style="border-top: 2px solid #e5e7eb; margin-top: 30px; padding-top: 20px; text-align: center; color: #666; font-size: 14px;">
                <p>Questions? Contact us at support@roamsteady.com</p>
                <p style="margin-top: 10px;">Safe travels! ✈️</p>
                <p style="margin-top: 15px; color: #999; font-size: 12px;">
                  RoamSteady - Stay Connected Everywhere
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending confirmation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
