<script setup>
import { onMounted, reactive, ref } from 'vue'
import Alert from '@/components/UI/Alert/Alert.vue'
import Input from '@/components/UI/Input/Input.vue'
import Button from '@/components/UI/Button/Button.vue'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers'
import Radio from '@/components/UI/Radio/Radio.vue'
import GroupInputs from '@/components/UI/GroupInputs/GroupInputs.vue'
import { supabase } from '@/lib/supabaseClient'

const isLoading = ref(false)

const userData = reactive({
  username: null,
  age: null,
  weight: null,
  height: null,
  gender: null,
  level: null,
  updated_at: new Date()
})

const currentSession = ref(null)

const getProfile = async () => {
  try {
    isLoading.value = true
    const { user } = currentSession.value

    const { data, error, status } = await supabase
      .from('profiles')
      .select('username, age, weight, height, gender, level')
      .eq('id', user.id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      userData.username = data.username
      userData.age = data.age
      userData.weight = data.weight
      userData.height = data.height
      userData.gender = data.gender
      userData.level = data.level
    }
  } catch (error) {
    console.log(error.message)
  } finally {
    isLoading.value = false
  }
}

async function updateProfile() {
  try {
    isLoading.value = true
    const { user } = currentSession.value

    const updates = {
      id: user.id,
      updated_at: userData.updated_at,
      username: userData.username,
      age: parseInt(userData.age),
      weight: parseInt(userData.weight),
      height: parseInt(userData.height),
      gender: userData.gender,
      level: userData.level
    }

    const { error } = await supabase.from('profiles').upsert(updates)
    console.log('updated')

    if (error) throw error
  } catch (error) {
    console.log(error.message)
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = () => {
  updateProfile()
}

onMounted(async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  currentSession.value = session

  await getProfile()
})
</script>

<template>
  <div class="account">
    <div class="container">
      <div class="account__layout">
        <div class="account__layout-item">
          <Alert>
            Please provide additional information about yourself. This is necessary for compiling
            <b>statistics</b> and creating <b>training programs</b>.
          </Alert>

          <form
            class="account__user-form"
            @submit.prevent="handleSubmit"
          >
            <Loading
              v-if="isLoading"
              large
            />

            <Input
              label-placeholder="Name"
              v-model="userData.username"
              :value="userData.username"
            />
            <Input
              label-placeholder="Age"
              v-model="userData.age"
              :value="userData.age"
              @keydown="useOnlyNumbers($event)"
            />
            <Input
              label-placeholder="Weight (kg)"
              v-model="userData.weight"
              :value="userData.weight"
              @keydown="useOnlyNumbers($event)"
            />
            <Input
              label-placeholder="Height (cm)"
              v-model="userData.height"
              :value="userData.height"
              @keydown="useOnlyNumbers($event)"
            />
            <GroupInputs>
              <Radio
                name="gender"
                v-model="userData.gender"
                value="Male"
                label="Male"
              />
              <Radio
                name="gender"
                v-model="userData.gender"
                value="Female"
                label="Female"
              />
            </GroupInputs>
            <GroupInputs>
              <Radio
                name="gender"
                v-model="userData.level"
                value="Novice"
                label="Novice"
              />
              <Radio
                name="gender"
                v-model="userData.level"
                value="Advanced"
                label="Advanced"
              />
              <Radio
                name="gender"
                v-model="userData.level"
                value="Professional"
                label="Professional"
              />
            </GroupInputs>
            <Button
              type="submit"
              class="account__user-form-submit"
            >
              Update info
            </Button>
          </form>
        </div>
        <div class="account__layout-item" />
        <div class="account__layout-item" />
        <div class="account__layout-item" />
      </div>
    </div>
  </div>
</template>

<!--Цели тренировки: Позвольте пользователям указать свои цели тренировки, такие как похудение, набор мышечной массы или улучшение выносливости.-->

<!--Уровень физической подготовки: Предложите пользователям выбрать свой текущий уровень физической активности или выполнить оценку для определения подходящей программы тренировок.-->

<!--Типы тренировок: Позвольте пользователям выбирать или указывать предпочтительные типы тренировок, такие как кардио, силовые тренировки или йога.-->

<!--История тренировок: Предоставьте возможность пользователям записывать свою тренировочную историю, включая даты, продолжительность и выполненные упражнения.-->

<!--Прогресс и достижения: Покажите пользователям их прогресс в тренировках, включая данные о повышении силы, уменьшении веса или улучшении физической формы. Также можно предусмотреть систему достижений или бейджей для поощрения пользователей.-->

<!--Питание и калории: Дайте возможность пользователям вводить информацию о своем питании и отслеживать потребление калорий. Это может помочь им контролировать свой рацион и достигать своих целей.-->

<!--Здоровье и медицинская информация: У пользователя может быть возможность указать медицинские особенности или ограничения, чтобы тренер или алгоритмы приложения могли предложить подходящие тренировки и рекомендации.-->

<!--Важно убедиться, что вы соблюдаете соответствующие законы о защите данных и конфиденциальности, а также получаете согласие пользователя перед сбором и использованием их личной информации.-->
