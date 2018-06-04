<template>
  <div class="skill-category">
    <h2>{{ category.name }}</h2>
    <Skill 
      v-for="(skill, index) in category.skills"
      v-bind:skill="skill"
      v-bind:index="index"
      v-bind:key="skill.id"
    />
  </div>
</template>

<script>

export default {
  props: {
    'category': Object
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

  .skill-category {
    display: block;
    border: 1px solid #CCCCCC;
  }

</style>