import { extendTheme } from '@chakra-ui/react';
//set theme to light mode by default - if user has eg. dark mode set it will use user's theme settings instead.
const theme = extendTheme({
	initialColorMode: 'light',
	useSystemColorMode: true,
});

export default theme;
