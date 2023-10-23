<script setup>
import programs from '../../content/programs.json'
import { computed, ref } from 'vue'

const isShowAllPrograms = ref(false)
const programsList = ref(null);

const getClassByLevel = computed(() => {
  return programs.map(program => {
    if (program.level === 'beginner') {
      return 'programs-list__item-lvl-beginner';
    } else if (program.level === 'intermediate') {
      return 'programs-list__item-lvl-intermediate';
    } else if (program.level === 'pro') {
      return 'programs-list__item-lvl-pro';
    }
    return '';
  })
})

const toggleProgramList = () => {
  isShowAllPrograms.value = !isShowAllPrograms.value
}
</script>

<template>
  <section class="programs">
    <div class="programs__category">
      <h2 class="programs__category-title">Strength and mass</h2>
      <button
        class="button button--sm button--bordered"
        @click="toggleProgramList"
      >
        Show all
      </button>
    </div>

    <ul
      ref="programsList"
      class="programs-list"
      :class="{ opened: isShowAllPrograms }"
    >
      <li
        v-for="(program, index) in programs"
        :key="program.id"
        class="programs-list__item"
      >
        <h3 class="programs-list__item-title">{{ program.title }}</h3>
        <p
          v-html="program.shortDescription"
          class="programs-list__item-description"
        />
        <div class="programs-list__item-details">
          <div
            class="programs-list__item-lvl"
            :class="getClassByLevel[index]"
          >
            {{ program.level }}
          </div>
          <div class="programs-list__item-repeats">
            <Icon width="15px" icon-name="arrows-repeat"/>
            {{ program.perWeek }} per/week
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped src="./style.css" />

<style>
.programs-list {
  grid-template-columns: repeat(v-bind(programs.length), 300px);

  &.opened {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>