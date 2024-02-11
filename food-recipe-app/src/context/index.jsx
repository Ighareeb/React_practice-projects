import { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
	const [searchParam, setSearchParam] = useState('');
	const [recipeList, setRecipeList] = useState([]);
	const [recipeDetails, setRecipeDetails] = useState(null);
	const [favoritesList, setFavoritesList] = useState([]);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const res = await fetch(
				`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`,
			);
			const data = await res.json();
			if (data?.data?.recipes) {
				setRecipeList(data?.data?.recipes);
				setLoading(false);
				setSearchParam('');
				navigate('/');
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
			setSearchParam('');
		}
	}

	function handleAddToFavorites(getCurrentItem) {
		console.log(getCurrentItem);
		let copyFavoritesList = [...favoritesList];
		const index = copyFavoritesList.findIndex(
			(item) => item.id === getCurrentItem.id,
		);

		if (index === -1) {
			copyFavoritesList.push(getCurrentItem);
		} else {
			copyFavoritesList.splice(index, 1);
		}
		setFavoritesList(copyFavoritesList);
	}

	console.log(favoritesList, 'favoritesList');
	return (
		<GlobalContext.Provider
			value={{
				searchParam,
				setSearchParam,
				recipeList,
				setRecipeList,
				recipeDetails,
				setRecipeDetails,
				favoritesList,
				setFavoritesList,
				loading,
				setLoading,
				handleSubmit,
				handleAddToFavorites,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
