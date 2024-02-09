import { useState, useEffect } from 'react';

export default function RandomColor() {
	const [color, setColor] = useState('#000000');
	const [typeOfColor, setTypeOfColor] = useState('hex');

	function randomColorNum(length) {
		return Math.floor(Math.random() * length);
	}

	function handleCreateRandomHexColor() {
		const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
		let hexColor = '#';
		//loop runs 6 times since # colors have 6 characters/#s - in each loop adds random item from hex array
		for (let i = 0; i < 6; i++) {
			hexColor += hex[randomColorNum(hex.length)];
		}
		setColor(hexColor);
	}
	function handleCreateRandomRgbColor() {
		const r = randomColorNum(256);
		const g = randomColorNum(256);
		const b = randomColorNum(256);
		setColor(`rgb(${r},${g},${b})`);
	}
	useEffect(() => {
		if (typeOfColor === 'rgb') handleCreateRandomRgbColor();
		else handleCreateRandomHexColor();
	}, [typeOfColor]);

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				background: color,
			}}
		>
			<button onClick={() => setTypeOfColor('hex')}>Create Hex Color</button>
			<button onClick={() => setTypeOfColor('rgb')}>Create RGB Color</button>
			<button
				onClick={
					typeOfColor === 'hex'
						? handleCreateRandomHexColor
						: handleCreateRandomRgbColor
				}
			>
				Generate Random Color
			</button>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					color: '#fff',
					fontSize: '60px',
					marginTop: '50px',
					flexDirection: 'column',
					gap: '20px',
				}}
			>
				<h3>{typeOfColor === 'rgb' ? 'RGB Color' : 'Hex Color'}</h3>
				<h1>{color}</h1>
			</div>
		</div>
	);
}
