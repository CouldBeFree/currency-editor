import { reactive, computed } from 'vue'

const state = reactive({
  modifiedCurrencies: []
})

export const getModifiedCurrencies = computed(() => state.modifiedCurrencies)

export const updateCurrency = (currency) => {
  const index = state.modifiedCurrencies.findIndex(c => c.cc === currency.cc)

  if (index !== -1) {
    state.modifiedCurrencies[index] = {
      ...currency,
      originalRate: state.modifiedCurrencies[index].originalRate,
      modifiedAt: new Date().toISOString()
    }
  } else {
    state.modifiedCurrencies.push({
      ...currency,
      originalRate: currency.rate,
      modifiedAt: new Date().toISOString()
    })
  }
}

export const isModified = (currencyCode) => {
  return state.modifiedCurrencies.some(c => c.cc === currencyCode)
}

export const getModifiedCurrency = (currencyCode) => {
  return state.modifiedCurrencies.find(c => c.cc === currencyCode)
}

export default {
  state,
  getModifiedCurrencies,
  updateCurrency,
  isModified,
  getModifiedCurrency
}
