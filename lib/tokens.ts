import { v4 as uuidv4 } from 'uuid'
import { db } from '@/lib/db'

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 Hour

  // Delete any existing tokens for this email
  // VerificationToken uses a composite unique key, not an id field
  await db.verificationToken.deleteMany({
    where: { identifier: email }
  })

  const verificationToken = await db.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    }
  })

  return verificationToken
}
