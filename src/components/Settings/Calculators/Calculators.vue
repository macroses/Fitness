<script setup>
import {
  averageOneRepMax,
  liftedWeight,
  oneRepMaxBrzycki,
  oneRepMaxEpley,
  oneRepMaxLander,
  repeats
} from '@/components/Settings/Calculators/utility/maxWeight'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers.js'
import Accordion from '@/components/UI/Accordion/Accordion.vue'
</script>

<template>
  <div class="settings__content-item">
    <div class="settings__content-subject">
      <Accordion>
        <template #accordion-header>
          Maximum weight for 1 rep Calculation
        </template>
        <template #accordion-body>
          <GroupInputs>
            <Input
              type="number"
              v-model="liftedWeight"
              @clear="liftedWeight = 100"
              label-placeholder="Weight"
              @keydown="useOnlyNumbers($event)"
            />
            <Input
              type="number"
              v-model="repeats"
              @clear="repeats = 10"
              label-placeholder="Repeats"
              @keydown="useOnlyNumbers($event)"
            />
          </GroupInputs>

          <!--          {{ oneRepMaxBrzycki.toFixed(0) }}-->
          <!--          {{ oneRepMaxEpley.toFixed(0) }}-->
          <!--          {{ oneRepMaxLander.toFixed(0) }}-->
          <!--          {{ averageOneRepMax.toFixed(0) }}-->

          <div class="settings__content-result">
            <p class="settings__content-result-label">
              Brzycki formula: <span>{{ oneRepMaxBrzycki.toFixed(0) }}kg</span>
            </p>
            <p class="settings__content-result-label">
              Epley formula: <span>{{ oneRepMaxEpley.toFixed(0) }}kg</span>
            </p>
            <p class="settings__content-result-label">
              Lander formula: <span>{{ oneRepMaxLander.toFixed(0) }}kg</span>
            </p>
            <p class="settings__content-result-label">
              Average: <span>{{ averageOneRepMax.toFixed(0) }}kg</span>
            </p>
          </div>
        </template>
      </Accordion>
      <Accordion>
        <template #accordion-header> Weight for N reps Calculation </template>
        <template #accordion-body> lololo </template>
      </Accordion>
    </div>
  </div>
</template>

<style scoped src="./style.css" />
