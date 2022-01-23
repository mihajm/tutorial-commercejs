import {Cart as ICart} from '@chec/commerce.js/types/cart';
import {Container, Typography, Button, Grid} from '@material-ui/core';

import {EmptyCart, FilledCart} from '.';

import useStyles from './styles';

const Cart = ({cart, onUpdateQty, onRemove, onEmpty}: CartProps) => {
	const classes = useStyles();
	const isEmpty = !cart?.total_items;

	if (!cart) {
		return (<></>);
	}

	return (
		<Container>
			<div className={classes.toolbar} />
			<Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
			{isEmpty ? <EmptyCart /> : <FilledCart cart={cart} onUpdateQty={onUpdateQty} onRemove={onRemove} empty={onEmpty} />}
		</Container>
	);
};

type CartProps = {
	cart?: ICart,
	onUpdateQty: (id: string, q: number) => Promise<void>
	onRemove: (id: string) => Promise<void>
	onEmpty: () => Promise<void>
}

export default Cart;
