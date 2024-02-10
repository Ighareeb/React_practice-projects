import Tabs from './tabs';
import './tabs.css';

function PlaceholderComponent() {
	return <h1>Placeholder</h1>;
}

export default function TabTestPage() {
	const tabs = [
		{
			label: 'Tab 1',
			content: <div>Content for Tab 1</div>,
		},
		{
			label: 'Tab 2',
			content: <div>Content for Tab 2</div>,
		},
		{
			label: 'Tab 3',
			content: <div>Content for Tab 3</div>,
		},
		{
			label: 'Tab 4',
			content: <div>Content for Tab 4</div>,
		},
		{
			label: 'Tab 5',
			content: <PlaceholderComponent />,
		},
	];

	function handleChange(currentTabIndex) {
		console.log(currentTabIndex);
	}
	return <Tabs tabsContent={tabs} onChange={handleChange} />;
}
