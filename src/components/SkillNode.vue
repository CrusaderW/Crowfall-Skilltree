<template>
  <li class="skill">

    <div class="viewer" v-if="!editMode">
      <SkillViewer
        v-bind:skill="skill"
        v-on:edit="toggleEditor(true)"
        v-on:remove="removeSkill(skill)"
      />
    </div>

    <div class="editor" v-if="editMode">
      <SkillEditor
        v-bind:skill="skill"
        v-on:save="saveSkill(skill)"
       />
    </div>
    
    <ul v-if="skill.children && skill.children.length">
      <SkillNode 
        v-for="(childSkill, index) in skill.children"
        v-bind:skill="childSkill"
        v-bind:index="index"
        v-bind:key="childSkill.id"
        v-on:update="saveSkill"
      />
    </ul>

  </li>
</template>

<script>

import Vue from 'vue'
import SkillNode from './SkillNode' // for dynamic node creation
import SkillViewer from './SkillViewer'
import SkillEditor from './SkillEditor'

export default {
  name: 'skill-node',
  props: {
    'skill': Object
  },

  data() {
    return {
      editMode: false,
    }
  },
  
  methods: {
    toggleEditor(isOn) {
      this.editMode = isOn;
    },
    saveSkill(updatedSkill) {
      this.$emit('update', updatedSkill);
      // Todo: Add async wait for server response
      this.toggleEditor(false);
    },
    removeSkill(remSkill) {
      this.$emit('remove', remSkill)
    },
  },

  components: {
    SkillViewer,
    SkillEditor,
  },
}

</script>

<style scoped>

  .skill {
    display: block;
    min-width: 200px;
    border: 1px dashed;
    border-left: 5px solid;
    padding: 20px;
    margin: 20px;
    margin-left: 40px;
    overflow: auto;
  }

  .options {
    font-size: 1em;
    width: 100%;
  }

</style>