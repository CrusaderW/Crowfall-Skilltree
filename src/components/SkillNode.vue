<template>
  <div class="skill">
    <h3>{{ skill.name }}</h3>
    |
    <p>Value: {{ skill.value }}</p>
    |
    <p>Target: {{ skill.target }}</p>
    <SkillNode 
      v-for="(childSkill, index) in skill.children"
      v-bind:skill="childSkill"
      v-bind:index="index"
      v-bind:key="childSkill.id"
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

      };
  },
  
  methods: {

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

</style>