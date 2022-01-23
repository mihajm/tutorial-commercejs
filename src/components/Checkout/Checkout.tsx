import {useState, useEffect} from 'react';

import {commerce} from '../lib/commerce';

import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, CssBaseline, Button} from '@material-ui/core';
import useStyles from './styles';
import {CheckoutForm, Confirmation} from '.';
import {Cart} from '@chec/commerce.js/types/cart';
import {CheckoutToken} from '@chec/commerce.js/types/checkout-token';
import {CheckoutCaptureResponse} from '@chec/commerce.js/types/checkout-capture-response';
import {Order} from './Payment/Payment';
import {Link, useNavigate} from 'react-router-dom';

const steps = ['Shipping address', 'Payment details'];

export interface IShippingData {
	firstName: string,
	lastName: string,
	address1: string,
	email: string,
	city: string,
	zip: string,
	shippingCountry: string,
	shippingSubdivision: string,
	shippingOption: string,
}

const Checkout = ({cart, checkoutCapture, onCaptureCheckout, error, setErrorMessage}: CheckoutProps) => {
	const navigate = useNavigate();
	const [navigationTimeout, setNavigationTimeout] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);
	const [activeStep, setActiveStep] = useState(0);
	const [shippingData, setShippingData] = useState<IShippingData | undefined>(undefined);
	const [checkoutToken, setCheckoutToken] = useState<CheckoutToken | undefined>(undefined);
	const classes = useStyles();

	useEffect(() => {
		if (!cart) {
			return;
		}

		commerce.checkout.generateToken(cart.id, {type: 'cart'})
			.then((token: CheckoutToken) => setCheckoutToken(token))
			.catch(err => navigate('/'));
	}, [cart]);

	const next = (data: IShippingData) => {
		setShippingData(data);
		nextStep();
	};

	const nextStep = () => setActiveStep(prev => prev + 1);
	const prevStep = () => setActiveStep(prev => prev - 1);

	useEffect(() => {
		if (navigationTimeout) {
			window.clearTimeout(navigationTimeout);
		}

		if (error?.length) {
			const timeout = setTimeout(() => {
				setErrorMessage('');
				navigate('/');
			}, 2000);
			setNavigationTimeout(navigationTimeout);
		}
	}, [error]);

	if (!cart) {
		return (
			<>
				<CssBaseline />
				<div className={classes.toolbar} />
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<div className={classes.spinner}>
							<CircularProgress />

						</div>
					</Paper>
				</main>
			</>
		);
	}

	return (
		<>
			<CssBaseline />
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					{!error?.length ? (<>
						<Typography variant="h4" align="center">Checkout</Typography>
						<Stepper activeStep={activeStep} className={classes.stepper}>
							{steps.map(step => (
								<Step key={step}>
									<StepLabel>{step}</StepLabel>
								</Step>
							))}
						</Stepper>
						{activeStep === steps.length && checkoutToken
							? <Confirmation order={checkoutCapture} />
							: <CheckoutForm onCaptureCheckout={onCaptureCheckout} onNext={next} onNextStep={nextStep} onPrev={prevStep} shippingData={shippingData} activeStep={activeStep} token={checkoutToken!} />}
					</>) : (
						<>
							<Typography variant="h5" gutterBottom>Error: {error}</Typography>
							<Button to="/" component={Link} variant="outlined" type="button">Back to Home</Button>
						</>
					)}

				</Paper>
			</main>
		</>
	);
};

type CheckoutProps = {
	cart?: Cart,
	checkoutCapture?: CheckoutCaptureResponse,
	onCaptureCheckout: (tokenId: string, newOrder: Order) => void,
	error: string,
	setErrorMessage: (message: string) => void;
}

export default Checkout;
