import {Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';

import useStyles from './styles';

const EmptyCart = () => {
	const classes = useStyles();

	return (
		<Typography variant="subtitle1">
			<Link to="/" className={classes.link}>
				You have no items in your shopping cart :(.
			</Link>
		</Typography>
	);
};

export default EmptyCart;
