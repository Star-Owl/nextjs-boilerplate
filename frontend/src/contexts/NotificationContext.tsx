import React, { createContext, useState } from 'react'

interface NotificationContextProps {
	isSelected: boolean
	setIsSelected: React.Dispatch<React.SetStateAction<boolean>>
}

interface NotificationProviderProps {
	children: React.ReactNode
}

export const NotificationContext = createContext<
	NotificationContextProps | undefined
>(undefined)

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
	children,
}) => {
	const [isSelected, setIsSelected] = useState(true)

	return (
		<NotificationContext.Provider value={{ isSelected, setIsSelected }}>
			{children}
		</NotificationContext.Provider>
	)
}
