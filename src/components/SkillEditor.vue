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
    <button class="save-link" v-on:click="save()">save</button>
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
      })
    }
  },
}

</script>

<style scoped>

</style>