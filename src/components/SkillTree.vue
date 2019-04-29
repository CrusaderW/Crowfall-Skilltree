<template>
  <div class="skill-tree">

    <ul class="node-list" ref="nodeList">
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
  clear: both;
  width: 100%;
  position: relative;
}

ul.node-list {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

</style>
