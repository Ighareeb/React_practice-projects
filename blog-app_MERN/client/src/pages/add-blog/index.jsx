import { useContext, useEffect } from 'react';
import classes from './styles.module.css'; //(css is imported as the classes object)
import { GlobalContext } from '../../context';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AddNewBlog() {
	const { formData, setFormData, isEdit, setIsEdit } =
		useContext(GlobalContext);
	const navigate = useNavigate();
	const location = useLocation();

	//if blog exits (isEdit) --> update else create new blog post
	async function handleSaveBlogToDatabase() {
		const res = isEdit
			? await axios.put(
					`http://localhost:5000/api/blogs/update/${location.state.getCurrentBlogItem._id}`,
					{
						title: formData.title,
						description: formData.description,
					},
			  )
			: await axios.post('http://localhost:5000/api/blogs/add', {
					title: formData.title,
					description: formData.description,
			  });

		const result = await res.data;
		if (result) {
			setIsEdit(false);
			setFormData({
				title: '',
				description: '',
			});
			navigate('/');
		}
	}

	useEffect(() => {
		console.log(location);
		if (location.state) {
			const { getCurrentBlogItem } = location.state;
			setIsEdit(true);
			setFormData({
				title: getCurrentBlogItem.title,
				description: getCurrentBlogItem.description,
			});
		}
	}, [location]);

	return (
		<div className={classes.wrapper}>
			<h1>{isEdit ? 'Edit a Blog' : 'Add a Blog'}</h1>
			<div className={classes.formWrapper}>
				<input
					type="text"
					name="title"
					placeholder="Enter Blog Title"
					id="title"
					value={formData.title}
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
				/>
				<textarea
					name="description"
					id="description"
					placeholder="Enter Blog Description"
					value={formData.description}
					onChange={(e) =>
						setFormData({ ...formData, description: e.target.value })
					}
				></textarea>
				<button onClick={handleSaveBlogToDatabase}>
					{isEdit ? 'Edit Blog' : 'Add Blog'}
				</button>
			</div>
		</div>
	);
}

//The useLocation hook returns the location object from the current URL, which includes the following:
// pathname: This is the path of the URL.
// search: This is the query string (?) included in the URL.
// hash: This is the result of the hash fragment (#) from the URL.
// location state - can be used to pass state between components
//updates each time URL changes - useful to trigger function based on URL + can extract query params from useLocation object
