import {CheckoutToken} from '@chec/commerce.js/types/checkout-token';
import {Typography, List, ListItem, ListItemText} from '@material-ui/core';
import Product from '../Products/Product/Product';

const Review = ({token}: ReviewProps) => (
	<>
		<Typography variant="h6" gutterBottom>Order summary</Typography>
		<List disablePadding>
			{token.live.line_items.map(prod => (
				<ListItem style={{padding: '10px 0'}} key={prod.name}>
					<ListItemText primary={prod.name} secondary={`Quantity: ${prod.quantity ? prod.quantity : 0}`} />
					<Typography variant="body2">{prod.line_total.formatted_with_symbol}</Typography>
				</ListItem>
			))}
			<ListItem style={{padding: '10px 0'}}>
				<ListItemText primary="Total" />
				<Typography variant="subtitle1" style={{fontWeight: 700}}>
					{token.live.subtotal.formatted_with_symbol}
				</Typography>
			</ListItem>
		</List>
	</>
);

type ReviewProps = {
    token: CheckoutToken
}

export default Review;
