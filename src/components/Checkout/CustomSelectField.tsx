import {Grid, Select, MenuItem, InputLabel} from '@material-ui/core';
import {ChangeEvent} from 'react';
import {IShippingMappedValue} from './Address/Address';

const CustomSelectField = ({required = true, disabled = false, label, value, options, onChange}: CustomSelectFieldProps) => (
	<Grid item xs={12} sm={6}>
		<InputLabel>{label}</InputLabel>
		<Select required={required} disabled={disabled} value={value} fullWidth onChange={e => onChange(e)}>
			{options.map(opt => (
				<MenuItem key={opt?.value} value={opt?.value}>{opt?.label}</MenuItem>
			))};
		</Select>
	</Grid>
);

type CustomSelectFieldProps = {
    required?: boolean,
    disabled?: boolean,
    value?: string,
    label: string,
    options: IShippingMappedValue[];
    onChange: (e: ChangeEvent<any>) => void
}

export default CustomSelectField;
