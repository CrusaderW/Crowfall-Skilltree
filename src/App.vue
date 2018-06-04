<template>
  <div id="skilltree-app">
    <h1>Skilltree</h1>
    <!-- Start tree! -->
    <SkillNode
      v-for="(skill, index) in skills"
      v-bind:skill="skill"
      v-bind:index="index"
      v-bind:key="skill.id"
    />
  </div>
</template>

<script>

let api = require('./api.js') // Apparently `import` is forbidden here

export default {
  name: 'skilltree-app',

  components: {
  },

  data() {
    return {
      skills: []
    }
  },

  // Once created, fetch skills
  created() {
    api.fetchSkills()
    .then(skills => {
      this.skills = skills;
    });
  },

  methods: {
  }
}
</script>

<style>

h1 {
  margin: 1em;
}

#skilltree-app {
  font-family: "Trebuchet MS", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

</style>
