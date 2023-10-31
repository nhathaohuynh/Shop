import React, { useEffect } from 'react'

const ScrollToTop = () => {
	function scrollToTop() {
		window.scrollTo(0, 0)
	}

	useEffect(() => {
		scrollToTop()
	}, [])

	// Rest of your component code

	return <></>
}

export default ScrollToTop
