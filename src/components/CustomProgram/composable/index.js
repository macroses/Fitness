import { reactive, ref } from 'vue'
import { uid } from 'uid'
import { LOAD, MULTIPLIER } from '@/components/CustomProgram/constants/index.js'

export const microcycles = ref([
  reactive({
    id: uid(10),
    load: LOAD[0],
    exercise: '',
    multiplier: MULTIPLIER[0],
    weight: 0,
    reps: 0,
    sets: 1,
    percentOfPM: 0,
    tonnage: function() {
      if (this.multiplier.value === 'x2') {
        return (this.weight * 2) * this.reps * this.sets || 0
      }
      return this.weight * this.reps * this.sets || 0
    },
    totalReps: function() {
      return this.reps * this.sets || 0
    },
    time: 0
  })
])

export const addMicrocycle = () => {
  if (microcycles.value.length >= 10) return

  microcycles.value.push(
    reactive({
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
  )
}

export const removeRow = (id) => {
  microcycles.value = microcycles.value.filter((microcycle) => microcycle.id !== id)
}

export const clearAll = () => {
  microcycles.value = [
    reactive({
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
  ]
}