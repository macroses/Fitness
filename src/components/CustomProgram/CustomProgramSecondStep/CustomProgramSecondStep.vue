<script setup>
import { tables } from '@/components/CustomProgram/composable'
import { HEADERS } from '@/components/CustomProgram/constants'
</script>

<template>
  <div class="custom-program__second-step second-step">
    <div class="second-step__functions"></div>

<!--    {{ tables }}-->
    <div
      v-for="table in tables"
      :key="table.id"
      class="second-step__table-wrapper"
    >
      <table class="second-step__table">
        <thead>
          <tr>
            <th
              v-for="(head, headIndex) in HEADERS"
              :key="headIndex"
            >
<!--              <Icon-->
<!--                v-if="head.icon"-->
<!--                :icon-name="head.icon"-->
<!--                width="20px"-->
<!--              />-->
<!--              <span v-else>{{ head.value }}</span>-->
              {{ head.value }}
            </th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="row in table.rows" :key="row.id">
          <td>{{ row.load.value }}</td>
          <td>{{ row.exercise }}</td>
          <td>{{ row.multiplier.value }}</td>
          <td>{{ row.weight }}</td>
          <td>{{ row.reps }}</td>
          <td>6</td>
          <td>7</td>
          <td>8</td>
          <td>9</td>
          <td>10</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<style src="./style.css" />