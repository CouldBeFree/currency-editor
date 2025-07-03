import ChangedCourses from "@/pages/ChangedCourses.vue";
import CourseSearch from "@/pages/CourseSearch.vue";
import CurrencyEdit from "@/pages/CurrencyEdit.vue";

export const ROUTE_META = [
  { path: '/changed-course', name: 'changed-course', component: ChangedCourses },
  { path: '/course-search', name: 'course-search', component: CourseSearch },
  { path: '/currency-edit/:code', name: 'currency-edit', component: CurrencyEdit }
]

export const NAV_META = [
  { icon: 'mdi-view-dashboard', title: 'Головна', value: 'home', to: '/' },
  { icon: 'mdi-currency-usd', title: 'Змінений курс', value: 'changed-course', to: '/changed-course' },
  { icon: 'mdi-magnify', title: 'Пошук курса', value: 'course-search', to: '/course-search' }
]

export const TABLE_HEADERS = [
  { title: 'Код валют', key: 'cc', align: 'start', sortable: true },
  { title: 'Валюта', key: 'txt', align: 'start', sortable: true },
  { title: 'Рейт', key: 'rate', align: 'end', sortable: true },
  { title: 'Дата', key: 'exchangedate', align: 'end', sortable: true },
]
