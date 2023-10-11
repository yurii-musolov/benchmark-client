<script setup>
import { onMounted, onUpdated } from 'vue'
import { metrics } from './../../application'
import { METRIC } from './../../application/metric'

onMounted(() => metrics.inc(METRIC.ORDER_BOOK_ROW_CREATED))
onUpdated(() => metrics.inc(METRIC.ORDER_BOOK_ROW_UPDATED))

defineProps({
  order: Object,
})
</script>

<template>
  <div :class="['order-book-row', { _sell: order.side === 1, _buy: order.side === 0 }]">
    <div :class="['order-book-row_price', { _sell: order.side === 1, _buy: order.side === 0 }]">
      {{ order.formatedPrice || order.price }}
    </div>
    <div class="order-book-row_volume">
      {{ order.volume }}
    </div>
    <div class="order-book-row_total">
      {{ order.total }}
    </div>
  </div>
</template>

<style scoped>
.order-book-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 8px;
}

.order-book-row:hover {
  background-color: #55555533;
}

.order-book-row_price._sell {
  color: #880000;
}

.order-book-row_price._buy {
  color: #000088;
}

.order-book-row._sell {
  border-bottom: 1px solid #555555;
}

.order-book-row._buy {
  border-top: 1px solid #555555;
}</style>
