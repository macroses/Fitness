<script setup>
import { nextTick, ref } from 'vue'
import { LOAD, MULTIPLIER } from '@/components/CustomProgram/constants'
import { addRow, addTable, removeRow, tables } from '@/components/CustomProgram/composable'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers.js'

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
        <Button
          @click="addRow(tableIndex)"
          :disabled="table.rows.length >= 10"
        >
          Add more
        </Button>
        <table class="custom-program__table">
          <thead class="custom-program__table-head">
            <tr>
              <th class="custom-program__head">Load</th>
              <th class="custom-program__head">Exercise</th>
              <th class="custom-program__head">Multi</th>
              <th class="custom-program__head">Weight</th>
              <th class="custom-program__head">Reps</th>
              <th class="custom-program__head">Sets</th>
              <th class="custom-program__head">% of PM</th>
              <th class="custom-program__head">Time, m</th>
              <th class="custom-program__head">Tonnage, kg</th>
              <th class="custom-program__head">Total reps</th>
              <th
                class="custom-program__head"
                style="width: 41px"
              ></th>
            </tr>
          </thead>
          <TransitionGroup tag="tbody" name="fade" appear>
            <tr
              v-for="(row, rowIndex) in table.rows"
              :key="row.id"
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
          </TransitionGroup>
        </table>
      </div>

      <Button @click="addTable">
        Create a new day microcycle
      </Button>

    </div>
  </section>
</template>

<style scoped src="./style.css" />