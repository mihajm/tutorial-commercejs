import {useState, useEffect} from 'react';

import {Button, CircularProgress, Grid, Typography} from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';
import {CustomSelectField, CustomTextField} from '..';

import {commerce} from '../../lib/commerce';
import {CheckoutToken} from '@chec/commerce.js/types/checkout-token';
import {Link} from 'react-router-dom';
import {IShippingData} from '../Checkout';

export interface IShippingMappedValue {
	value: string,
	label: string,
}

import useStyles from '../styles';

const Address = ({token, next, prevStepData}: AddressProps) => {
	const classes = useStyles();
	const [shippingCountries, setShippingCountries] = useState<IShippingMappedValue[]>([]);
	const [shippingCountry, setShippingCountry] = useState<string>('');
	const [shippingSubdivisions, setShippingSubdivisions] = useState<IShippingMappedValue[]>([]);
	const [shippingSubdivision, setShippingSubdivision] = useState<string>('');
	const [shippingOptions, setShippingOptions] = useState<IShippingMappedValue[]>([]);
	const [shippingOption, setShippingOption] = useState<string>('');

	const methods = useForm();

	const mapShippingValues = (vals: {[name: string]: string}): IShippingMappedValue[] => vals ? Object.entries(vals).map(([value, label]) => ({value, label})) : [];

	const fetchShippingCountries = (checkoutTokenId: string): Promise<void> => commerce.services.localeListShippingCountries(checkoutTokenId)
		.then(({countries}) => mapShippingValues(countries))
		.then(countries => setShippingCountries(countries))
		.then(() => {
			if (prevStepData?.shippingCountry) {
				setShippingCountry(prevStepData.shippingCountry);
			}
		})
		.catch(err => {});

	const fetchShippingSubdivisions = (countryCode: string): Promise<void> => commerce.services.localeListSubdivisions(countryCode)
		.then(({subdivisions}) => mapShippingValues(subdivisions))
		.then(subdivisions => setShippingSubdivisions(subdivisions))
		.then(() => {
			if (prevStepData?.shippingSubdivision) {
				setShippingSubdivision(prevStepData.shippingSubdivision);
			}
		})
		.catch(err => {});

	const fetchShippingOptions = (checkoutTokenId: string, country: string, region?: string): Promise<void> => commerce.checkout.getShippingOptions(checkoutTokenId, {country, region})
		.then(options => options ? options.map(so => ({value: so.id, label: `${so.description} - ${so.price.formatted_with_symbol}`})) : [])
		.then(options => setShippingOptions(options))
		.then(() => {
			if (prevStepData?.shippingOption) {
				setShippingOption(prevStepData.shippingOption);
			}
		})
		.catch(err => {});

	useEffect(() => {
		if (prevStepData) {
			methods.setValue('firstName', prevStepData.firstName);
			methods.setValue('lastName', prevStepData.lastName);
			methods.setValue('city', prevStepData.city);
			methods.setValue('email', prevStepData.email);
			methods.setValue('zip', prevStepData.zip);
			methods.setValue('address1', prevStepData.address1);
		}
	}, []);

	useEffect(() => {
		setShippingCountry('');
		if (!token) {
			return;
		}

		fetchShippingCountries(token?.id);
	}, [token]);

	useEffect(() => {
		setShippingSubdivision('');
		if (!shippingCountry?.length) {
			return;
		}

		fetchShippingSubdivisions(shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		setShippingOption('');
		if (!shippingSubdivision?.length) {
			return;
		}

		fetchShippingOptions(token.id, shippingCountry, shippingSubdivision);
	}, [shippingSubdivision]);

	return (
		<>
			<Typography variant="h6" gutterBottom>Shipping Address</Typography>
			<FormProvider {...methods}>
				{token ? (<form onSubmit={methods.handleSubmit(data => next({...data, shippingCountry, shippingSubdivision, shippingOption} as IShippingData))}>
					<Grid container spacing={3}>
						<CustomTextField name="firstName" label="First name" />
						<CustomTextField name="lastName" label="Last name" />
						<CustomTextField name="address1" label="Address" />
						<CustomTextField name="email" label="Email" type="email" />
						<CustomTextField name="city" label="City" />
						<CustomTextField name="zip" label="ZIP / Postal code" />
						<CustomSelectField value={shippingCountry} label={'Shipping Country'} options={shippingCountries} onChange={e => setShippingCountry(e?.target?.value ? e.target.value as string : '')}/>
						<CustomSelectField disabled={!shippingCountry?.length} value={shippingSubdivision} label={'Shipping Subdivision'} options={shippingSubdivisions} onChange={e => setShippingSubdivision(e?.target?.value ? e.target.value as string : '')}/>
						<CustomSelectField disabled={!shippingSubdivision?.length} value={shippingOption} label={'Shipping Options'} options={shippingOptions} onChange={e => setShippingOption(e?.target?.value ? e.target.value as string : '')}/>
					</Grid>
					<br />
					<div style={{display: 'flex', justifyContent: 'space-between'}}>
						<Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
						<Button type="submit" variant="contained" color="primary">Next</Button>
					</div>
				</form>) : (
					<div className={classes.spinner}>
						<CircularProgress />
					</div>
				)}
			</FormProvider>
		</>
	);
};

type AddressProps = {
	next: (data: IShippingData) => void,
	token: CheckoutToken,
	prevStepData?: IShippingData,
}

export default Address;
