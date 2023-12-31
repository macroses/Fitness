<script setup>
import { LOAD, MULTIPLIER } from '@/components/CustomProgram/constants'
import { addMicrocycle, clearAll, microcycles, removeRow } from '@/components/CustomProgram/composable'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers.js'
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
          @click="clearAll"
        >
          Clear
        </Button>
      </div>
      <Button @click="addMicrocycle">Add more</Button>
      <div class="custom-program__table-wrap">
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
          <TransitionGroup tag="tbody" name="fade" class="tbody-container">
            <tr
              v-for="(microcycle, index) in microcycles"
              :key="microcycle.id"
              class="custom-program__body-row"
            >
              <td class="custom-program__cell">
                <Dropdown
                  :dropdown-list="LOAD"
                  :width="60"
                  small
                  @active-value="microcycle.load = $event"
                />
              </td>
              <td class="custom-program__cell">
                <Input
                  v-model="microcycle.exercise"
                  small
                  no-clear
                />
              </td>
              <td class="custom-program__cell">
                <Dropdown
                  :dropdown-list="MULTIPLIER"
                  :width="50"
                  small
                  @active-value="microcycle.multiplier = $event"
                />
              </td>
              <td class="custom-program__cell">
                <Input
                  type="number"
                  v-model.number="microcycle.weight"
                  small
                  no-clear
                  @keydown="useOnlyNumbers($event)"
                />
              </td>
              <td class="custom-program__cell">
                <Input
                  type="number"
                  v-model.number="microcycle.reps"
                  small
                  no-clear
                  @keydown="useOnlyNumbers($event)"
                />
              </td>
              <td class="custom-program__cell">
                <Input
                  type="number"
                  v-model.number="microcycle.sets"
                  small
                  no-clear
                  @keydown="useOnlyNumbers($event)"
                />
              </td>
              <td class="custom-program__cell">
                <Input
                  type="number"
                  v-model.number="microcycle.percentOfPM"
                  small
                  no-clear
                  @keydown="useOnlyNumbers($event)"
                />
              </td>
              <td class="custom-program__cell">
                <Input
                  type="number"
                  v-model.number="microcycle.time"
                  small
                  style="width: 70px"
                  no-clear
                  @keydown="useOnlyNumbers($event)"
                />
              </td>
              <td
                class="custom-program__cell"
                style="width: 100px"
              >
                {{  microcycle.tonnage() }}
              </td>
              <td
                class="custom-program__cell"
                style="width: 100px"
              >
                {{  microcycle.totalReps() }}
              </td>
              <td
                class="custom-program__cell"
                style="width: 30px"
              >
                <Button
                  v-if="index !== 0"
                  @click="removeRow(microcycle.id)"
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


    </div>
  </section>
</template>

<style scoped src="./style.css" />