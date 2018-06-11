<template>
	<div id="app">
		<h1>Skilltree</h1>
		<SkillTree
    	:skillData="skills"
			v-on:update="updateSkill"
    />
	</div>
</template>

<script>

import SkillTree from './components/SkillTree'

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

	components: {
    SkillTree
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