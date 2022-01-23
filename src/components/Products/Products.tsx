import {Product as IProduct} from '@chec/commerce.js/types/product';
import {Grid} from '@material-ui/core';
import Product from './Product/Product';

import useStyles from './styles';

const Products = ({products, onAddToCart}: ProductsProps) => {
	const classes = useStyles();
	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<Grid container justifyContent="center" spacing={4}>
				{products.map(prod => (
					<Grid item key={prod.id} xs={12} sm={6} md={4} lg={3}>
						<Product product={prod} onAddToCart={onAddToCart} />
					</Grid>
				))}
			</Grid>

		</main>
	);
};

type ProductsProps = {
	products: IProduct[]
	onAddToCart: (id: string, q: number) => Promise<void>
}

export default Products;
