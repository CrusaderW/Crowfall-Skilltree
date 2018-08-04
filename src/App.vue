<template>
  <div class="tree" id="skilltree-app">
    <div class="header">
      <h1>Skilltree</h1>
      <h2>(IRL Progress Tracking)</h2>
    </div>
    <SkillTree
      class="skill-tree-root"
      v-bind:skillData="root.children"
      v-on:update="updateSkill"
      v-on:create="createSkill"
      v-on:remove="removeSkill"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import SkillTree from './components/SkillTree.vue'
Vue.component('SkillTree', SkillTree) // Needed for recursive SkillTrees

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
    
    createSkill(info) {
      // Call API to create skill
      api.createSkill(info).then( (newSkill) => { 
        // Find parent
        let parent = this.root
        if (info.parent) // Reference `info` until API supports `parent` attributes
          parent = this.findSkill(info.parent.id)

        // Add new skill to data
        parent.children.push(newSkill)
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
          for (let i = 0; i < skill.children.length; i++) {
            let result = recursiveFind(skill.children[i], queryId)
            if (result)
              return result
          }
        }
      }

      // Use recursive finder on tree root
      return recursiveFind(this.root, id)
    },

    findParentOf(skillId) {
      // Recursive parent finder
      let recursiveFindParent = function(parent, queryId) {
        for (let i = 0; i < parent.children.length; i++) {
          let child = parent.children[i]
          if (child.id == queryId) 
            return parent; // given node is parent
          else {
            if (child.children) {
              for (let j = 0; j < child.children.length; j++) {
                let grandchild = child.children[j]
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
@import './assets/tree.css';
@import './assets/theme.css';

#skilltree-app {
  font-family: "Trebuchet MS", Helvetica, Arial, sans-serif;
  color: $default-blue;
}

.header {
  text-align: center;
}

.header h1 {
  font-size: 75px;
  margin-top: 1em;
  margin-bottom: 0.2em;
}

.header h2 {
  font-style: italic;
}

</style>