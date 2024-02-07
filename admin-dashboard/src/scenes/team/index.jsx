import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'; //https://mui.com/x/react-data-grid/
import { tokens } from '../../theme';
import { mockDataTeam } from '../../data/mockData';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Header from '../../components/Header';

export default function Team() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const columns = [
		{ field: 'id', headerName: 'ID' },
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			cellClassName: 'name-column--cell',
		},
		// note cellClassName is the CSS class you can use to style the cell in CSS file
		{
			field: 'age',
			headerName: 'Age',
			type: 'number',
			headerAlign: 'left',
			align: 'left',
		},
		{
			field: 'phone',
			headerName: 'Phone Number',
			flex: 1,
		},
		{
			field: 'email',
			headerName: 'Email',
			flex: 1,
		},
		{
			field: 'access',
			headerName: 'Access',
			flex: 1,
			//renderCell prop allows return of custom component for each cell in the column depending on function logic (in this case 'access')
			renderCell: ({ row: { access } }) => {
				return (
					<Box
						width="60%"
						m="0 auto"
						p="5px"
						display="flex"
						justifyContent="center"
						borderRadius="4px"
						// style background color based on access
						backgroundColor={
							access === 'admin'
								? colors.greenAccent[600]
								: colors.greenAccent[700]
						}
					>
						{/* use different icons based on access */}
						{access === 'admin' && <AdminPanelSettingsOutlinedIcon />}
						{access === 'manager' && <SecurityOutlinedIcon />}
						{access === 'user' && <LockOpenOutlinedIcon />}
						<Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
							{access}
						</Typography>
					</Box>
				);
			},
		},
	];
	return (
		// need to define Box and height explicitly for it to display in the UI properly (initially height is 100%)
		<Box m="20px">
			<Header title="TEAM" subtitle="Managing the Team Members" />
			<Box
				m="40px 0 0 0"
				height="75vh"
				//CSS-in-JS styles for a Material-UI DataGrid component
				//you can find these classNames for dataGrid by inspecting the DOM in browser
				sx={{
					'& .MuiDataGrid-root': { border: 'none' },
					'& .MuiDataGrid-cell': { borderBottom: 'none' },
					'& .name-column--cell': { color: colors.greenAccent[300] },
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: colors.blueAccent[700],
						borderBottom: 'none',
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: ' colors.primary[400]',
					},
					'& .MuiDataGrid-footerContainer': {
						borderTop: 'none',
						backgroundColor: ' colors.blueAccent[700]',
					},
				}}
			>
				<DataGrid rows={mockDataTeam} columns={columns} />
			</Box>
		</Box>
	);
}
