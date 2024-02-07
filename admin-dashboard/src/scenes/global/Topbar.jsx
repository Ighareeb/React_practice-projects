import { useContext } from 'react';
import { Box, IconButton, useTheme, InputBase } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonModeOutlineIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';

export default function Topbar() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext); //toggle states for colorMode

	return (
		<Box display="flex" justifyContent="space-between" p={2}>
			{/* SEARCH BAR */}
			<Box
				display="flex"
				backgroundColor={colors.primary[400]}
				borderRadius="3px"
			>
				<InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
				<IconButton type="button" sx={{ p: 1 }}>
					<SearchIcon />
				</IconButton>
			</Box>
			{/* ICONS bar on right side */}
			<Box display="flex">
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === 'dark' ? (
						<DarkModeOutlinedIcon />
					) : (
						<LightModeOutlinedIcon />
					)}
				</IconButton>
				<IconButton>
					<NotificationsOutlinedIcon />
				</IconButton>
				<IconButton>
					<SettingsOutlinedIcon />
				</IconButton>
				<IconButton>
					<PersonModeOutlineIcon />
				</IconButton>
			</Box>
		</Box>
	);
}

//<Box> componenet is like a div from materialUI that allows you to add css props directly into the component
//note: other materialUI components need sx prop to add css eg. sx={{ display: 'flex' }}
