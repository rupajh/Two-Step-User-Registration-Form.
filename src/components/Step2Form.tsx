import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, CircularProgress } from '@material-ui/core';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/actions/userActions';
import { Resolver } from 'react-hook-form';
import { ValidationError } from 'yup';
import FormCard from './FormCard';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';



const schema = yup.object().shape({
  address: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  country: yup.string().required('Country is required'),
  pincode: yup.string().optional().matches(/^\d+$/, 'Pincode must be a number'),
});

interface FormValues {
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  pincode?: string;
}

// Define resolver function for form validation
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
interface Step2FormProps {
  handleStep2Submit: SubmitHandler<FormValues>;
}
const Step2Form: React.FC<Step2FormProps> = ({ handleStep2Submit }) => {
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormValues>({
    resolver: resolver
  });
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    handleStep2Submit(data)
    navigate('/user-detail', { replace: true });

  };
  const countryInputValue = watch('country');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const handleSelectCountry = (country: string) => {
    setValue('country', country);
    setSuggestions([]);
    setInputValue(country)
  };
  const [countryData, setCountryData] = useState<Country | null>(null);
  const [inputValue, setInputValue] = useState('');
  interface Country {
    name: string;
    capital: string;
    population: number;
    // Add more properties as needed
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setValue('country', event.target.value);
  };
  useEffect(() => {
    if (inputValue.trim() !== '') { // Only fetch data if input value is not empty
      setLoading(true);
      fetch(`https://restcountries.com/v3.1/name/${inputValue}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data?.[0]?.altSpellings || []);
          setCountryData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching country data:', error);
          setLoading(false);
        });
    } else {
      setSuggestions([]); // Clear suggestions if input value is empty
    }
  }, [inputValue]);

  const formContent = () => {
    return (
      <div >
        <div>
          <div className='d-flex' >
            <div className='m-r'>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Address" style={{ width: '216' }} />
                )}
              />
            </div>
            <div>
              <Controller
                name="state"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="State" style={{ width: '216' }} />
                )}
              />


            </div>
          </div>

          <div className='d-flex'>

            <div className='m-r'>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="City" style={{ width: '216' }} />
                )}
              />
            </div>
            <div>
              <Controller
                name="country"
                control={control}
                // defaultValue=""
                render={({ field }) => (
                  <div>
                    <TextField
                      {...field}
                      label="Country*"
                      error={!!errors.country}
                      helperText={errors.country?.message}
                      value={inputValue}
                      onChange={handleChange}
                      style={{ width: '216' }}
                    />
                    {suggestions?.length > 0 && (
                      <div className='search-able-input'>
                        {suggestions?.map((country, index) => (
                          <MenuItem {...field} key={index} onClick={() => handleSelectCountry(country)}>
                            {country}
                          </MenuItem>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              />
              {errors.country && <FormHelperText error>Country is required</FormHelperText>}
            </div>


          </div>
          <div className=''>

            <div className='m-r '>
              <Controller
                name="pincode"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Pincode" type='number' error={!!errors.pincode} helperText={errors.pincode?.message} style={{ width: '216' }} />
                )}
              />

            </div>

          </div>

          <div className='d-flex content-center' style={{ marginTop: "5rem" }}>

            <Button variant="contained" type='submit'>Submit</Button>

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

export default Step2Form;
