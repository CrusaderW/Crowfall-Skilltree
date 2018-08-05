<template>
  <li class="skill-node">

    <!-- Node info -->
    <div class="node-info">
      <SkillViewer 
        v-if="!editMode"
        v-bind:skill="skill"
        v-on:edit="toggleEditor(true)"
        v-on:update="updateValue"
        v-on:remove="removeSkill"
        v-on:add="createChildSkill"
      />
      <SkillEditor 
        v-if="editMode"
        v-bind:skill="skill"
        v-on:save="saveSkill(skill)"
      />
    </div>

    <!-- Children -->
    <SkillTree
      v-if="hasChildren"
      v-bind:skillData="skill.children"
      v-on:update="notifySkillUpdate"
      v-on:remove="notifySkillRemove"
      v-on:create="notifySkillCreate"
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
  computed: {
    hasChildren() {
      return this.skill.children && this.skill.children.length
    }
  },
  methods: {

    toggleEditor(isOn) {
      this.editMode = isOn
    },

    updateValue(newVal) {
      this.skill.value = newVal
      this.saveSkill(this.skill)
    },

    saveSkill(updatedSkill) {
      this.$emit('update', updatedSkill);
      // Todo: Add async wait for server response
      this.toggleEditor(false)
    },

    createChildSkill() {
      let newSkillInfo = {
        name: "New Skill",
        value: 0,
        target: 80,
        parent: this.skill,
        children: []
      }
      this.$emit('create', newSkillInfo);
    },

    removeSkill() {
      this.$emit('remove', this.skill)
    },

    notifySkillCreate(info) {
      this.$emit('create', info)
    },

    notifySkillUpdate(skill) {
      this.$emit('update', skill)
    },

    notifySkillRemove(remSkill) {
      if (!remSkill.parent)
        // Take ownership of child skill
        remSkill.parent = this.skill

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