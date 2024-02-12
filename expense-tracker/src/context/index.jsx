import { useState, createContext } from 'react';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
	const [value, setValue] = useState('expense');
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [totalIncome, setTotalIncome] = useState(0);
	const [allTransactions, setAllTransactions] = useState([]);
	const [formData, setFormData] = useState({
		type: 'income',
		amount: 0,
		description: '',
	});

	//function used in add-transaction/index.jsx form
	function handleFormSubmit(currentFormData) {
		if (!currentFormData.description || !currentFormData.amount) {
			return; //basic form validation to ensure fields are not empty when submitted
		}
		//new transaction added to allTransactions array using form data
		setAllTransactions([
			...allTransactions,
			{ ...currentFormData, id: Date.now() },
		]);
	}

	console.log(allTransactions);

	return (
		<GlobalContext.Provider
			value={{
				value,
				setValue,
				totalExpenses,
				setTotalExpenses,
				totalIncome,
				setTotalIncome,
				allTransactions,
				setAllTransactions,
				formData,
				setFormData,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
