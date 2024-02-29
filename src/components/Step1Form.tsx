import React from 'react';
import { useForm, Controller, SubmitHandler, useWatch } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/actions/userActions';
import { ValidationError } from 'yup';
import '../App.css'
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormCard from './FormCard';
import '../style/Form.css'
import { error } from 'console';
const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    age: yup.number().typeError('Age must be a number').positive('Age must be a positive number').required('Age is required'),
    sex: yup.string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid sex value'),
    mobile: yup.string().matches(/^\d{10}$/, 'Invalid mobile number').required('Mobile number is required'),
    govtIdType: yup.string().oneOf(['Aadhar', 'PAN'], 'Invalid government ID type').required('Government ID type is required'),
    govtId: yup.string().required('This field is required').test('conditional-validation', 'Invalid government ID', function (value, { parent }) {
        const govtIdType = parent.govtIdType;
        if (!value) return true; // Skip validation if govtId is not provided
        if (govtIdType === 'Aadhar') {
            return /^[2-9]\d{11}$/.test(value) || this.createError({ message: 'Invalid Aadhar number' });
        } else if (govtIdType === 'PAN') {
            return /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/.test(value) || this.createError({ message: 'Invalid PAN number' });
        }
        return true;
    })

});

interface FormValues {
    name?: string;
    age?: number;
    sex?: string;
    mobile?: string;
    govtIdType?: string; // Update type to match Yup schema
    govtId?: string;
}

const resolver = async (values: FormValues) => {
    try {
        await schema.validate(values, { abortEarly: false });
        return { values: values, errors: {} };
    } catch (errors: any) {
        if (errors instanceof ValidationError) {
            return {
                values: {},
                errors: errors.inner.reduce((allErrors: any, currentError: any) => {
                    return {
                        ...allErrors,
                        [currentError.path]: currentError.message,
                    };
                }, {}),
            };
        } else {
            // Handle other types of errors
            console.error('Validation error:', errors);
            return {
                values: {},
                errors: { general: 'An error occurred during validation.' }, // Generic error message
            };
        }
    }
};
interface Step1FormProps {
    handleStep1Submit: SubmitHandler<FormValues>;
}
const Step1Form: React.FC<Step1FormProps> = ({ handleStep1Submit }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: resolver
    });
    const onSubmit = (data: FormValues) => {
        handleStep1Submit(data)
        // Proceed to Step-2
    };
    const govtIdType = useWatch({
        control,
        name: 'govtIdType',
        defaultValue: ''
    });

    const getGovtIdLabel = () => {
        if (govtIdType === 'Aadhar') {
            return 'Aadhar Number';
        } else if (govtIdType === 'PAN') {
            return 'PAN Number';
        }
        return 'Government ID *'; // Default label if none of the above matches
    };

    const formContent = () => {
        return (
            <div >
                <div>
                    <div className='d-flex'>
                        <div className='m-r'>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField {...field} label="Name *" error={!!errors.name} helperText={errors.name?.message} style={{ minWidth: 216 }} />
                                )}
                            />
                            {errors.name && <FormHelperText error>Name is required</FormHelperText>}
                        </div>
                        <div>
                            <Controller
                                name="age"
                                control={control}
                                // defaultValue=""
                                render={({ field }) => (
                                    <TextField {...field} type="number" label="Age *" error={!!errors.age} helperText={errors.age?.message} style={{ minWidth: 216 }} />
                                )}
                            />
                            {errors.age && <FormHelperText error>Age must be a number</FormHelperText>}


                        </div>
                    </div>

                    <div className='d-flex'>

                        <div className='m-r'>
                            <Controller
                                name="sex"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <FormControl error={!!errors.sex} sx={{ minWidth: 216 }} variant="standard">
                                        <InputLabel>Sex *</InputLabel>
                                        <Select {...field}>
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                        </Select>
                                        {errors.sex && <FormHelperText error>This fiel is required</FormHelperText>}
                                    </FormControl>
                                )}
                            />
                        </div>
                        <div>
                        <Controller
                            name="mobile"
                            control={control}
                            // defaultValue=""
                            render={({ field }) => (
                                <TextField {...field} label="Mobile*" type='number' error={!!errors.mobile} helperText={errors.mobile?.message} style={{ minWidth: 216 }} />
                            )}
                        />
                        {errors.mobile && <FormHelperText error>mobile must be a number</FormHelperText>}
                        </div>

                    </div>
                    <div className='d-flex'>

                        <div className='m-r d-flex'>
                            <Controller
                                name="govtIdType"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <FormControl error={!!errors.govtIdType} sx={{ minWidth: 216 }} style={{ marginRight: '2rem' }} variant="standard">
                                        <InputLabel>Government ID Type *</InputLabel>
                                        <Select {...field}>
                                            <MenuItem value="Aadhar">Aadhar</MenuItem>
                                            <MenuItem value="PAN">PAN</MenuItem>
                                        </Select>
                                        {/* <FormHelperText>Government ID type is required</FormHelperText> */}
                                        {errors.govtIdType && <FormHelperText error>mobile must be a number</FormHelperText>}

                                    </FormControl>
                                )}
                            />
                            <div>
                                <Controller
                                    name="govtId"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            style={{ minWidth: 216 }}

                                            {...field}
                                            label={errors.govtIdType ? "Government ID *" : getGovtIdLabel()} error={!!errors.govtId}
                                            helperText={errors.govtId?.message}
                                        />
                                    )}
                                />
                                {errors.govtIdType && <FormHelperText error>Government ID type is requiredr</FormHelperText>}

                            </div>
                        </div>

                    </div>

                    <div className='d-flex content-center' style={{ marginTop: "5rem" }}>

                        <Button variant="contained" type='submit'>Next</Button>

                    </div>
                </div>
            </div>

        )
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormCard formContent={formContent} />

        </form>
    );
};

export default Step1Form;
