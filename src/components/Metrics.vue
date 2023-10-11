<script setup>
import { metrics } from './../application'
import { METRIC } from './../application/metric'

defineProps({
  metrics: Object,
})
</script>

<template>
  <div class="app-metrics">
    <h4>Metrics</h4>

    <div class="app-metrics__table">
      <div class="app-metrics__cell"></div>
      <div class="app-metrics__cell">per sec.</div>
      <div class="app-metrics__cell">total</div>

      <div class="app-metrics__cell">{{ METRIC.ORDER_BOOK_WS_MESSAGES }}</div>
      <div class="app-metrics__cell">{{ metrics.diffs[METRIC.ORDER_BOOK_WS_MESSAGES] }}</div>
      <div class="app-metrics__cell">{{ metrics.next[METRIC.ORDER_BOOK_WS_MESSAGES] }}</div>

      <div class="app-metrics__cell">{{ METRIC.ORDER_BOOK_ROW_CREATED }}</div>
      <div class="app-metrics__cell">{{ metrics.diffs[METRIC.ORDER_BOOK_ROW_CREATED] }}</div>
      <div class="app-metrics__cell">{{ metrics.next[METRIC.ORDER_BOOK_ROW_CREATED] }}</div>

      <div class="app-metrics__cell">{{ METRIC.ORDER_BOOK_UPDATED }}</div>
      <div class="app-metrics__cell">{{ metrics.diffs[METRIC.ORDER_BOOK_UPDATED] }}</div>
      <div class="app-metrics__cell">{{ metrics.next[METRIC.ORDER_BOOK_UPDATED] }}</div>

      <div class="app-metrics__cell">{{ METRIC.ORDER_BOOK_SIDE_UPDATED }}</div>
      <div class="app-metrics__cell">{{ metrics.diffs[METRIC.ORDER_BOOK_SIDE_UPDATED] }}</div>
      <div class="app-metrics__cell">{{ metrics.next[METRIC.ORDER_BOOK_SIDE_UPDATED] }}</div>

      <div class="app-metrics__cell">{{ METRIC.ORDER_BOOK_ROW_CREATED }}</div>
      <div class="app-metrics__cell">{{ metrics.diffs[METRIC.ORDER_BOOK_ROW_CREATED] }}</div>
      <div class="app-metrics__cell">{{ metrics.next[METRIC.ORDER_BOOK_ROW_CREATED] }}</div>

      <div class="app-metrics__cell">{{ METRIC.ORDER_BOOK_ROW_UPDATED }}</div>
      <div class="app-metrics__cell">{{ metrics.diffs[METRIC.ORDER_BOOK_ROW_UPDATED] }}</div>
      <div class="app-metrics__cell">{{ metrics.next[METRIC.ORDER_BOOK_ROW_UPDATED] }}</div>
    </div>
  </div>
</template>

<style scoped>
.app-metrics {
  padding: 16px 48px;
}

.app-metrics__table {
  gap: 8px;
  width: min-content;
  display: grid;
  grid-template-columns: auto 1fr 1fr;
}

.app-metrics__cell {
  text-align: start;
  white-space: nowrap;
}

.app-metrics__row {
  display: flex;
  gap: 8px;
}
</style>
