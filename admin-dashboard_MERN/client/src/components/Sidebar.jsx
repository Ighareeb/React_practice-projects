import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//mui components
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from '@mui/material';
//mui icons
import {
	SettingsOutlined,
	ChevronLeft,
	ChevronRightOutlined,
	HomeOutlined,
	ShoppingCartOutlined,
	Groups2Outlined,
	ReceiptLongOutlined,
	PublicOutlined,
	PointOfSaleOutlined,
	TodayOutlined,
	CalendarMonthOutlined,
	AdminPanelSettingsOutlined,
	TrendingUpOutlined,
	PieChartOutlined,
} from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import profileImage from 'assets/user.png';

const navItems = [
	{
		text: 'Dashboard',
		icon: <HomeOutlined />,
	},
	{
		text: 'Client Facing',
		icon: null,
	},
	{
		text: 'Products',
		icon: <ShoppingCartOutlined />,
	},
	{
		text: 'Customers',
		icon: <Groups2Outlined />,
	},
	{
		text: 'Transactions',
		icon: <ReceiptLongOutlined />,
	},
	{
		text: 'Geography',
		icon: <PublicOutlined />,
	},
	{
		text: 'Sales',
		icon: null,
	},
	{
		text: 'Overview',
		icon: <PointOfSaleOutlined />,
	},
	{
		text: 'Daily',
		icon: <TodayOutlined />,
	},
	{
		text: 'Monthly',
		icon: <CalendarMonthOutlined />,
	},
	{
		text: 'Breakdown',
		icon: <PieChartOutlined />,
	},
	{
		text: 'Management',
		icon: null,
	},
	{
		text: 'Admin',
		icon: <AdminPanelSettingsOutlined />,
	},
	{
		text: 'Performance',
		icon: <TrendingUpOutlined />,
	},
];
//args from layout.jsx
export default function SideBar({
	user,
	drawerWidth,
	//sideBar status set/toggled in Navbar.jsx onClick function
	isSidebarOpen,
	setIsSidebarOpen,
	isNonMobile,
}) {
	const { pathname } = useLocation();
	const [active, setActive] = useState(''); //determine which page is active/the user is on
	const navigate = useNavigate();
	const theme = useTheme(); //allows access to theme outside of the ThemeProvider in App.js

	useEffect(() => {
		setActive(pathname.substring(1)); //substring(1) removes the '/' from the pathname
	}, [pathname]);

	return (
		<Box component="nav">
			{isSidebarOpen && (
				<Drawer
					open={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
					variant="persistent"
					anchor="left"
					sx={{
						width: drawerWidth,
						//lookup css class with inspect in browser - & is ref to parent selector (<Drawer>)
						'& .MuiDrawer-paper': {
							color: theme.palette.secondary[200],
							backgroundColor: theme.palette.background.alt,
							boxSizing: 'border-box',
							borderWidth: isNonMobile ? 0 : '2px',
							width: drawerWidth,
						},
					}}
				>
					<Box width="100%">
						<Box m="1.5rem 2rem 2rem 3rem">
							<FlexBetween color={theme.palette.secondary.main}>
								<Box display="flex" alignItems="center" gap="0.5rem">
									<Typography variant="h4" fontWeight="bold">
										ECOMVISION
									</Typography>
								</Box>
								{/* when on mobile screen - button to toggle sidebar */}
								{!isNonMobile && (
									<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
										<ChevronLeft />
									</IconButton>
								)}
							</FlexBetween>
						</Box>
						<List>
							{navItems.map(({ text, icon }) => {
								if (!icon) {
									return (
										<Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
											{text}
										</Typography>
									);
								}
								//lowercaseText needed to match lowercase routes for navigate()
								const lcText = text.toLowerCase();

								return (
									<ListItem key={text} disablePadding>
										<ListItemButton
											onClick={() => {
												navigate(`/${lcText}`);
												//active state used to change color/highlight & backgroundColor on Navbar
												setActive(lcText);
											}}
											sx={{
												backgroundColor:
													active === lcText
														? theme.palette.secondary[300]
														: 'transparent',
												color:
													active === lcText
														? theme.palette.primary[600]
														: theme.palette.secondary[100],
											}}
										>
											<ListItemIcon
												sx={{
													ml: '2rem',
													color:
														active === lcText
															? theme.palette.primary[600]
															: theme.palette.secondary[200],
												}}
											>
												{icon}
											</ListItemIcon>
											<ListItemText primary={text} />
											{active === lcText && (
												<ChevronRightOutlined sx={{ ml: 'auto' }} />
											)}
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					</Box>

					<Box position="absolute" bottom="2rem">
						<Divider />
						<FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
							<Box
								component="img"
								alt="profile"
								src={profileImage}
								height="40px"
								width="40px"
								borderRadius="50%"
								sx={{ objectFit: 'cover' }}
							/>
							<Box textAlign="left">
								<Typography
									fontWeight="bold"
									fontSize="0.9rem"
									sx={{ color: theme.palette.secondary[100] }}
								>
									{user.name}
								</Typography>
								<Typography
									fontSize="0.8rem"
									sx={{ color: theme.palette.secondary[200] }}
								>
									{user.occupation}
								</Typography>
							</Box>
							<SettingsOutlined
								sx={{
									color: theme.palette.secondary[200],
									fontSize: '25px',
								}}
							/>
						</FlexBetween>
					</Box>
				</Drawer>
			)}
		</Box>
	);
}
