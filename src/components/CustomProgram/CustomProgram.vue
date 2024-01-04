<script setup>
import { nextTick, ref } from 'vue'
import { LOAD, MULTIPLIER } from '@/components/CustomProgram/constants'
import { addRow, addTable, removeRow, tables } from '@/components/CustomProgram/composable'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers.js'

const headers = [
  { value: 'Load' },
  { value: 'Exercise' },
  { value: 'Multi' },
  { value: 'Weight' },
  { value: 'Reps' },
  { value: 'Sets' },
  { value: '% of PM' },
  { value: 'Time, m' },
  { value: 'Tonnage, kg' },
  { value: 'Total reps' },
  { value: '', width: '40px'}
]

const tableRow = ref(null)
const editingCellIndex = ref(null)

const startEditing = (event, row, columnIndex) => {
  row.editing = true
  editingCellIndex.value = columnIndex

  nextTick(() => {
    const inputElement = event.currentTarget.querySelector(`td:nth-child(${columnIndex + 1}) input`)
    if (inputElement) {
      inputElement.focus()
    }
  })
}

const stopEditing = (row) => {
  row.editing = false
  editingCellIndex.value = null
}

const removeDayTable = (tableId) => {
  tables.value = tables.value.filter(table => table.id !== tableId)
}
</script>

<template>
  <section class="custom-program">
    <div class="custom-program__micro">
      <div class="custom-program__micro-top">
        <h1 class="custom-program__micro-header">
          Creating a microcycle
          <Icon
            icon-name="circle-question"
            width="20px"
          />
        </h1>
        <Button
          bordered
          size="small"
        >
          Clear
        </Button>
      </div>

      <div
        v-for="(table, tableIndex) in tables"
        :key="table.id"
        class="custom-program__table-wrap"
      >
        <table class="custom-program__table">
          <thead class="custom-program__table-head">
            <tr>
              <th
                v-for="(header, headerIndex) in headers"
                :key="headerIndex"
                class="custom-program__head"
                :style="{ width: header?.width }"
              >
                {{ header.value }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, rowIndex) in table.rows"
              :key="row.id"
              ref="tableRow"
              class="custom-program__body-row"
            >
              <td
                class="custom-program__cell"
                tabindex="1"
              >
                <Dropdown
                  :dropdown-list="LOAD"
                  :width="60"
                  small
                  @active-value="row.load = $event"
                />
              </td>
              <td
                tabindex="1"
                class="custom-program__cell"
                @click="startEditing($event, row, 1)"
              >
                <span v-if="!row.editing || editingCellIndex !== 1">
                  {{ row.exercise }}
                </span>
                <Input
                  v-else
                  v-model="row.exercise"
                  small
                  no-clear
                  @keydown.enter="stopEditing(row)"
                  @blur="stopEditing(row)"
                />
              </td>
              <td class="custom-program__cell">
                <Dropdown
                  :dropdown-list="MULTIPLIER"
                  :width="50"
                  small
                  @active-value="row.multiplier = $event"
                />
              </td>
              <td
                class="custom-program__cell"
                @click="startEditing($event, row, 3)"
              >
                <span v-if="!row.editing || editingCellIndex !== 3">
                  {{ row.weight }}
                </span>
                <Input
                  v-else
                  type="number"
                  v-model.number="row.weight"
                  small
                  no-clear
                  @keydown="useOnlyNumbers($event)"
                  @keydown.enter="stopEditing(row)"
                  @blur="stopEditing(row)"
                />
              </td>
              <td
                class="custom-program__cell"
                @click="startEditing($event, row, 4)"
              >
                <span v-if="!row.editing || editingCellIndex !== 4">
                  {{ row.reps }}
                </span>
                <Input
                  v-else
                  type="number"
                  v-model.number="row.reps"
                  small
                  no-clear
                  @keydown="useOnlyNumbers($event)"
                  @keydown.enter="stopEditing(row)"
                  @blur="stopEditing(row)"
                />
              </td>
              <td
                class="custom-program__cell"
                @click="startEditing($event, row, 5)"
              >
                <span v-if="!row.editing || editingCellIndex !== 5">
                  {{ row.sets }}
                </span>
                <Input
                  v-else
                  type="number"
                  v-model.number="row.sets"
                  small
                  no-clear
                  @keydown="useOnlyNumbers($event)"
                  @keydown.enter="stopEditing(row)"
                  @blur="stopEditing(row)"
                />
              </td>
              <td
                class="custom-program__cell"
                @click="startEditing($event, row, 6)"
              >
                <span v-if="!row.editing || editingCellIndex !== 6">
                  {{ row.percentOfPM }}
                </span>
                <Input
                  v-else
                  type="number"
                  v-model.number="row.percentOfPM"
                  small
                  no-clear
                  @keydown="useOnlyNumbers($event)"
                  @keydown.enter="stopEditing(row)"
                  @blur="stopEditing(row)"
                />
              </td>
              <td
                class="custom-program__cell"
                @click="startEditing($event, row, 7)"
              >
                <span v-if="!row.editing || editingCellIndex !== 7">
                  {{ row.time }}
                </span>
                <Input
                  v-else
                  type="number"
                  v-model.number="row.time"
                  small
                  style="width: 70px"
                  no-clear
                  @keydown="useOnlyNumbers($event)"
                  @keydown.enter="stopEditing(row)"
                  @blur="stopEditing(row)"
                />
              </td>
              <td
                class="custom-program__cell"
                style="width: 100px"
              >
                {{  row.tonnage() }}
              </td>
              <td
                class="custom-program__cell"
                style="width: 100px"
              >
                {{  row.totalReps() }}
              </td>
              <td
                class="custom-program__cell"
                style="width: 30px"
              >
                <Button
                  v-if="rowIndex !== 0"
                  @click="removeRow(tableIndex, rowIndex)"
                  transparent
                  size="small"
                >
                  <Icon
                    icon-name="trash"
                    width="13px"
                  />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="custom-program__table-footer">
          <Button
            @click="addRow(tableIndex, tableRow)"
            :disabled="table.rows.length >= 10"
            size="small"
          >
            Add exercise
          </Button>
          <Button
            bordered
            @click="removeDayTable(table.id)"
            size="small"
          >
            Delete day
          </Button>
        </div>
      </div>

      <Button @click="addTable">
        Create a new day microcycle
      </Button>

    </div>
  </section>
</template>

<style scoped src="./style.css" />