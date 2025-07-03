<template>
  <div>
    <h1 class="text-h4 mb-4">Редагування курсу валюти</h1>

    <v-card v-if="currency">
      <v-card-title class="d-flex align-center">
        <span>{{ currency.txt }} ({{ currency.cc }})</span>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="saveCurrency">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="currency.txt"
                label="Назва валюти"
                readonly
                disabled
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="currency.cc"
                label="Код валюти"
                readonly
                disabled
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="originalRateDisplay"
                label="Оригінальний курс"
                readonly
                disabled
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="editedRate"
                label="Новий курс"
                type="number"
                step="0.0001"
                min="0"
                :rules="[v => !!v || 'Курс обов\'язковий', v => v > 0 || 'Курс має бути більше 0']"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="currency.exchangedate"
                label="Дата курсу"
                readonly
                disabled
              ></v-text-field>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="grey-darken-1"
              variant="text"
              @click="goBack"
            >
              Скасувати
            </v-btn>
            <v-btn
              color="primary"
              variant="text"
              type="submit"
              :disabled="!isRateChanged"
            >
              Зберегти
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCurrencyRates } from '@/api'
import currencyStore from '@/store/currencyStore'

const route = useRoute()
const router = useRouter()
const currency = ref(null)
const editedRate = ref('')
const isLoading = ref(false)

const currencyCode = computed(() => route.params.code)

const originalRateDisplay = computed(() => {
  if (!currency.value) return ''
  const originalRate = currencyStore.getModifiedCurrency(currencyCode.value)?.originalRate || currency.value.rate
  return originalRate.toFixed(4)
})

const isRateChanged = computed(() => {
  if (!currency.value || !editedRate.value) return false
  const originalRate = currencyStore.getModifiedCurrency(currencyCode.value)?.originalRate || currency.value.rate
  return parseFloat(editedRate.value) !== originalRate
})

const saveCurrency = () => {
  if (!currency.value) return

  const updatedCurrency = {
    ...currency.value,
    rate: parseFloat(editedRate.value)
  }

  // Save to store
  currencyStore.updateCurrency(updatedCurrency)

  router.push('/changed-course')
}

const goBack = () => {
  router.back()
}

const fetchCurrency = async () => {
  if (!currencyCode.value) return

  try {
    isLoading.value = true

    const modifiedCurrency = currencyStore.getModifiedCurrency(currencyCode.value)

    if (modifiedCurrency) {
      currency.value = modifiedCurrency
      editedRate.value = modifiedCurrency.rate.toFixed(4)
    } else {
      const date = new Date()
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const formattedDate = `${year}${month}${day}`

      const currencies = await getCurrencyRates(formattedDate)
      const foundCurrency = currencies.find(c => c.cc === currencyCode.value)

      if (foundCurrency) {
        currency.value = foundCurrency
        editedRate.value = foundCurrency.rate.toFixed(4)
      }
    }
  } catch (err) {
    console.error('Error fetching currency:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchCurrency()
})
</script>
