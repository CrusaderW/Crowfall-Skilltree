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

export default {
  name: 'skill-editor',
  props: {
    skill: {
      type: Object,
      default: function() {
        return {
          'name': 'Skill Name',
          'value': 0, 
          'target': 80,
        }
      },
    }
  },
  data() {
    return {
    }
  },
  methods: {
    save() {
      this.$emit('save', {
        name: this.skill.name,
        value: this.skill.value,
        target: this.skill.target
      })
    }
  },
}

</script>

<style scoped>

</style>