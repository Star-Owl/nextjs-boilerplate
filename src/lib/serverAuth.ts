import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'src/lib/prismadb'
import { authOptions } from 'src/pages/api/auth/[...nextauth]'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getServerSession({
		req,
		res,
		...authOptions,
	})

	if (!session?.user?.email) {
		throw new Error('Not signed in')
	}

	const currentUser = await prisma.user.findUnique({
		where: {
			email: session.user.email,
		},
		include: {
			Following: true,
		},
	})

	if (!currentUser) {
		throw new Error('Not signed in')
	}

	return { currentUser }
}

export async function isUserAuthenticated(
	req: NextApiRequest,
): Promise<boolean> {
	const session = await getSession({ req })

	if (!session) {
		return false
	}

	return true
}

export default serverAuth
