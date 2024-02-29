import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com';

export const fetchCountries = async (searchTerm: string): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v3.1/name/${searchTerm}`);
    const countries: string[] = response.data.map((country: any) => country.name);
    return countries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};
