import './checkout.styles.scss';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import CartItem from '../../components/cart-item/cart-item.component';

const Checkout = () => {
	const { cartItems, addItemToCart, removeItemToCart } =
		useContext(CartContext);

	console.dir(cartItems);

	return (
		<div>
			{cartItems.map((item) => {
				const { id, name, price, quantity } = item;

				return (
					<div key={id}>
						<h2>{name}</h2>
						<span>Quantity: {quantity}</span>
						<span onClick={() => removeItemToCart(item)}>
							decrement
						</span>
						<br />
						<span onClick={() => addItemToCart(item)}>
							increment
						</span>
					</div>
				);
			})}
		</div>
	);
};

export default Checkout;
