import {LineItem} from '@chec/commerce.js/types/line-item';

import {Typography, Button, Card, CardActions, CardContent, CardMedia} from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({item, updateQty, remove}: CartItemProps) => {
	const classes = useStyles();

	if (!item) {
		return (<></>);
	}

	return (
		<Card>
			<CardMedia image={item?.image?.url} className={classes.media}/>
			<CardContent className={classes.cardContent}>
				<Typography variant="h5">{item.name}</Typography>
				<Typography variant="h6">{item.line_total.formatted_with_symbol}</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<div className={classes.buttons}>
					<Button type="button" size="small" onClick={() => updateQty(item.id, item.quantity - 1)}>-</Button>
					<Typography>{item.quantity}</Typography>
					<Button type="button" size="small" onClick={() => updateQty(item.id, item.quantity + 1)}>+</Button>
				</div>
				<Button variant="contained" type="button" color="secondary" onClick={() => remove(item.id)}>Remove</Button>
			</CardActions>
		</Card>
	);
};

type CartItemProps = {
    item: LineItem,
	updateQty: (id: string, q: number) => Promise<void>
	remove: (id: string) => Promise<void>
}

export default CartItem;
