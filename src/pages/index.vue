<template>
  <div>
    <v-card>
      <v-card-title class="d-flex align-center">
        <span>Курс валют НБУ</span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
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
          :footer-props="{ 'items-per-page-options': [10] }"
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGetCurrencies } from "@/composables/useGetCurrencies.js";
import { TABLE_HEADERS } from "@/constants/index.js";

const router = useRouter()
const { loading, currencyRates } = useGetCurrencies()
const search = ref('')

const formatDate = (dateString) => {
  if (!dateString) return ''
  const [day, month, year] = dateString.split('.')
  return `${year}-${month}-${day}`
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
