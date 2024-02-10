import { useState, useEffect } from 'react';
import User from './user';
import './styles.css';

export default function GithubProfileFinder() {
	const [userName, setUserName] = useState('ighareeb');
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);

	async function fetchGitHubUserData() {
		setLoading(true);
		const res = await fetch(`https://api.github.com/users/${userName}`);

		const user = await res.json();
		if (user) {
			setUserData(user);
			setLoading(false);
			setUserName('');
		}
	}

	function handleSubmit() {
		fetchGitHubUserData();
	}

	useEffect(() => {
		fetchGitHubUserData();
	}, []);

	//if loading message
	if (loading) return <h1>Loading Github User...</h1>;
	return (
		<div className="github-profile-container">
			<div className="input-wrapper">
				<input
					type="text"
					name="serach-by-username"
					placeholder="Search Github username"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<button onClick={handleSubmit}>Search for Github User</button>
			</div>
			{userData !== null ? <User user={userData} /> : null}
		</div>
	);
}
