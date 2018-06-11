<template>
	<ul>
		<SkillNode
      v-for="(skill, index) in skillData"
      v-bind:skill="skill"
      v-bind:index="index"
      v-bind:key="skill.id"
			v-on:update="updateSkill"
    />
	</ul>
</template>

<script>
import Vue from 'vue'
import SkillNode from './SkillNode'
Vue.component('SkillNode', SkillNode) // Needed for recursive SkillNodes

export default {
	name: 'skill-tree',
  props: {
    'skillData': Array
  },

	data() {
		return {

		}
	},

	methods: {
		updateSkill(updatedSkill) {
			// Send update messages to parent
      this.$emit('update', updatedSkill);
    },
	},
	components: {
		SkillNode
	}
}
</script>

<style lang="scss">
@import './variables.scss';

</style>