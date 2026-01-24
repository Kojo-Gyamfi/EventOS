import { resend } from './resend'

const domain = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/reset-password?token=${token}`

  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Reset your EventOS password',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">EventOS</h1>
            </div>
            
            <div style="background: #ffffff; padding: 40px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-top: 0;">Reset Your Password</h2>
              
              <p style="color: #666; font-size: 16px;">
                We received a request to reset your password for your EventOS account. Click the button below to create a new password:
              </p>
              
              <div style="text-align: center; margin: 35px 0;">
                <a href="${resetLink}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 16px;">
                  Reset Password
                </a>
              </div>
              
              <p style="color: #666; font-size: 14px;">
                Or copy and paste this link into your browser:
              </p>
              <p style="color: #667eea; font-size: 14px; word-break: break-all; background: #f5f5f5; padding: 12px; border-radius: 4px;">
                ${resetLink}
              </p>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
              
              <p style="color: #999; font-size: 13px; margin-bottom: 5px;">
                This link will expire in 1 hour for security reasons.
              </p>
              <p style="color: #999; font-size: 13px; margin-top: 5px;">
                If you didn't request a password reset, you can safely ignore this email.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
              <p>© ${new Date().getFullYear()} EventOS. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    })

    console.log(`✅ Password reset email sent to ${email}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to send password reset email:', error)
    throw new Error('Failed to send password reset email')
  }
}
