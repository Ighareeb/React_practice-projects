import { useState } from 'react';

// tabsContent === array(has index) of objects representing tabs(props == label & content) + onChange func called when active tab changes
export default function Tabs({ tabsContent, onChange }) {
	const [currentTabIndex, setCurrentTabIndex] = useState(0); //initial state --> first tab active by default

	function handleOnClick(getCurrentIndex) {
		setCurrentTabIndex(getCurrentIndex);
		onChange(getCurrentIndex);
	}

	return (
		<div className="wrapper">
			<div className="heading">
				{tabsContent.map((tab, index) => (
					<div
						className={`tab-item ${currentTabIndex === index ? 'active' : ''}`}
						onClick={() => handleOnClick(index)}
						key={tab.label}
					>
						<span className="label">{tab.label}</span>
					</div>
				))}
			</div>
			{/* display current tab content */}
			<div className="content" style={{ color: 'red' }}>
				{tabsContent[currentTabIndex] && tabsContent[currentTabIndex].content}
			</div>
		</div>
	);
}
