import {useState, useEffect} from 'react';
import {CssBaseline} from '@material-ui/core';
import {commerce} from './components/lib/commerce';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {Navbar, Products, Cart, Checkout} from './components';
import {ProductCollection} from '@chec/commerce.js/features/products';
import {Product} from '@chec/commerce.js/types/product';
import {Cart as ICart} from '@chec/commerce.js/types/cart';
import {AddUpdateResponse, EmptyResponse, RemoveResponse} from '@chec/commerce.js/features/cart';
import {Order} from './components/Checkout/Payment/Payment';
import {CheckoutCaptureResponse} from '@chec/commerce.js/types/checkout-capture-response';

const App = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [cart, setCart] = useState<ICart | undefined>(undefined);
	const [checkoutCapture, setCheckoutCapture] = useState<CheckoutCaptureResponse | undefined>(undefined);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const fetchProducts = async (): Promise<void> => {
		const {data}: ProductCollection = await commerce.products.list();

		setProducts(data);
	};

	const fetchCart = async (): Promise<void> => {
		setCart(await commerce.cart.retrieve());
	};

	const setStateAfterUpdate = async (cartResponseFactory: () => Promise<AddUpdateResponse | RemoveResponse | EmptyResponse>) => {
		const {cart}: AddUpdateResponse | RemoveResponse | EmptyResponse = await cartResponseFactory();
		setCart(cart);
	};

	const handleAddToCart = async (productId: string, quantity: number) => {
		setStateAfterUpdate(() => commerce.cart.add(productId, quantity));
	};

	const handleUpdateCartQty = async (productId: string, quantity: number) => {
		setStateAfterUpdate(() => commerce.cart.update(productId, {quantity}));
	};

	const handleRemoveFromCart = async (productId: string) => {
		setStateAfterUpdate(() => commerce.cart.remove(productId));
	};

	const handleEmptyCart = async () => {
		setStateAfterUpdate(() => commerce.cart.empty());
	};

	const handleCaptureCheckout = (tokenId: string, newOrder: Order) => {
		commerce.checkout.capture(tokenId, newOrder)
			.then(order => setCheckoutCapture(order))
			.then(() => refreshCart())
			.catch(err => setErrorMessage(err.message));
	};

	const refreshCart = () => {
		commerce.cart.refresh().then(newCart => setCart(newCart));
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	return (
		<Router>
			<div style={{display: 'flex'}}>
				<CssBaseline />
				<Navbar totalItems={cart?.total_items ? cart.total_items : 0} />
				<Routes>
					<Route path="/" element={<Products products={products} onAddToCart={handleAddToCart} />} />
					<Route path="/cart" element={<Cart cart={cart} onUpdateQty={handleUpdateCartQty} onRemove={handleRemoveFromCart} onEmpty={handleEmptyCart} />} />
					<Route path="/checkout" element={<Checkout setErrorMessage={setErrorMessage} cart={cart} checkoutCapture={checkoutCapture} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
