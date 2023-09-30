import useSWR from 'swr'

import fetcher from 'src/lib/fetcher'

const useUser = (username: string) => {
	const { data, error, isLoading, mutate } = useSWR(
		username ? `/api/${username}` : null,
		fetcher,
	)

	return {
		data,
		error,
		isLoading,
		mutate,
	}
}

export default useUser
