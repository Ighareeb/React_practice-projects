import { useState } from 'react';
import QRCode from 'react-qr-code'; //react component library used to generate/display QR code based on some data (that it encodes into QR)

export default function QRCodeGenerator() {
	const [qrCode, setQrCode] = useState('');
	const [input, setInput] = useState('');

	function handleGenerateQrCode() {
		setQrCode(input);
		setInput('');
	}

	return (
		<div>
			<h1>QR Code Generator</h1>
			<div>
				<input
					onChange={(e) => setInput(e.target.value)}
					type="text"
					name="qr-code"
					value={input}
					placeholder="Enter data to encode into QR code"
				/>
				<button
					disabled={input && input.trim() !== '' ? false : true}
					onClick={handleGenerateQrCode}
				>
					Generate QR Code
				</button>
			</div>
			<div>
				<QRCode value={qrCode} id="qr-code-value" size={400} bgColor="#fff" />
			</div>
		</div>
	);
}
