<template>
  <div>
    <h1 class="text-h4 mb-4">Пошук курсу</h1>

    <v-card>
      <v-card-title class="d-flex align-center">
        <span>Курси валют</span>
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          prepend-icon="mdi-calendar"
          class="me-4"
          @click="openDateDialog"
        >
          Оберіть дату
        </v-btn>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Пошук"
          single-line
          hide-details
          density="compact"
          class="max-width-200"
        ></v-text-field>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="TABLE_HEADERS"
          :items="currencyRates"
          :search="search"
          :loading="loading"
          loading-text="Завантаження..."
          :items-per-page="10"
          :hide-default-footer="false"
          :footer-props="{
            'items-per-page-options': [10],
            'show-current-page': true,
            'show-first-last-page': true
          }"
          class="cursor-pointer"
          @click:row="(event, { item }) => goToCurrencyEdit(item)"
        >
          <template v-slot:item.rate="{ item }">
            {{ item.rate.toFixed(4) }}
          </template>

          <template v-slot:item.exchangedate="{ item }">
            {{ formatDate(item.exchangedate) }}
          </template>

          <template v-slot:no-data>
            <div class="text-center py-4">
              <p v-if="loading">Завантаження...</p>
              <p v-else>Немає даних</p>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Date Picker Dialog -->
    <v-dialog
      v-model="dateDialog"
      max-width="400"
    >
      <v-card>
        <v-card-text>
          <v-date-picker
            v-model="selectedDate"
            width="100%"
            :max="yesterday"
          ></v-date-picker>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="closeDateDialog"
          >
            Закрити
          </v-btn>
          <v-btn
            color="primary"
            variant="text"
            @click="saveDateSelection"
          >
            Зберегти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { TABLE_HEADERS } from "@/constants/index.js";
import { useGetCurrencies } from "@/composables/useGetCurrencies.js";

const router = useRouter()

const search = ref('')
const selectedDate = ref('')
const dateDialog = ref(false)

const { loading, currencyRates, fetchCurrencyRates } = useGetCurrencies()

const formatDate = (dateString) => {
  if (!dateString) return ''
  const [day, month, year] = dateString.split('.')
  return `${year}-${month}-${day}`
}

const formattedTempDate = computed(() => {
  if (!selectedDate.value) return ''

  if (typeof selectedDate.value === 'string' && selectedDate.value.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return selectedDate.value
  }

  const date = new Date(selectedDate.value)
  if (isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}${month}${day}`
})

const yesterday = computed(() => {
  const today = new Date()
  today.setDate(today.getDate() - 1)

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
})

const openDateDialog = () => {
  dateDialog.value = true
}

const closeDateDialog = () => {
  dateDialog.value = false
}

const saveDateSelection = () => {
  dateDialog.value = false
  fetchCurrencyRates(formattedTempDate.value)
}

const goToCurrencyEdit = (item) => {
  if (!item || !item.cc) return
  router.push(`/currency-edit/${item.cc}`)
}
</script>

<style scoped>
.cursor-pointer tbody tr {
  cursor: pointer;
}
.max-width-200 {
  max-width: 200px;
}
</style>
