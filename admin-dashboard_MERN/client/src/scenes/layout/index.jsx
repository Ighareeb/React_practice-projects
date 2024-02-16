import { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'components/Navbar';
import SideBar from 'components/Sidebar';
import { useGetUserQuery } from '../../state/api.js';

export default function Layout() {
	//returns boolean depending on whether min-width is greater than 600px (desktop === true - mobile === false)
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const userId = useSelector((state) => state.global.userId);
	//make API call
	const { data } = useGetUserQuery(userId);
	console.log('~ Layout ~ data:', data);

	return (
		<Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
			<SideBar
				user={data || {}}
				isNonMobile={isNonMobile}
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
				drawerWidth="250px"
			/>
			{/* flexGrow allow Navbar to take up and fill all the remaining width - Sidebar 250px */}
			<Box flexGrow={1}>
				<Navbar
					user={data || {}}
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
				/>
				<Outlet />
			</Box>
		</Box>
	);
}
