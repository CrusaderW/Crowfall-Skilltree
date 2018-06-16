<template>
  <div id="app">
    <h1>Skilltree</h1>
    <SkillTree
      v-bind:skillData="root.children"
      v-on:update="updateSkill"
      v-on:create="createSkill"
      v-on:remove="removeSkill"
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
      root: {
        children: [],
      }
    }
  },
  created() {
    // Once created, fetch skills
    api.fetchSkills()
    .then(skills => {
      this.root.children = skills
    })
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
      .catch( (error) => { console.log("Update error: " + error) })
    },
    
    createSkill(skill) {
      // Call API to create skill
      api.createSkill(
        skill.name,
        skill.value,
        skill.target
      )
      .then( (newSkill) => { 
        // Add new skill to data
        this.root.children.push(newSkill)
      })
      .catch( (error) => { console.log("Create error: " + error) })
    },

    removeSkill(skill) {
      // Call API to delete skill 
      api.deleteSkill(skill.id).then( () => {
        // Remove skill from data
        let parent = this.findParentOf(skill.id)
        parent.children = parent.children.filter(child => !(child.id == skill.id)) // Filter out deleted skill
      })
    },

    findSkill(id) {
      // Recursive skill finder
      let recursiveFind = function(skill, queryId) {
        if (skill.id == id)
          return skill

        if (skill.children && skill.children.length > 0) {
          for (let i = 0; i < skills.chilren.length; i++) 
            return recursiveFind(skills.children[i], queryId)
        }
      }

      // Use recursive finder on all root skills
      for (let i = 0; i < this.root.children.length; i++) {
        let skill = this.root.children[i]
        return recursiveFind(skill, id)
      }
    },

    findParentOf(skillId) {
      // Recursive parent finder
      let recursiveFindParent = function(parent, queryId) {
        for (let i = 0; i < parent.children.length; i++) {
          let child = parent.children[i]
          if (child.id == queryId) 
            return parent; // given node is parent
          else {
            if (child.chilren) {
              for (let j = 0; j < child.children.length; j++) {
                let grandchild = child.chilren[j]
                if (grandchild.id == queryId) {
                  return child
                }
              }
            }
          }
        }
      }

      // Use recursive parent finder on tree root
      return recursiveFindParent(this.root, skillId)
    },

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
  color: $default-blue;
}

</style>