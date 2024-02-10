//test custom useFetch hook
import useFetch from './index';

export default function UseFetchHookTest() {
	const { data, error, pending } = useFetch(
		'https://jsonplaceholder.typicode.com/posts',
		{},
	);

	return (
		<>
			<div>
				<h1>Use Custom Fetch Hook</h1>
				{pending ? <h3>Pending fetch request - please wait...</h3> : null}
				{error ? <h3>{error}</h3> : null}
				{data
					? data.map((post) => (
							<>
								<h2 key={post.id}>{post.title}</h2>
								<p>{post.body}</p>
							</>
					  ))
					: null}
			</div>
		</>
	);
}
