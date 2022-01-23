import {Button, Grid, Typography} from '@material-ui/core';
import CartItem from './CartItem/CartItem';
import {Link} from 'react-router-dom';

import useStyles from '../styles';
import {Cart} from '@chec/commerce.js/types/cart';

const FilledCart = ({cart, onUpdateQty, onRemove, empty}: FilledCartProps) => {
	const classes = useStyles();

	return (
		<>
			<Grid container spacing={3}>
				{cart?.line_items?.map(item => (
					<Grid item xs={12} sm={4} key={item.id}>
						<CartItem updateQty={onUpdateQty} remove={onRemove} item={item} />
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant="h4">Subtotal: {cart?.subtotal.formatted_with_symbol}</Typography>
				<div>
					<Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={() => empty()}>Empty Cart</Button>
					<Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
				</div>
			</div>
		</>
	);
};

type FilledCartProps = {
    cart?: Cart,
	onUpdateQty: (id: string, q: number) => Promise<void>
	onRemove: (id: string) => Promise<void>
	empty: () => Promise<void>
}

export default FilledCart;
