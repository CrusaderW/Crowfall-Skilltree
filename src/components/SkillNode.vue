<template>
  <div class="skill">
    <div class="viewer" v-if="!editMode">
      <h3 @click="toggleEditor(true)">{{ skill.name }}</h3>
      |
      <p>Value: {{ skill.value }}</p>
      |
      <p>Target: {{ skill.target }}</p>
    </div>

    <div class="editor" v-if="editMode">
      <input class="name-editor" 
        type="text"
        v-model="skill.name">
      |
      <input class="value-editor" 
        type="number" min="0" max="100" 
        v-model="skill.value">
      |
      <input class="target-editor" 
        type="number" min="0" max="100" 
        v-model="skill.target">
    </div>
    
    <div class="options">
      <button class="edit-link" @click="toggleEditor(true)">edit</button>
      <button class="save-link" @click="saveSkill(skill)">save</button>
    </div>

    <SkillNode 
      v-for="(childSkill, index) in skill.children"
      v-bind:skill="childSkill"
      v-bind:index="index"
      v-bind:key="childSkill.id"
      v-on:update="saveSkill"
    />
  </div>
</template>

<script>

export default {
  props: {
    'skill': Object
  },

  data() {
    return {
      editMode: false,
    };
  },
  
  methods: {
    toggleEditor(isOn) {
      this.editMode = isOn;
    },
    saveSkill(updatedSkill) {
      this.$emit('update', updatedSkill);
      // Todo: Add async wait for server response
      this.toggleEditor(false);
    }
  },
}

</script>

<style scoped>

  h3, p {
    display: inline-block;
    clear: both;
  }

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