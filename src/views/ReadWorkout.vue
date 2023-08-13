<script setup>
import { computed } from 'vue'
import { useEventsStore } from '@/stores/userEvents'

const userEvents = useEventsStore()
// Что должно быть в чтении тренировки
// 1. График тоннажа, где на каждое упражнение указана процентовка от общего тоннажа
// 2. На каждое упражнение построить график с ростом предыдущих результатов
// 3. попробовать выстроить тенденции по росту/спаду весов.
// 4. График интенсивности. Для этого надо написать таймеры в тренировках, чтобы их запускать
// и записывать интервалы в сеты, а затем в тренировки. Тогда можно будет построить зависимость интенсивности
// 5. Изходя из поднимаемых весов, попробовать вычислить примерный одноповторный максимум - отобразить на графике

const props = defineProps(['id'])

const workout = computed(() => {
  return userEvents.events.filter(event => event.workoutId === props.id)
})
</script>

<template>
<div class="read-workout">
  <div class='container'>{{ workout }}</div>
</div>
</template>
