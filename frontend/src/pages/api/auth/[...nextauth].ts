// Import necessary libraries
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import NextAuth from 'next-auth'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// Initialize Firebase using environment variables
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
//const analytics = getAnalytics(app)
const auth = getAuth(app)

export default NextAuth({
	providers: [
		{
			id: 'credentials',
			name: 'Credentials',
			type: 'credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
					//placeholder: 'jsmith@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				// if (!credentials) {
				// 	throw new Error('Missing credentials')
				// }

				// If no email or password were provided, throw an error
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Invalid credentials')
				}

				const { email, password } = credentials as Record<
					string,
					string
				>
				try {
					// Use Firebase Authentication to verify credentials
					const userCredential = await signInWithEmailAndPassword(
						auth,
						email,
						password,
					)
					const user = userCredential.user
					return {
						id: user.uid,
						name: user.displayName,
						email: user.email,
						image: user.photoURL,
					}
				} catch (error) {
					console.error(error)
					return null
					//throw new Error('Authorization failed')
				}
			},
		},
	],
	pages: {
		// signIn: '/auth/signin',
		// signOut: '/auth/signout',
		// error: '/404',
		// verifyRequest: '/auth/verify-request',
		//newUser: null,
	},
	callbacks: {
		async session({ session, user }) {
			session.user = user
			return session
		},
	},
})
