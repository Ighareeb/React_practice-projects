//feature flag/toggle === enable/disable features in an app even after it has been deplayed.
//ADVANTAGES: Production testing - merge code in main code toggled off until ready to use. Roll out features gradually. Roll out different versions of features to test user response/performance. Kill-switch - quickly disable without needing to roll back entire deployment.
//Typically implemented using confif file or service.
//note: FeatureFlagGlobalState is imported from the context index file into App.js for implementation of the feature, using FeatureFlags as {children}
import React, { useContext } from 'react';
import { FeatureFlagsContext } from './context';
import Accordian from '../accordian';
import LightDarkMode from '../light-dark-mode';
import RandomColor from '../random-color';
import TicTacToe from '../tic-tact-toe';
import TreeView from '../tree-view';
import menus from '../tree-view/data';
import TabTestPage from '../custom-tabs/tab-test-page';

export default function FeatureFlags() {
	const { loading, enabledFlags } = useContext(FeatureFlagsContext);

	const componentsToRender = [
		{
			key: 'ShowAccordian',
			component: <Accordian />,
		},
		{
			key: 'showLightAndDarkMode',
			component: <LightDarkMode />,
		},
		{
			key: 'showRandomColorGenerator',
			component: <RandomColor />,
		},
		{
			key: 'showTicTacToeBoard',
			component: <TicTacToe />,
		},
		{
			key: 'showTreeView',
			component: <TreeView menus={menus} />,
		},
		{
			key: 'showTabs',
			component: <TabTestPage />,
		},
	];

	function checkEnabledFlags(getCurrentFeatureName) {
		return enabledFlags[getCurrentFeatureName];
	}

	//if loading message
	if (loading) {
		return <h1>Loading Features...</h1>;
	}

	return (
		<>
			<div>
				<h1>Feature Flags</h1>
				{componentsToRender.map((component) =>
					checkEnabledFlags(component.key) ? (
						<React.Fragment key={component.key}>
							{component.component}
						</React.Fragment>
					) : null,
				)}
			</div>
		</>
	);
}
