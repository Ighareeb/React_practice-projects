import { useRef } from 'react';
//adjust section to scroll to by changing ref element &/or index
export default function ScrollToSection() {
	const ref = useRef();

	const data = [
		{
			label: 'First Card',
			style: {
				width: '100%',
				height: '600px',
				background: 'red',
			},
		},
		{
			label: 'Second Card',
			style: {
				width: '100%',
				height: '600px',
				background: 'grey',
			},
		},
		{
			label: 'Third Card',
			style: {
				width: '100%',
				height: '600px',
				background: 'blue',
			},
		},
		{
			label: 'Fourth Card',
			style: {
				width: '100%',
				height: '600px',
				background: 'green',
			},
		},
		{
			label: 'Fifth Card',
			style: {
				width: '100%',
				height: '600px',
				background: 'orange',
			},
		},
	];

	function handleScrollToSection() {
		let position = ref.current.getBoundingClientRect().top;
		//getBoundingClientRect() returns a DOM object representing a rectangle with width, height, top, bottom, left, right (x, y) origin coodinates(which is top left of VP)
		//so position is info about the size and position of ref.current (element) relative to the viewport

		window.scrollTo({
			top: position,
			behavior: 'smooth',
		});
	}

	return (
		<div>
			<h1>Scroll to a Particular Section</h1>
			<button onClick={handleScrollToSection}>Click to Scroll</button>
			{data.map((dataItem, index) => (
				<div ref={index === 2 ? ref : null} style={dataItem.style}>
					<h3>{dataItem.label}</h3>
				</div>
			))}
		</div>
	);
}
