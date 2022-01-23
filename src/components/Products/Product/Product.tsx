import {Product as IProduct} from '@chec/commerce.js/types/product';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';

import useStyles from './styles';

const getTextFromHTML = (htmlStr?: string): string => {
	if (!htmlStr) {
		return '';
	}

	const el = document.createElement('div');
	el.innerHTML = htmlStr;
	return el.textContent || el.innerText || '';
};

const Product = ({product, onAddToCart}: ProductProps): JSX.Element => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardMedia className={classes.media} image={product.image?.url} title={product.name} />
			<CardContent>
				<div className={classes.cardContent}>
					<Typography variant="h5" gutterBottom>
						{product.name}
					</Typography>
					<Typography variant="h5">
						{product.price.formatted_with_symbol}
					</Typography>
				</div>
				<Typography variant="body2" color="textSecondary">{getTextFromHTML(product?.description)}</Typography>
			</CardContent>
			<CardActions disableSpacing className={classes.cardActions}>
				<IconButton aria-label="Add to Card" onClick={() => onAddToCart(product.id, 1)}>
					<AddShoppingCart />
				</IconButton>
			</CardActions>
		</Card>
	);
};

type ProductProps = {
    product: IProduct,
	onAddToCart: (id: string, q: number) => Promise<void>
}

export default Product;
