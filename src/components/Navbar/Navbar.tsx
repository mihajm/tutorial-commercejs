import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import {Link, useLocation} from 'react-router-dom';

import logo from '../../assets/logo.svg';

import useStyles from './styles';

const Navbar = ({totalItems}: NavbarProps) => {
	const classes = useStyles();
	const {pathname} = useLocation();

	return (
		<>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
						<img src={logo} alt="E-commerce shop" height="25px" className={classes.image} />
						OpenShop
					</Typography>
					<div className={classes.grow} />
					{pathname !== '/cart' && <div className={classes.button}>
						<IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
							<Badge badgeContent={totalItems} color="secondary">
								<ShoppingCart />
							</Badge>
						</IconButton>
					</div>}
				</Toolbar>
			</AppBar>
		</>
	);
};

type NavbarProps = {
	totalItems: number
}

export default Navbar;
