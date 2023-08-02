<script setup>
import { computed, ref, watch } from 'vue'
import { workoutStore } from '@/stores/workout'
import { uid } from 'uid'
import Icon from '@/components/UI/Icon/Icon.vue'

const store = workoutStore()
const activeExerciseId = ref(null)
const supersetExercises = ref([])

const toggleParameters = id => {
  activeExerciseId.value === id
    ? activeExerciseId.value = null
    : activeExerciseId.value = id

  store.effort = 0
  store.weight = null
  store.repeats = null

  store.openedExerciseId = activeExerciseId.value
}

const handleCheckbox = (exerciseId, isChecked) => {
  if (isChecked) {
    if (!supersetExercises.value.some(ex => ex.id === exerciseId)) {
      supersetExercises.value.push(exerciseId)
    }
  } else {
    supersetExercises.value = supersetExercises.value.filter(exId => exId !== exerciseId)
  }
}

const handleMerge = () => {
  if (supersetExercises.value.length < 2) return

  const uidValue = uid(7);

  store.exercisesParamsCollection.forEach(exercise => {
    if (supersetExercises.value.includes(exercise.exerciseId)) {
      exercise.superset = uidValue;
    }
  })

  supersetExercises.value = []
  store.isSuperset = false
}

const filteredCacheExercises = computed(() => {
  const cache = JSON.parse(sessionStorage.getItem('exercisesCache'))
  return cache.filter(sessionExercise => store.exercisesParamsCollection.some(exercise => {
    return (sessionExercise.id === exercise.exerciseId) && !exercise.hasOwnProperty('superset')
  }))
})


const supersetsArray = computed(() => {
  const exercises = JSON.parse(JSON.stringify(store.exercisesParamsCollection));
  const cache = JSON.parse(sessionStorage.getItem('exercisesCache'));

  return exercises.reduce((supersetGroups, exercise) => {
    const superset = exercise.superset;
    if (superset) {
      const cachedExercise = cache.find(sessionExercise => sessionExercise.id === exercise.exerciseId);

      if (cachedExercise) {
        const cachedExerciseCopy = { ...cachedExercise, superset };
        const groupIndex = supersetGroups.findIndex(group => group.superset === superset);

        groupIndex !== -1
          ? supersetGroups[groupIndex].exercises.push(cachedExerciseCopy)
          : supersetGroups.push({ superset, exercises: [cachedExerciseCopy] });
      }
    }

    return supersetGroups;
  }, []);
});

const handleSplit = supersetId => {
  const exercisesToUpdate = store.exercisesParamsCollection.filter(exercise => exercise.superset === supersetId);

  exercisesToUpdate.forEach(exercise => {
    delete exercise.superset;
  });
}

watch(() => store.isSuperset, value => {
  if (value) activeExerciseId.value = null
  else supersetExercises.value = []
})
</script>

<template>
  <div class='chosen-exercises__wrap'>
    <div
      v-for="group in supersetsArray"
      :key="group.superset"
      class='chosen-exercises__supersets'
      :class="{ 'superset-mode': store.isSuperset }"
    >
      <span class='superset-legend'>Superset</span>
      <Button @click="handleSplit(group.superset)" class="btn-split">
        <Icon icon-name="split" width='18px'/>
      </Button>
      <ul>
        <li
          v-for="element in group.exercises"
          :key="element.id"
          class="chosen-exercises__item"
        >
          <div
            class="chosen-exercises__item-top"
            :class="{
            active: activeExerciseId === element.id,
            superset: store.isSuperset,
          }"
          >
            <div
              class="chosen-exercises__item-header"
              :class="{ disabledExercise: store.isSuperset }"
              @click="toggleParameters(element.id)"
            >
              <div
                class="collapse__icon"
                v-if="!store.isSuperset"
              />
              <div class="chosen-exercises__item-name">
                {{ element.name }}
              </div>
            </div>
          </div>
          <TransitionSlideY>
            <SetExerciseForm
              v-if="activeExerciseId === element.id"
              :exercise-id="element.id"
            />
          </TransitionSlideY>
        </li>
      </ul>
    </div>

    <div class='chosen-exercises__filtered'>
      <Button v-if="store.isSuperset" @click="handleMerge" class="btn-merge">
        <Icon icon-name="merge" width='18px'/>
      </Button>
      <TransitionGroup
        tag="ul"
        name="fade"
        class="chosen-exercises"
        :class="{ 'superset-mode': store.isSuperset }"
      >
        <li
          v-for="element in filteredCacheExercises"
          :key="element.id"
          class="chosen-exercises__item"
          tabindex="0"
        >
          <div
            class="chosen-exercises__item-top"
            :class="{
              active: activeExerciseId === element.id,
              superset: store.isSuperset,
            }"
          >
            <Checkbox
              v-if="store.isSuperset"
              :model-value="supersetExercises.includes(element.id)"
              @update:modelValue="value => handleCheckbox(element.id, value)"
            />
            <div
              class="chosen-exercises__item-header"
              :class="{ disabledExercise: store.isSuperset }"
              @click="toggleParameters(element.id)"
            >
              <div
                class="collapse__icon"
                v-if="!store.isSuperset"
              />
              <div class="chosen-exercises__item-name">
                {{ element.name }}
              </div>
              <div v-if="!store.isSuperset" class="chosen-exercises__item-tonnage">
                {{ store.getSetTonnage(element.id) / 1000 }} T
              </div>
              <button
                v-if="!store.isSuperset"
                @click="store.deleteExercise(element.id)"
                class="chosen-exercises__delete"
              />
            </div>
          </div>
          <TransitionSlideY>
            <SetExerciseForm
              v-if="activeExerciseId === element.id"
              :exercise-id="element.id"
            />
          </TransitionSlideY>
        </li>
      </TransitionGroup>
    </div>
  </div>

  <div
    v-if="!store.exercisesParamsCollection.length"
    class="chosen-exercises__empty"
  >
    <div class="chosen-exercises__img-wr">
      <img
        src="/Folder.svg"
        alt="add exercises"
        width="100"
        height="100"
      >
    </div>
    <span>Add exercises</span>
  </div>
</template>

<style src="./style.css" />
