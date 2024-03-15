import { computed, reactive, ref, watch } from 'vue'
import { uid } from 'uid'
import { musclesGroups } from '@/constants/MUSCLES'
import { toast } from 'vue3-toastify'
import { userExercisesStore } from '@/stores/userExercises'

export function useExercise() {
  const userExercises = userExercisesStore()
  const isCreateExerciseVisible = ref(false)

  const newExercise = reactive({
    id: uid(10),
    name: '',
    helpers: [],
    type: 'Compound',
    main_muscle: [],
    equip: '',
    load_type: 'strength',
    level: 'Beginner',
    description: '',
    force_type: null
  })

  const isLoading = ref(false)
  const musclesGroupsList = ref(JSON.parse(JSON.stringify(musclesGroups)))
  const helpersGroupsList = ref(JSON.parse(JSON.stringify(musclesGroups)))

  const addMainMuscleGroup = muscle => {
    musclesGroupsList.value.forEach(item => (item.selected = false))

    newExercise.main_muscle = []
    newExercise.main_muscle.push(muscle)
    muscle.selected = true
  }

  const addHelpersMuscleGroup = muscle => {
    muscle.selected = true
    newExercise.helpers.push(muscle)
  }

  const removeHelpersMuscleGroup = muscle => {
    muscle.selected = false
    newExercise.helpers = newExercise.helpers.filter(
      item => item.id !== muscle.id
    )
  }

  const isCreateAvailable = computed(() => {
    return newExercise.name.length > 0 && newExercise.main_muscle.length > 0
  })

  const sendNewExercise = () => {
    userExercises.pushExerciseToBase(isLoading, newExercise)
    resetNewExercise()
    toast.success('Exercise created')
  }

  const resetNewExercise = () => {
    newExercise.name = ''
    newExercise.helpers = []
    newExercise.type = 'Compound'
    newExercise.main_muscle = []
    newExercise.equip = ''
    newExercise.load_type = 'strength'
    newExercise.level = 'Beginner'
    newExercise.description = ''
    newExercise.force_type = null

    musclesGroupsList.value = JSON.parse(JSON.stringify(musclesGroups))
    helpersGroupsList.value = JSON.parse(JSON.stringify(musclesGroups))
  }

  watch(() => newExercise.type, val => {
      if (val === 'Isolation') {
        helpersGroupsList.value.forEach(item => (item.selected = false))
        newExercise.helpers = []
      }
    }
  )

  watch(() => isCreateExerciseVisible.value, val => {
      if (!val) resetNewExercise()
    }
  )

  return {
    isCreateExerciseVisible,
    newExercise,
    isLoading,
    musclesGroupsList,
    helpersGroupsList,
    addMainMuscleGroup,
    addHelpersMuscleGroup,
    removeHelpersMuscleGroup,
    isCreateAvailable,
    sendNewExercise
  }
}