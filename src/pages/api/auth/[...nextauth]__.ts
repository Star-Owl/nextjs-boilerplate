import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { Session } from 'next-auth'
import Providers from 'next-auth/providers'
import prisma from 'src/lib/prisma'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		await NextAuth(req, res, {
			providers: [
				Providers.Credentials({
					name: 'Credentials',
					credentials: {
						email: { label: 'Email', type: 'email' },
						password: { label: 'Password', type: 'password' },
					},
					async authorize(credentials) {
						const user = await prisma.user.findUnique({
							where: { email: credentials.email },
						})

						if (!user) {
							throw new Error('Invalid email or password')
						}

						const passwordMatch = await verifyPassword(
							credentials.password,
							user.password,
						)

						if (!passwordMatch) {
							throw new Error('Invalid email or password')
						}

						return { id: user.id, email: user.email }
					},
				}),
			],
			adapter: PrismaAdapter(prisma),
			session: {
				jwt: true,
				maxAge: 30 * 24 * 60 * 60, // 30 days
			},
			jwt: {
				secret: process.env.JWT_SECRET,
			},
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'An error occurred' })
	}
}

async function verifyPassword(password: string, hash: string) {
	try {
		return await argon2.verify(hash, password)
	} catch (error) {
		console.error(error)
		return false
	}
}
