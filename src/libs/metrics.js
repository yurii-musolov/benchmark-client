import { reactive } from "vue"

export class Metrics {
  _prev = {}
  next = reactive({})
  diffs = reactive({})

  constructor(delay) {
    setInterval(this._calcDiffs.bind(this), delay)
  }

  inc(key) {
    if (!this._prev[key] || !this.next[key] || !this.diffs[key]) {
      this._prev[key] = 0
      this.next[key] = 0
      this.diffs[key] = (0).toFixed(2)
    }

    this.next[key]++
  }

  _calcDiffs() {
    for (const key in this.next) {
      this.diffs[key] = (this.next[key] - this._prev[key]).toFixed(2)
    }

    this._prev = { ...this.next }
  }
}
