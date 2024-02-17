//set up/reset baseline defaults to normalize across browsers + provider wraps components with theme
import { CssBaseline, ThemeProvider } from '@mui/material';

// allows access of data from redux store within react components (src/state/index.js)
import { useSelector } from 'react-redux';

// function to create custom theme (define/use light-dark theme)
import { createTheme } from '@mui/material/styles';

//custom theme module light-dark mode
import { themeSettings } from 'theme';

import { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from 'scenes/layout';
import Dashboard from 'scenes/dashboard';
import Products from 'scenes/products';
import Customers from 'scenes/customers';
import Transactions from 'scenes/transactions';
import Geography from 'scenes/geography';
import Overview from 'scenes/overview';
import Daily from 'scenes/daily';
import Monthly from 'scenes/monthly';
import Breakdown from 'scenes/breakdown';
import Admin from 'scenes/admin';
import Performance from 'scenes/performance';
function App() {
	const mode = useSelector((state) => state.global.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); //[mode] is dependency array for useMemo
	return (
		<div className="app">
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						{/* Layout component (with Navbar+Sidebar) is parent/nests routes --> base layout for all components */}
						{/* needs outlet to show {children} components */}
						<Route element={<Layout />}>
							{/* replace current entry in history stack instead of adding a new one --> doesnt remain in user browser history so can't use back button */}
							<Route path="/" element={<Navigate to="/dashboard" replace />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/products" element={<Products />} />
							<Route path="/customers" element={<Customers />} />
							<Route path="/transactions" element={<Transactions />} />
							<Route path="/geography" element={<Geography />} />
							<Route path="/overview" element={<Overview />} />
							<Route path="/daily" element={<Daily />} />
							<Route path="/monthly" element={<Monthly />} />
							<Route path="/breakdown" element={<Breakdown />} />
							<Route path="/admin" element={<Admin />} />
							<Route path="/performance" element={<Performance />} />
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
