import {CheckoutToken} from '@chec/commerce.js/types/checkout-token';
import {Address, Payment} from '.';
import {IShippingData} from './Checkout';
import {Order} from './Payment/Payment';

const CheckoutForm = ({onNext, onNextStep, onPrev, activeStep, token, shippingData, onCaptureCheckout}: CheckoutFormProps) => activeStep === 0
	? 	<Address token={token} next={onNext} prevStepData={shippingData}/>
	: 	<Payment onCaptureCheckout={onCaptureCheckout} next={onNextStep} back={onPrev} token={token} shippingData={shippingData} />;

type CheckoutFormProps = {
	onNext: (data: IShippingData) => void,
	onNextStep: () => void,
	onPrev: () => void,
    activeStep: number,
	token: CheckoutToken
	shippingData?: IShippingData
	onCaptureCheckout: (tokenId: string, newOrder: Order) => void,
}

export default CheckoutForm;
