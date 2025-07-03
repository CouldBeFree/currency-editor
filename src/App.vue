<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer
        floating
        permanent
      >
        <v-list
          density="compact"
          nav
        >
          <v-list-item v-for="item in NAV_META" :prepend-icon="item.icon" :title="item.title" :value="item.value" :to="item.to" :key="item.value"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { NAV_META} from "@/constants/index.js";
</script>
