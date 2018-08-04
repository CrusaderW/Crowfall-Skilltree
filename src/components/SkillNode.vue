<template>
  <li class="skill-node">

    <!-- Node info -->
    <div class="node-info">
      <SkillViewer 
        v-if="!editMode"
        v-bind:skill="skill"
        v-on:edit="toggleEditor(true)"
        v-on:remove="notifySkillRemove(skill)"
      />
      <SkillEditor 
        v-if="editMode"
        v-bind:skill="skill"
        v-on:save="saveSkill(skill)"
      />
    </div>

    <!-- Children -->
    <SkillTree
      v-if="skill.children && skill.children.length"
      v-bind:skillData="skill.children"
      v-on:update="notifySkillUpdate"
      v-on:remove="notifySkillRemove"
      v-on:create="createSkill"
    />

  </li>
</template>

<script>
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
      this.editMode = isOn
    },

    saveSkill(updatedSkill) {
      this.$emit('update', updatedSkill);
      // Todo: Add async wait for server response
      this.toggleEditor(false)
    },

    createSkill(info) {
      if (!info.parent) {
        // Claim this new skill as a child
        info.parent = this.skill
      }

      this.$emit('create', info)
    },

    notifySkillUpdate(skill) {
      this.$emit('update', skill)
    },

    notifySkillRemove(remSkill) {
      this.$emit('remove', remSkill)
    },

  },
  components: {
    SkillViewer,
    SkillEditor,
    // SkillTree inherited
  },
}

</script>

<style scoped>

.skill-node {
  flex: 0 0 auto;
  display: block;
  min-width: 200px;
  padding: 20px;
  margin: 20px 0;  
  overflow: auto;
  position: relative;
}

.node-info {
  background-color: #FFFFFF;
  display: block;
  padding: 20px;
  border: 1px solid #000000;
  box-shadow: 5px 5px #000000;
}

.options {
  font-size: 1em;
  width: 100%;
}
</style>