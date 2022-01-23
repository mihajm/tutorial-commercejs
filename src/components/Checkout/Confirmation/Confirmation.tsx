import {CheckoutCaptureResponse} from '@chec/commerce.js/types/checkout-capture-response';
import {Button, CircularProgress, Divider, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';

import useStyles from '../styles';

const Confirmation = ({order}: CheckoutProps) => {
	const classes = useStyles();

	return order?.customer ? (
		<>
			<div>
				<Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
				<Divider className={classes.divider} />
				<Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
			</div>
			<br />
			<Button component={Link} variant="outlined" type="button" to="/">Back to Home</Button>
		</>
	) : (
		<div className={classes.spinner}>
			<CircularProgress />
		</div>
	);
};

type CheckoutProps = {
    order?: CheckoutCaptureResponse,
}

export default Confirmation;
