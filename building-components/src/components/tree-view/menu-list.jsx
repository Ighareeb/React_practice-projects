import MenuItem from './menu-item';

export default function MenuList({ list = [] }) {
	return (
		<ul className="menu-list-container">
			{list && list.length
				? list.map((listItem) => <MenuItem listItem={listItem} />) //pass each item in array as prop to create MenuItem for MenuList
				: null}
		</ul>
	);
}
