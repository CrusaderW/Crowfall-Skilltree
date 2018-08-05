<template>
  <div class="skill-viewer">
    <h3 @click="toggleEditor(true)">{{ skill.name }}</h3>

    <SkillProgress 
      v-bind:value="skill.value"
      v-bind:max="skill.target"
      v-on:update="update"
    />

    <div class="options">
      <button class="edit-link" v-on:click="edit()">edit</button>
      <button class="rem-link" v-on:click="remove()">remove</button>
      <button class="rem-link" v-on:click="add()">+</button>
    </div>
  </div>
</template>

<script>
import SkillProgress from './SkillProgress'

export default {
  name: 'skill-viewer',
  props: {
    'skill': Object,
  },
  data() {
    return {
    }
  },
  methods: {
    edit() {
      this.$emit('edit')
    },
    add() {
      this.$emit('add')
    },
    remove() {
      this.$emit('remove')
    },
    update(newVal) {
      this.$emit('update', newVal)
    }
  },
  components: {
    SkillProgress,
  },
}

</script>

<style scoped>

p {
  display: inline-block;
  clear: both;
}

</style>