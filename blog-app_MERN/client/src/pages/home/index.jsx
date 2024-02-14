import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context';
import axios from 'axios';
import classes from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function Home() {
	const { blogList, setBlogList, pending, setPending } =
		useContext(GlobalContext);
	const navigate = useNavigate();

	async function fetchListOfBlogs() {
		setPending(true);
		const res = await axios.get('http://localhost:5000/api/blogs');
		const result = await res.data; //body of response

		if (result && result.blogList && result.blogList.length) {
			setBlogList(result.blogList);
			setPending(false);
		} else {
			setPending(false);
			setBlogList([]);
		}
	}

	async function handleDeleteBlog(getCurrentId) {
		const res = await axios.delete(
			`http://localhost:5000/api/blogs/delete/${getCurrentId}`,
		);
		const result = await res.data;

		if (result?.message) {
			fetchListOfBlogs();
		}
	}

	function handleEdit(getCurrentBlogItem) {
		console.log(getCurrentBlogItem);
		navigate('/add-blog', { state: { getCurrentBlogItem } });
	}

	useEffect(() => {
		fetchListOfBlogs();
	}, []);

	return (
		<div className={classes.wrapper}>
			<h1>Blog List</h1>
			{pending ? (
				<h1>Loading Blogs...</h1>
			) : (
				<div className={classes.blogList}>
					{blogList && blogList.length ? (
						blogList.map((blogItem) => (
							<div key={blogItem.id}>
								<p>{blogItem.title}</p>
								<p>{blogItem.description}</p>
								<FaEdit onClick={() => handleEdit(blogItem)} size={30} />
								<FaTrash
									onClick={() => handleDeleteBlog(blogItem._id)}
									size={30}
								/>
							</div>
						))
					) : (
						<h3>No Blogs Added</h3>
					)}
				</div>
			)}
		</div>
	);
}
