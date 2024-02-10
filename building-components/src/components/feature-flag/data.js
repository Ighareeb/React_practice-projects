const dummyApiResponse = {
	showLightAndDarkMode: true,
	showTicTacToeBoard: true,
	showRandomColorGenerator: true,
	ShowAccordian: true,
	showTreeView: true,
	showTabs: true,
};

export default function featureFlagsDataServiceCall() {
	return new Promise((resolve, reject) => {
		if (dummyApiResponse) {
			setTimeout(resolve(dummyApiResponse), 500);
		} else reject('Error fetching feature flags');
	});
}
