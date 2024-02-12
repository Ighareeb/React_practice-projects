import { useState, createContext } from 'react';

export const GlobalContext = createContext(null);
export default function GlobalState({ children }) {
	const [blogList, setBlogList] = useState([]);
	const [pending, setPending] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		description: '',
	});

	return (
		<GlobalContext.Provider
			value={{
				blogList,
				setBlogList,
				pending,
				setPending,
				isEdit,
				setIsEdit,
				formData,
				setFormData,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
