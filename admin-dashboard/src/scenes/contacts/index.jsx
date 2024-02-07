import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; //https://mui.com/x/react-data-grid/
import { tokens } from '../../theme';
import { mockDataContacts } from '../../data/mockData';
import Header from '../../components/Header';

export default function Team() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const columns = [
		{ field: 'id', headerName: 'ID', flex: 0.5 },
		{ field: 'registrarId', headerName: 'Registrar ID' },
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
			field: 'address',
			headerName: 'Address',
			flex: 1,
		},
		{
			field: 'city',
			headerName: 'City',
			flex: 1,
		},
		{
			field: 'zipCode',
			headerName: 'ZipCode',
			flex: 1,
		},
	];
	return (
		// need to define Box and height explicitly for it to display in the UI properly (initially height is 100%)
		<Box m="20px">
			<Header
				title="Contacts"
				subtitle="List of Contacts for Future Reference"
			/>
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
						backgroundColor: colors.primary[400],
					},
					'& .MuiDataGrid-footerContainer': {
						borderTop: 'none',
						backgroundColor: colors.blueAccent[700],
					},
					//this is a GridToolbar component that will allow filtering
					'& .MuiDataGrid-toolbarContainer .MuiButton-text': {
						color: `${colors.grey[100]} !important`,
					},
				}}
			>
				<DataGrid
					rows={mockDataContacts}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
				/>
			</Box>
		</Box>
	);
}
