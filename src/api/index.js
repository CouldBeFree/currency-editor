import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bank.gov.ua/NBUStatService/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default api;

export const getCurrencyRates = async (date) => {
  try {
    if (!date) {
      const today = new Date();
      date = today.getFullYear() +
             ('0' + (today.getMonth() + 1)).slice(-2) +
             ('0' + today.getDate()).slice(-2);
    }

    const response = await api.get(`/statdirectory/exchange?date=${date}&json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    throw error;
  }
};
