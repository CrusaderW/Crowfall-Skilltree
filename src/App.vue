<template>
	<div id="app">
		<h1>Skilltree</h1>
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

	data() {
    return {
      skills: [],
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

	},
}
</script>

<style lang="scss">
@import './variables.scss';

h1 {
  margin: 1em;
}

#app {
  font-family: "Trebuchet MS", Helvetica, Arial, sans-serif;
  color: $vue-blue;
}

</style>