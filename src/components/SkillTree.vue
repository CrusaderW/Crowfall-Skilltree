<template>
  <div class="skill-tree">

    <ul class="skill-tree-list" ref="nodeList">
      <SkillNode
        v-for="(skill, index) in skillData"
        v-bind:skill="skill"
        v-bind:index="index"
        v-bind:key="skill.id"
        v-on:update="notifySkillUpdate"
        v-on:remove="notifySkillRemove"
        v-on:create="notifySkillCreated"
      />
    </ul>

    <button v-if="!createMode" class="add-link" v-on:click="toggleCreate(true)">+ Add Skill</button>

    <SkillEditor 
      v-if="createMode"
      v-on:save="createNewSkill"
    />
    
  </div>
</template>

<script>
import SkillEditor from './SkillEditor'
import SkillNode from './SkillNode'

export default {
  name: 'skill-tree',
  props: {
    'skillData': Array
  },
  data() {
    return {
      createMode: false,
    }
  },
  methods: {

    toggleCreate(on) {
      this.createMode = on
    },

    notifySkillUpdate(updatedSkill) {
      // Send update messages to parent
      this.$emit('update', updatedSkill)
    },

    notifySkillRemove(remSkill) {
      this.$emit('remove', remSkill)
    },

    notifySkillCreated(skillInfo) {
      this.$emit('create', skillInfo)
    },

    createNewSkill(skillInfo) {
      // We know this is a brand new skill
      //  and no parent has been defined yet
      skillInfo.parent = null

      this.notifySkillCreated(skillInfo)
      this.toggleCreate(false)
    }

  },
  components: {
    SkillNode,
    SkillEditor,
  }
}
</script>

<style scoped>

.skill-tree {
  padding-left: 20px;
}

ul.skill-tree-list {
  padding: 0;
}

</style>