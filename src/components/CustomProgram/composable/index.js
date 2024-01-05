import { reactive, ref } from 'vue'
import { uid } from 'uid'
import { gsap } from 'gsap'
import { LOAD, MULTIPLIER } from '@/components/CustomProgram/constants/index.js'
import { CSSPlugin } from 'gsap/CSSPlugin'

gsap.registerPlugin(CSSPlugin)

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
      if (this.multiplier.value === 'x2') {
        return this.weight * this.reps * this.sets * 2 || 0
      }

      return this.weight * this.reps * this.sets || 0
    },
    totalReps: function() {
      return this.reps * this.sets || 0
    },
    time: 0
  })
}


const tables = ref([
  {
    id: uid(10),
    rows: [createTableRows()]
  }
])

const addRow = (tableIndex) => {
  if (tables.value[tableIndex].rows.length >= 5) return

  tables.value[tableIndex].rows.push(createTableRows())
}

const removeRow = (tableId, rowId) => {
  if (tables.value[tableId].rows.length <= 2) {
    removeDayTable(tableId)

    return
  }

  tables.value[tableId].rows.splice(rowId, 1)
}

const addTable = () => {
  if (tables.value.length >= 7) return

  tables.value.push({
    id: uid(10),
    rows: [createTableRows()]
  })
}

const removeDayTable = (tableId) => {
  tables.value = tables.value.filter(table => table.id !== tableId)
}


export {
  tables,
  addRow,
  removeRow,
  addTable,
  removeDayTable
}
