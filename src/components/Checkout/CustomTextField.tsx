import {TextField, Grid} from '@material-ui/core';
import {useFormContext, Controller} from 'react-hook-form';

const CustomTextField = ({name, label, required = true, type = 'text'}: CustomTextFieldProps) => {
	const {control} = useFormContext();

	return (
		<Grid item xs={12} sm={6}>
			<Controller
				render={({field}) => <TextField {...field} label={label} required={required} type={type} fullWidth />}
				control={control}
				name={name}
				defaultValue=""
				rules={{required}}
			/>
		</Grid>
	);
};

type CustomTextFieldProps = {
    name: string,
    label: string,
    required?: boolean
	type?: 'text' | 'email' | 'time'
}

export default CustomTextField;
