<template>
	<div>
		<ul ref="nodeList">
			<SkillNode
				v-for="(skill, index) in skillData"
				v-bind:skill="skill"
				v-bind:index="index"
				v-bind:key="skill.id"
				v-on:update="updateSkill"
				v-on:remove="removeSkill"
			/>
		</ul>
		<button class="add-link" v-on:click="createSkill()">+</button>
	</div>
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
		removeSkill(remSkill) {
			this.$emit('remove', remSkill)
		},
		createSkill() {
      // Ok we're going to create a temporary "form" node
      var NodeClass = Vue.extend(SkillNode) // extend SkillNode
      var newNode = new NodeClass({
        propsData: { 
          skill: {
            name: 'Skill Name',
            value: 0,
            target: 80,
          }
        }
      })
      // Handle form submission
      newNode.$on('update', (skillData) => {
        // Emit create event
        this.$emit('create', skillData) 
        // Get rid of this temporary form node
        newNode.$el.remove()
        newNode.$destroy()
      })
      newNode.$mount()
      // Set it to "edit mode"
      newNode.toggleEditor(true)
      // Put form onto DOM
      this.$refs.nodeList.appendChild(newNode.$el)
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