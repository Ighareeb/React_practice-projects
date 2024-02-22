export default function FormField({
	labelName,
	type,
	name,
	placeholder,
	value,
	handleChange,
	isSurpriseMe,
	handleSurpriseMe,
}) {
	return (
		<div>
			<div className="flex items-center gap-2 mb-2">
				<label
					htmlFor={name}
					className="block text-sm font-medium text-gray-900"
				>
					{labelName}
				</label>
				{isSurpriseMe && (
					<button
						onClick={handleSurpriseMe}
						className="bg-[#Ececf1] rounded-[5px] font-semibold text-sx py-1 px-2 text-black"
					>
						Surpirse me
					</button>
				)}
			</div>
			<input
				id={name}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				required
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
			/>
		</div>
	);
}
