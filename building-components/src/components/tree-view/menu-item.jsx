import { useState } from 'react';
import MenuList from './menu-list';
import { FaMinus, FaPlus } from 'react-icons/fa';

export default function MenuItem({ listItem }) {
	const [displayCurrentChildren, setDisplayCurrentChildren] = useState({});

	//toggle sub-menu for specific menu item in list
	function handleToggleChildren(getCurrentLabel) {
		setDisplayCurrentChildren({
			...displayCurrentChildren,
			[getCurrentLabel]: !displayCurrentChildren[getCurrentLabel],
		});
	}

	console.log(displayCurrentChildren);
	return (
		<li>
			<div className="menu-item">
				<p>{listItem.label}</p>
				{listItem && listItem.children && listItem.children.length ? (
					<span onClick={() => handleToggleChildren(listItem.label)}>
						{displayCurrentChildren[listItem.label] ? (
							<FaMinus color="#fff" size={25} />
						) : (
							<FaPlus color="#fff" size={25} />
						)}
					</span>
				) : null}
			</div>
			{listItem &&
			listItem.children &&
			listItem.children.length > 0 &&
			displayCurrentChildren[listItem.label] ? (
				<MenuList list={listItem.children} />
			) : null}
		</li>
	);
}
