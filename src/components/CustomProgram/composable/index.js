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
]);

const addRow = (tableIndex, ref) => {
  if (tables.value[tableIndex].rows.length >= 10) return

  const newRow = createTableRows()
  tables.value[tableIndex].rows.push(newRow)
}

const removeRow = (tableId, rowId) => {
  tables.value[tableId].rows.splice(rowId, 1)
}

const addTable = () => {
  tables.value.push({
    id: uid(10),
    rows: [createTableRows()]
  })
}

const removeTable = tableId => tables.value.splice(tableId, 1)

export {
  tables,
  addRow,
  removeRow,
  addTable,
  removeTable
}
