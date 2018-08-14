<template>
  <li class="skill-node">

    <!-- Node info -->
    <div class="node-info">
      <!-- Title -->
      <h3 v-if="!editMode" v-on:click="toggleEditor(true)">
        {{ skill.name }}
        <button v-on:click="toggleEditor(on)">edit</button>
      </h3>

      <!-- Edit form -->
      <SkillEditor 
        v-if="editMode"
        v-bind:skill="skill"
        v-on:save="submitUpdate"
      />

      <!-- Progress display -->
      <SkillProgress 
        v-bind:value="value"
        v-bind:max="skill.target"
        v-on:update="submitUpdate"
      />

      <!-- Delete button -->
      <button class="btn-delete" v-on:click="removeSkill">X</button>
      <!-- Add child button -->
      <button class="btn-add" v-on:click="createChildSkill">+</button>
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
import SkillEditor from './SkillEditor'
import SkillProgress from './SkillProgress'

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
    },
    value() {
      return this.calculateValue()
    }
  },
  watch: {
    value(val) {
      this.submitUpdate({
        value: val
      })
    }
  },
  methods: {

    toggleEditor(isOn) {
      this.editMode = isOn
    },

    calculateValue() {
      if (this.hasChildren) {
        let sum = 0
        for (let i = 0; i < this.skill.children.length; i++) 
          sum += this.skill.children[i].value
        return sum / this.skill.children.length
      }
      else 
        return this.skill.value
    },

    submitUpdate(newData) {
      newData.name = newData.name || this.skill.name
      newData.value = newData.value || this.skill.value

      this.$emit('update', {
        skill: this.skill,
        updates: newData
      })

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
      if (confirm('Are you sure you want to delete the skill "' + this.skill.name + '" ?')) 
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
    SkillEditor,
    SkillProgress,
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

.btn-delete {
  position: absolute;
  top: 0;
  right: 0;
  margin: 25px;
}

</style>