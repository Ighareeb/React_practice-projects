import Modal from './modal';
import './modal.css';
import { useState } from 'react';

export default function ModalTestPage() {
	const [showModal, setShowModal] = useState(false);

	function handleToggleShowModal() {
		setShowModal(!showModal);
	}

	function onClose() {
		setShowModal(false);
	}
	return (
		<div>
			<button onClick={handleToggleShowModal}>Open Modal</button>
			{showModal && (
				<Modal
					id={'placeholder-id'}
					header={<h1>Placeholder Header</h1>}
					footer={<h1>Placeholder Footer</h1>}
					onClose={onClose}
					body={<div>Placeholder body</div>}
				/>
			)}
		</div>
	);
}
