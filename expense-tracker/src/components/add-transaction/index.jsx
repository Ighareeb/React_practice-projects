import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Radio,
	RadioGroup,
} from '@chakra-ui/react';

export default function TransactionForm({ onClose, isOpen }) {
	const { formData, setFormData, value, setValue, handleFormSubmit } =
		useContext(GlobalContext);

	function handleFormChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		handleFormSubmit(formData); //from context/index.jsx
		onClose(); //moved the onClose from the Add button to here to allow form submission process before Modal gets closed
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add New Transaction</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl>
							<FormLabel>Enter Description</FormLabel>
							<Input
								placeholder="Enter Transaction Description"
								name="description"
								type="text"
								onChange={handleFormChange}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Enter Amount</FormLabel>
							<Input
								placeholder="Enter Transaction Amount"
								name="amount"
								type="number"
								onChange={handleFormChange}
							/>
						</FormControl>
						<RadioGroup mt="5" value={value} onChange={setValue}>
							<Radio
								checked={formData.type === 'income'}
								value="income"
								onChange={handleFormChange}
								name="type"
								colorScheme="blue"
							>
								Income
							</Radio>
							<Radio
								checked={formData.type === 'expense'}
								value="expense"
								onChange={handleFormChange}
								name="type"
								colorScheme="red"
							>
								Expense
							</Radio>
						</RadioGroup>
					</ModalBody>
					<ModalFooter>
						<Button mr={'4'} onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Add</Button>
					</ModalFooter>
				</ModalContent>
			</form>
		</Modal>
	);
}

//A modal is a dialog that focuses the user's attention exclusively on an information via a window that is overlaid on primary content.
//Chakra exports 7 components to help you create any modal dialog:
// Modal: The wrapper that provides context for its children.
// ModalOverlay: The dimmed overlay behind the modal dialog.
// ModalContent: The container for the modal dialog's content.
// ModalHeader: The header that labels the modal dialog.
// ModalFooter: The footer that houses the modal actions.
// ModalBody: The wrapper that houses the modal's main content.
// ModalCloseButton: The button that closes the modal.
