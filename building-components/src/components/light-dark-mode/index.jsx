import useLocalStorage from './useLocalStorage'; //custom hook
import './theme.css';

export default function LightDarkMode() {
	const [theme, setTheme] = useLocalStorage('theme', 'dark');

	function handleToggleTheme() {
		setTheme(theme === 'light' ? 'dark' : 'light');
	}

	console.log(theme);
	return (
		<div className="light-dark-mode" data-theme={theme}>
			<div className="container">
				<p>Press the button to toggle between light and dark mode</p>
				<button onClick={handleToggleTheme}>Change Theme</button>
			</div>
		</div>
	);
}
