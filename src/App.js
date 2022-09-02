import "./categories.styles.scss"

const App = () => {
	const categories = [
		{
			id: 1,
			title: 'Hats',
			subtitle: '',
		},
		{
			id: 2,
			title: 'Jackets',
			subtitle: '',
		},
		{
			id: 3,
			title: 'Sneakers',
			subtitle: '',
		},
		{
			id: 4,
			title: 'Womens',
			subtitle: '',
		},
		{
			id: 5,
			title: 'Mens',
			subtitle: '',
		},
	];

	return (
		<div className="categories-container">
			{categories.map(({ title, id}) => {
				return (
					<div key={id} className="category-container">
						<div className="background-image" />
						<div className="category-body-container">
							<h2>{title}</h2>
							<p>Shop Now</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default App;
