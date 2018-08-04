<template>
  <div class="skill-viewer">
    <h3 @click="toggleEditor(true)">{{ skill.name }}</h3>
    <progress v-bind:value="skill.value" v-bind:max="skill.target" ></progress>
    <div class="options">
      <button class="edit-link" v-on:click="edit()">edit</button>
      <button class="rem-link" v-on:click="remove()">remove</button>
    </div>
  </div>
</template>

<script>

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
    }
  },
}

</script>

<style scoped>

p {
  display: inline-block;
  clear: both;
}

progress {
  width: 100%;
  margin-bottom: 20px;
}

</style>