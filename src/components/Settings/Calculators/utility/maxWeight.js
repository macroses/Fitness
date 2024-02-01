import { computed, ref } from 'vue'

const liftedWeight = ref(100)
const repeats = ref(10)

const oneRepMaxBrzycki = computed(() => {
  return liftedWeight.value / (1.0278 - 0.0278 * repeats.value)
})

const oneRepMaxEpley = computed(() => {
  return liftedWeight.value * (1 + 0.0333 * repeats.value)
})

const oneRepMaxLander = computed(() => {
  return (100 * liftedWeight.value) / (101.3 - 2.67123 * repeats.value)
})

const averageOneRepMax = computed(() => {
  return (
    (oneRepMaxBrzycki.value + oneRepMaxEpley.value + oneRepMaxLander.value) / 3
  )
})

export {
  oneRepMaxBrzycki,
  oneRepMaxEpley,
  oneRepMaxLander,
  averageOneRepMax,
  liftedWeight,
  repeats
}
