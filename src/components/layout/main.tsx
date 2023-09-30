import { FunctionComponent } from 'react'
import React from 'react'
import Posts from './post/posts'
//import UserProfile from './user/UserProfile'

interface Props {
	posts: any[]
	userProfile?: any
	following?: string[]
	page?: 'feed' | 'profile'
	username?: string
}

const Main: FunctionComponent<Props> = ({
	posts,
	userProfile,
	following,
	page = 'feed',
	username,
}) => {
	// Filter the posts array based on the users that the current user follows
	const filteredPosts = following
		? posts.filter((post) => following.includes(post.author))
		: posts

	return (
		<React.Fragment>
			{page === 'profile' && userProfile && (
				<p>user profile of {userProfile}</p>
				// <UserProfile
				// 	userProfile={userProfile}
				// 	posts={posts.filter((post) => post.author === userProfile.username)}
				// />
			)}
			{page === 'feed' && <Posts posts={filteredPosts} />}
			{page === 'profile' && !userProfile && (
				<p>This user does not exist.</p>
			)}
			{page === 'profile' && username && username !== userProfile && (
				//userProfile?.username
				<p>You are not authorized to view this user&apos;s profile.</p>
			)}
		</React.Fragment>
	)
}

export default Main
