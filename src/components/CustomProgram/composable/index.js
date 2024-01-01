import { reactive, ref } from 'vue'
import { uid } from 'uid'
import { LOAD, MULTIPLIER } from '@/components/CustomProgram/constants/index.js'

const createTableRows = () => {
  return reactive({
    id: uid(10),
    load: LOAD[0],
    exercise: '',
    multiplier: MULTIPLIER[0],
    weight: 0,
    reps: 0,
    sets: 1,
    percentOfPM: 0,
    tonnage: function() {
      return this.weight * this.reps * this.sets || 0
    },
    totalReps: function() {
      return this.reps * this.sets || 0
    },
    time: 0
  })
}

const dayInMicrocycle = ref([])
const microcycle = ref([])

const addRow = () => {
  if (dayInMicrocycle.value.length >= 10) return
  dayInMicrocycle.value.push(createTableRows())
}

const removeRow = (id) => {
  dayInMicrocycle.value = dayInMicrocycle.value.filter((microcycle) => microcycle.id !== id)
}

const clearAll = () => {
  dayInMicrocycle.value = [createTableRows()]
}

const createNewDayOfMicrocycle = () => {
  microcycle.value.push(dayInMicrocycle.value)
  dayInMicrocycle.value = [createTableRows()]
}

export {
  dayInMicrocycle,
  microcycle,
  addRow,
  removeRow,
  clearAll,
  createNewDayOfMicrocycle
}