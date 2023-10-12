<script setup>
import OrderBookRow from './OrderBookRow.vue'
import { onMounted, onUpdated } from 'vue'
import { metrics } from './../../application'
import { METRIC } from './../../application/metric'

onMounted(() => metrics.inc(METRIC.ORDER_BOOK_SIDE_CREATED))
onUpdated(() => metrics.inc(METRIC.ORDER_BOOK_SIDE_UPDATED))

defineProps({
  reverse: Boolean,
  field: String,
  orderBook: Object,
})
</script>

<template>
  <div :class="['order-book-side', { _reverse: reverse }]">
    <OrderBookRow v-for="order in orderBook[field]" :key="order.formatedPrice" :order="order" />
  </div>
</template>

<style scoped>
.order-book-side {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.order-book-side::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.order-book-side {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.order-book-side._reverse {
  flex-direction: column-reverse;
}
</style>
