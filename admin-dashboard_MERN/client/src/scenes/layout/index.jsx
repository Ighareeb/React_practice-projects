import { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'components/NavBar';
import SideBar from 'components/Sidebar';

export default function Layout() {
	//returns boolean depending on whether min-width is greater than 600px (desktop === true - mobile === false)
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
			<Box>
				<SideBar
					isNonMobile={isNonMobile}
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
					drawerWidth="250px"
				/>
				<Navbar
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
				/>
				<Outlet />
			</Box>
		</Box>
	);
}
