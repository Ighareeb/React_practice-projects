import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AddNewBlog from './pages/add-blog';
import Header from './components/header'; //navbar component

function App() {
	return (
		<>
			<div>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/add-blog" element={<AddNewBlog />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
