//test custom useOutSideClick hook
import useOutsideClick from './index';
import { useState, useRef } from 'react';

export default function OutSideClickTest() {
	const [showContent, setShowContent] = useState(false);
	const ref = useRef();
	useOutsideClick(ref, () => {
		setShowContent(false);
	});

	return (
		<div>
			{showContent ? (
				<div ref={ref} style={{ border: '1px solid black', margin: '20px' }}>
					<h1>This is placeholder content</h1>
					<p>
						Click outside the box to close. It won't close if you click inside
						the box.
					</p>
				</div>
			) : (
				<button onClick={() => setShowContent(true)}>Show Content</button>
			)}
		</div>
	);
}
