<script setup>

</script>

<template>
  <div class="group">
    <Button
      @click="$emit('workoutMode')"
    >
      Create workout
    </Button>
    <Button>Program</Button>
    <Button>Body parameters</Button>
  </div>
</template>
