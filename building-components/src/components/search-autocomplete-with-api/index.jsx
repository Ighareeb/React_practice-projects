import { useState, useEffect } from 'react';
import Suggestions from './suggestions';

export default function SearchAutoComplete() {
	const [users, setUsers] = useState([]);
	const [searchParam, setSearchParam] = useState('');
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [showDropDown, setShowDropDown] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	function handleChange(e) {
		const query = e.target.value.toLowerCase();
		setSearchParam(query);
		if (query.length > 1) {
			const filteredData =
				users && users.length
					? //index where query starts in user must be >= 0. if query not found in user then user is not included in filteredData
					  users.filter((user) => user.toLowerCase().indexOf(query) > -1)
					: [];
			setFilteredUsers(filteredData);
		} else {
			setShowDropDown(true);
		}
	}

	function handleClick(e) {
		setShowDropDown(false);
		setSearchParam(e.target.innerText);
		setFilteredUsers([]);
	}

	async function fetchListOfUsers() {
		try {
			setLoading(true);
			const res = await fetch('https://dummyjson.com/users');
			const data = await res.json();
			//conditional set based on key:values in the JSON data on the API
			if (data && data.users && data.users.length) {
				setUsers(data.users.map((user) => user.firstName));
				setLoading(false);
				setError(null);
			}
		} catch (err) {
			setLoading(false);
			console.log(err);
			setError(null);
		}
	}

	useEffect(() => {
		fetchListOfUsers();
	}, []);

	console.log(users, filteredUsers);

	//if loading message

	//if error message
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	return (
		<>
			<div className="search-autocomplete-container">
				{loading ? (
					<h1>Loading User Data</h1>
				) : (
					<input
						value={searchParam}
						name="search-users"
						placeholder="Filter Users"
						onChange={handleChange}
					/>
				)}
				{showDropDown && (
					<Suggestions data={filteredUsers} handleClick={handleClick} />
				)}
			</div>
		</>
	);
}
