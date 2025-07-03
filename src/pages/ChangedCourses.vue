
<template>
  <div>
    <h1 class="text-h4 mb-4">Змінені курси</h1>

    <v-card v-if="modifiedCurrencies.length > 0">
      <v-card-title class="d-flex align-center">
        <span>Список змінених курсів валют</span>
        <v-spacer></v-spacer>
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
          :headers="headers"
          :items="modifiedCurrencies"
          :search="search"
          class="cursor-pointer"
          @click:row="(event, { item }) => editCurrency(item)"
        >
          <template v-slot:item.rate="{ item }">
            <div class="d-flex align-center">
              <span>{{ item.rate.toFixed(4) }}</span>
              <v-icon
                size="small"
                color="success"
                class="ms-2"
              >
                mdi-pencil
              </v-icon>
            </div>
          </template>

          <template v-slot:item.originalRate="{ item }">
            {{ item.originalRate.toFixed(4) }}
          </template>

          <template v-slot:item.exchangedate="{ item }">
            {{ formatDate(item.exchangedate) }}
          </template>

          <template v-slot:item.modifiedAt="{ item }">
            {{ formatDateTime(item.modifiedAt) }}
          </template>

          <template v-slot:no-data>
            <div class="text-center py-4">
              <p>Немає даних</p>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-alert
      v-else
      type="info"
      class="mt-4"
    >
      Немає змінених курсів валют. Щоб змінити курс, натисніть на валюту в таблиці на сторінці пошуку курсів.
    </v-alert>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import currencyStore from '@/store/currencyStore'

const router = useRouter()
const search = ref('')

const headers = [
  { title: 'Код валюти', key: 'cc', align: 'start', sortable: true },
  { title: 'Валюта', key: 'txt', align: 'start', sortable: true },
  { title: 'Оригінальний курс', key: 'originalRate', align: 'end', sortable: true },
  { title: 'Змінений курс', key: 'rate', align: 'end', sortable: true },
  { title: 'Дата курсу', key: 'exchangedate', align: 'end', sortable: true },
  { title: 'Дата зміни', key: 'modifiedAt', align: 'end', sortable: true },
]

const modifiedCurrencies = computed(() => currencyStore.getModifiedCurrencies.value)

const formatDate = (dateString) => {
  if (!dateString) return ''
  const [day, month, year] = dateString.split('.')
  return `${year}-${month}-${day}`
}

// Format datetime for display
const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return ''
  const date = new Date(dateTimeString)
  return new Intl.DateTimeFormat('uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const editCurrency = (item) => {
  if (!item || !item.cc) return
  router.push(`/currency-edit/${item.cc}`)
}
</script>

<style scoped>
.max-width-200 {
  max-width: 200px;
}

.cursor-pointer tbody tr {
  cursor: pointer;
}
</style>
