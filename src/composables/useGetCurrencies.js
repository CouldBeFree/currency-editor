import { ref, onMounted } from 'vue';
import { getCurrencyRates } from '@/api';

export function useGetCurrencies() {
  const loading = ref(true)
  const currencyRates = ref([])

  const fetchCurrencyRates = async (date) => {
    try {
      loading.value = true
      currencyRates.value = await getCurrencyRates(date)
      loading.value = false
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await fetchCurrencyRates()
  })

  return {
    loading,
    currencyRates,
    fetchCurrencyRates,
  }
}
