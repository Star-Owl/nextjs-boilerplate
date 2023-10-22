import React, { ReactNode, createContext, useContext, useState } from 'react'

interface ThemeContextProps {
	isSecondaryTheme: boolean
	toggleTheme: () => void
	accentHue: number
	setAccentHue: (hue: number) => void
}

interface ThemeProviderProps {
	children: ReactNode
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
	undefined,
)

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [isSecondaryTheme, setIsSecondaryTheme] = useState(false)
	const [accentHue, setAccentHue] = useState(215)

	const toggleTheme = () => {
		setIsSecondaryTheme((prev) => !prev)
	}

	return (
		<ThemeContext.Provider
			value={{ isSecondaryTheme, toggleTheme, accentHue, setAccentHue }}
		>
			{children}
		</ThemeContext.Provider>
	)
}

// Przykład użycia kontekstu w komponencie
const ThemedComponent: React.FC = () => {
	const themeContext = useContext(ThemeContext)

	if (!themeContext) {
		throw new Error('ThemedComponent must be used within a ThemeProvider')
	}

	const { isSecondaryTheme, accentHue } = themeContext

	// Użyj wartości isSecondaryTheme i accentHue, aby dostosować style komponentu

	return (
		<div style={{ color: `hsl(${accentHue}, 75%, 97%)` }}>
			{/* Reszta komponentu */}
		</div>
	)
}
