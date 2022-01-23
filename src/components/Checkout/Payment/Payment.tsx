import {IShippingData} from '../Checkout';
import {Typography, Button, Divider} from '@material-ui/core';
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe, PaymentMethod, Stripe, StripeElements} from '@stripe/stripe-js';
import {CheckoutToken} from '@chec/commerce.js/types/checkout-token';
import {Review} from '..';
import {FormEvent} from 'react';

export interface OrderPaymentStripe {
	payment_method_id: string,
}

export interface OrderPayment {
	gateway: 'stripe',
	stripe: OrderPaymentStripe
}

export interface OrderFulfillment {
	shipping_method: string,
}

export interface OrderShipping {
	name: 'Primary',
	street: string,
	town_city: string,
	county_state: string,
	postal_zip_code: string,
	country: string,
}

export interface OrderCustomer {
	firstname: string,
	lastname: string,
	email: string,
}

export interface Order {
	line_items: any[],
	customer: OrderCustomer,
	shipping: OrderShipping,
	fulfillment: OrderFulfillment,
	payment: OrderPayment
}

const Payment = ({shippingData, token, back, next, onCaptureCheckout}: PaymentProps) => {
	const stripePromise: Promise<Stripe | null> = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

	const createOrder = (method: PaymentMethod, sData: IShippingData, checkoutToken: CheckoutToken): Order => ({
		line_items: checkoutToken.live.line_items,
		customer: {
			firstname: sData.firstName,
			lastname: sData.lastName,
			email: sData.email,
		},
		shipping: {
			name: 'Primary',
			street: sData.address1,
			town_city: sData.city,
			county_state: sData.shippingSubdivision,
			postal_zip_code: sData.zip,
			country: sData.shippingCountry,
		},
		fulfillment: {
			shipping_method: sData.shippingOption,
		},
		payment: {
			gateway: 'stripe',
			stripe: {
				payment_method_id: method.id,
			},
		},
	});

	const handleSubmit = async (event: FormEvent, elements: StripeElements | null, stripe: Stripe | null) => {
		event.preventDefault();

		if (stripe && elements && token && shippingData) {
			const cardElement = elements.getElement(CardElement);
			if (cardElement) {
				const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement});

				if (!error && paymentMethod) {
					onCaptureCheckout(token.id, createOrder(paymentMethod, shippingData, token));
					next();
				}
			}
		}
	};

	return (
		<>
			{token && <Review token={token} />}
			<Divider />
			<Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Payment methods</Typography>
			<Elements stripe={stripePromise}>
				<ElementsConsumer>
					{({elements, stripe}) => (
						<form onSubmit={e => handleSubmit(e, elements, stripe)}>
							<CardElement />
							<br />
							<br />
							<div style={{display: 'flex', justifyContent: 'space-between'}}>
								<Button variant="outlined" onClick={back}>Back</Button>
								{token && <Button type="submit" variant="contained" disabled={!stripe} color="primary">
									Pay {token.live.subtotal.formatted_with_symbol}
								</Button>}
							</div>
						</form>
					)}
				</ElementsConsumer>
			</Elements>
		</>
	);
};

type PaymentProps = {
    shippingData?: IShippingData,
    token?: CheckoutToken,
	back: () => void,
	next: () => void,
	onCaptureCheckout: (tokenId: string, newOrder: Order) => void,
}

export default Payment;
