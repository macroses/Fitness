<script setup>
const load = [
  { id: 1, value: 'Low' },
  { id: 2, value: 'Mid'},
  { id: 3, value: 'High' }
]
</script>

<template>
  <div class="custom-program">
    <div class="custom-program__table">
      <div class="custom-program__row">
        <div class="custom-program__cell">
          <div class="custom-program__content">
            <Dropdown
              :dropdown-list="load"
              :width="60"
              small
            />
          </div>
        </div>
        <div class="custom-program__cell">
          <div class="custom-program__content">
            <Input
              label-placeholder="Exercise"
              label-fade
              small
            />
          </div>
        </div>
        <div class="custom-program__cell">
          <div class="custom-program__content">
            <Input label-placeholder="Exercise"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./style.css" />