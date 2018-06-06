<template>
	<div id="app">
		<h1>Skilltree</h1>
		<SkillNode
      v-for="(skill, index) in skills"
      v-bind:skill="skill"
      v-bind:index="index"
      v-bind:key="skill.id"
			v-on:update="updateSkill"
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
		updateSkill(skill) {
			api.updateSkill(
				skill.id,
				skill.name,
				skill.value,
				skill.target
				)
				.then( () => { console.log("Updated skill: " + skill.name) })
				.catch( (error) => { console.log("Update error: " + error) });
		}
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