<template>
  <div class="skill-editor">
    <input class="name-editor" 
      type="text"
      v-model="skill.name">
    |
    <input class="value-editor" 
      type="number" min="0" max="100" 
      v-model="skill.value">
    |
    <input class="target-editor" 
      type="number" min="0" max="100" 
      v-model="skill.target">

    <div class="options">
      <button class="save-link" v-on:click="save()">save</button>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'

export default {
  name: 'skill-editor',
  props: {
    'skill': Object,
  },
  data() {
    return {
    }
  },
  methods: {
    save() {
      this.$emit('save');
    }
  },
}

</script>

<style scoped>

</style>