<script setup>
import OrderBookSide from './OrderBookSide.vue'
import { orderBook } from './../../application'
import { onMounted, onUpdated } from 'vue'
import { metrics } from './../../application'
import { METRIC } from './../../application/metric'

onMounted(() => metrics.inc(METRIC.ORDER_BOOK_UPDATED))
onUpdated(() => metrics.inc(METRIC.ORDER_BOOK_UPDATED))

defineProps({
  orderBook: Object,
})
</script>

<template>
  <div class="order-book">
    <div class="order-book__header">
      <h4>Order Book</h4>

      <div class="order-book__scale-select">
        <label for="scale">Scale: </label>
        <select name="scale" id="scale" @change="orderBook.setScale(+$event.target.value)">
          <option value="0.0001">x0.0001</option>
          <option value="0.001">x0.001</option>
          <option value="0.01">x0.01</option>
        </select>
      </div>
    </div>

    <OrderBookSide class="order-book__bids" :reverse="true" :orderBook="orderBook" field="bids" />
    <OrderBookSide class="order-book__asks" :reverse="false" :orderBook="orderBook" field="asks" />
  </div>
</template>

<style scoped>
.order-book {
  display: grid;
  grid-template-rows: auto 1fr 1fr;
}

.order-book__header {
  position: relative;
}

.order-book__scale-select {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translate(0%, -50%);
}

.order-book__bids,
.order-book__asks {
  border-top: 1px solid #888;
}
</style>
