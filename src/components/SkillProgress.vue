<template>
  <div class="skill-progress">
    <progress v-bind:value="value" v-bind:max="max"></progress>
    <span class="label">{{value}}%</span>
    <button v-if="isEditable" v-on:click="decrement()">-</button>
    <button v-if="isEditable" v-on:click="increment()">+</button>
  </div>
</template>

<script>

export default {
  name: 'skill-progress',
  props: {
    'value': Number,
    'max': Number,
    'interval': {
      type: Number,
      default: 10,
    },
    'isEditable': {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    increment() {
      let newVal = this.value + this.interval

      if (newVal >= 0 && newVal <= this.max)
        this.$emit('update', {value: newVal});
    },
    decrement() {
      let newVal = this.value - this.interval

      if (newVal >= 0 && newVal <= this.max)
        this.$emit('update', {value: newVal});
    },
  },
}

</script>

<style scoped>

.skill-progress {
  display: flex;
  margin-bottom: 20px;
}

.skill-progress button {
  flex: none;
}

.skill-progress .label {
  padding: 0 10px;
  flex: none;
}

.skill-progress progress {
  flex: auto;
}


</style>