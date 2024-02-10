import { useState, createContext, useEffect } from 'react';
import featureFlagsDataServiceCall from '../data';

export const FeatureFlagsContext = createContext(null);
//note: FeatureFlagGlobalState is imported into App.js for implementation of the feature, using FeatureFlags in the other index file as {children}
export default function FeatureFlagGlobalState({ children }) {
	const [enabledFlags, setEnabledFlags] = useState({}); //refers to data.js --> dummyApiResponse object
	const [loading, setLoading] = useState(false);

	async function fetchFeatureFlags() {
		try {
			setLoading(true);
			const res = await featureFlagsDataServiceCall();
			setEnabledFlags(res);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
			throw new Error(err);
		}
	}

	useEffect(() => {
		fetchFeatureFlags();
	}, []);

	return (
		<>
			<FeatureFlagsContext.Provider value={{ loading, enabledFlags }}>
				{children}
			</FeatureFlagsContext.Provider>
		</>
	);
}
