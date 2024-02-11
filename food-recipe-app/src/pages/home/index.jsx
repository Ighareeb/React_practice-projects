import { useContext } from 'react';
import { GlobalContext } from '../../context';
import RecipeItem from '../../components/RecipeItem';

export default function Home() {
	const { recipeList, loading } = useContext(GlobalContext);

	if (loading) return <div>Loading Home Page with your recipes</div>;
	return (
		<div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
			{recipeList && recipeList.length > 0 ? (
				recipeList.map((item) => <RecipeItem item={item} />)
			) : (
				<div>
					<p className="lg:text-4xl text-xl text-center text-black font-extrabold">
						No recipes to show. Please search for a recipe
					</p>
				</div>
			)}
		</div>
	);
}
