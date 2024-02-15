import { useState } from 'react';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import profileImage from 'assets/user.png';
//mui icons
import {
	LightModeOutlined,
	DarkModeOutlined,
	Menu as MenuIcon,
	Search,
	SettingsOutlined,
	ArrowDropDownOutlined,
} from '@mui/icons-material';
//mui components
import {
	AppBar,
	Box,
	Button,
	IconButton,
	InputBase,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
	useTheme,
} from '@mui/material';

//----------------------------------------------------
//args from layout.jsx
export default function Navbar({ user, isSidebarOpen, setIsSidebarOpen }) {
	const dispatch = useDispatch();
	const theme = useTheme();

	const [anchorEl, setAnchorEl] = useState(null); //for Menu element toggle with Button
	const isOpen = Boolean(anchorEl);

	const handleClick = (e) => setAnchorEl(e.currentTarget);
	const handleClose = () => setAnchorEl(null);

	return (
		// Appbar is the 'header' bar at the top of the page above dashboard, setting, search, burger menu, toggle light/darl
		<AppBar sx={{ position: 'static', background: 'none', boxShadow: 'none' }}>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				{/* LEFT side */}
				<FlexBetween>
					{/* burger menu - to open/close sidebar */}
					<IconButton
						onClick={() => {
							//toggle
							setIsSidebarOpen(!isSidebarOpen);
						}}
					>
						<MenuIcon />
					</IconButton>
					{/* search input parent wrapper */}
					<FlexBetween
						backgroundColor={theme.palette.background.alt}
						borderRadius="9px"
						// putting gap on parent component === adds gap between children component so you don't need to add margins on children
						gap="3rem"
						p="0.1rem 1.5rem"
					>
						{/* Search input box */}
						<InputBase placeholder="Search...">
							<IconButton>
								<Search />
							</IconButton>
						</InputBase>
					</FlexBetween>
				</FlexBetween>

				{/* RIGHT side */}
				<FlexBetween gap="1.5rem">
					{/* toggle light/dark icon */}
					<IconButton onClick={() => dispatch(setMode())}>
						{theme.palette.mode === 'dark ' ? (
							<DarkModeOutlined sx={{ fontSize: '25px' }} />
						) : (
							<LightModeOutlined sx={{ fontSize: '25px' }} />
						)}
					</IconButton>
					{/* settings icon menu */}
					<IconButton>
						<SettingsOutlined sx={{ fontSize: '25px' }} />
					</IconButton>
					{/* profile image + profile details + dropdown menu for logging out*/}
					<FlexBetween>
						<Button
							onClick={handleClick}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								textTransform: 'none',
								gap: '1rem',
							}}
						>
							{/* profile image icon */}
							<Box
								component="img"
								alt="profile"
								src={profileImage}
								height="32px"
								width="32"
								borderRadius="50%"
								sx={{ objectFit: 'cover' }}
							/>
							{/* profile details  */}
							<Box textAlign="left">
								<Typography
									fontWeight="bold"
									fontSize="0.85rem"
									sx={{ color: theme.palette.secondary[100] }}
								>
									{user.name}
								</Typography>
								<Typography
									fontSize="0.75rem"
									sx={{ color: theme.palette.secondary[200] }}
								>
									{user.occupation}
								</Typography>
							</Box>
							<ArrowDropDownOutlined
								sx={{ color: theme.palette.secondary[300], fontSize: '25px' }}
							/>
						</Button>
						{/* dropdown menu for logging out*/}
						<Menu
							anchorEl={anchorEl}
							open={isOpen}
							onClose={handleClose}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						>
							<MenuItem onClick={handleClose}>Log Out</MenuItem>
						</Menu>
					</FlexBetween>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
}
