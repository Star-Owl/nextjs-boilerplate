import { useState, useEffect } from 'react'

function useDeviceAndBrowser() {
	const [info, setInfo] = useState({
		deviceType: 'unknown',
		os: 'unknown',
		browser: 'unknown',
	})

	useEffect(() => {
		const getDeviceType = () => {
			const deviceUserAgents: { [key: string]: RegExp[] } = {
				mobile: [/Android/i, /iPhone/i, /Windows Phone/i, /iPod/i],
				tablet: [/iPad/i, /Android/i],
				pc: [/Windows NT/i, /Macintosh/i, /Linux/i],
			}

			for (const device in deviceUserAgents) {
				if (
					deviceUserAgents[device].some((ua: RegExp) =>
						navigator.userAgent.match(ua),
					)
				) {
					return device
				}
			}

			return 'unknown'
		}

		const getOS = () => {
			const osList: Record<string, RegExp> = {
				android: /Android/i,
				ios: /iPhone|iPad|iPod/i,
				windows: /Windows NT/i,
				mac: /Macintosh/i,
				linux: /Linux/i,
			}

			for (const os in osList) {
				if (navigator.userAgent.match(osList[os])) {
					return os
				}
			}

			return 'unknown'
		}

		const getBrowser = () => {
			const browsers: Record<string, RegExp> = {
				chrome: /Chrome/i,
				safari: /Safari/i,
				firefox: /Firefox/i,
				ie: /MSIE|Trident/i,
				edge: /Edg/i,
				opera: /Opera/i,
			}

			for (const browser in browsers) {
				if (Object.prototype.hasOwnProperty.call(browsers, browser)) {
					if (navigator.userAgent.match(browsers[browser])) {
						return browser
					}
				}
			}

			return 'unknown'
		}

		setInfo({
			deviceType: getDeviceType(),
			os: getOS(),
			browser: getBrowser(),
		})

		// const updateDeviceInfo = () => {
		// 	setInfo({
		// 		deviceType: getDeviceType(),
		// 		os: getOS(),
		// 		browser: getBrowser(),
		// 	})
		// }

		// updateDeviceInfo()

		// window.addEventListener('resize', updateDeviceInfo)
		// return () => window.removeEventListener('resize', updateDeviceInfo)
	}, [])

	return info
}

export default useDeviceAndBrowser

// const { device, os, browser } = useDeviceAndBrowser();
