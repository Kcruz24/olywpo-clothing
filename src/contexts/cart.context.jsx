import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	let newCartItems = [];

	if (existingCartItem) {
		newCartItems = cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	} else {
		newCartItems = [...cartItems, { ...productToAdd, quantity: 1 }];
	}

	return newCartItems;
};

const removeCartItem = (cartItems, productToRemove) => {
	const existingCartItem = cartItems.find(
		(item) => item.id === productToRemove.id
	);

	let newCartItems = [...cartItems];

	if (existingCartItem.quantity === 1) {
		newCartItems = cartItems.filter(
			(cartItem) => cartItem.id !== productToRemove.id
		);
	} else {
		newCartItems = cartItems.map((item) =>
			item.id === productToRemove.id
				? { ...item, quantity: item.quantity - 1 }
				: item
		);
	}

	return newCartItems;
};

const clearCartItem = (cartItems, cartItemToClear) => {
	const filterCartItems = cartItems.filter(
		(cartItem) => cartItem.id !== cartItemToClear.id
	);

	return filterCartItems;
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
});

export const CART_ACTION_TYPES = {
	TOGGLE_CART: 'TOGGLE_CART',
	ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
	REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
	CLEAR_ITEM_FROM_CART: 'CLEAR_ITEM_FROM_CART',
	SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};

		case CART_ACTION_TYPES.TOGGLE_CART:
			return {
				...state,
				isCartOpen: payload,
			};

		default:
			throw new Error(`Unhandled type ${type} in userReducer`);
	}
};

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
	const { isCartOpen, cartItems, cartCount, cartTotal } = state;

	console.log(isCartOpen);
	console.log(cartItems);

	const updateCartItemsReducer = (newCartItems) => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);

		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);

		const setCartItemsAction = CART_ACTION_TYPES.SET_CART_ITEMS;

		const payloadBody = {
			cartItems: newCartItems,
			cartTotal: newCartTotal,
			cartCount: newCartCount,
		};

		const newAction = createAction(setCartItemsAction, payloadBody);

		dispatch(newAction);
	};

	const setIsCartOpen = (bool) => {
		const toggleCartAction = CART_ACTION_TYPES.TOGGLE_CART;
		const newAction = createAction(toggleCartAction, bool);

		dispatch(newAction);
	};

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
	};

	const removeItemFromCart = (cartItemToRemove) => {
		const newCartItems = removeCartItem(cartItems, cartItemToRemove);
		updateCartItemsReducer(newCartItems);
	};

	const clearItemFromCart = (cartItemToClear) => {
		const newCartItems = clearCartItem(cartItems, cartItemToClear);
		updateCartItemsReducer(newCartItems);
	};

	const value = {
		setIsCartOpen,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		isCartOpen,
		cartItems,
		cartCount,
		cartTotal,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};
