<script setup>
import AppHeader from './components/AppHeader.vue'
import OrderBook from './components/order-book/OrderBook.vue'
import Metrics from './components/Metrics.vue'
import { metrics } from './application'
</script>

<template>
  <div class="app-layout">
    <AppHeader class="app-layout__header" title="UI Benchmark (Vite + Vue3)" />
    <Metrics class="app-layout__metrics" :metrics="metrics" />
    <OrderBook class="app-layout__order-book" />
  </div>
</template>

<style scoped>
.app-layout {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header header"
    "metrics metrics order-book"
    "metrics metrics order-book";
}

.app-layout__header {
  grid-area: header;
}

.app-layout__order-book {
  grid-area: order-book;
  border-left: solid 1px #888;
  width: 400px;
}

.app-layout__metrics {
  grid-area: metrics;
}
</style>
