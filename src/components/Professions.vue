<template>
    <div class="professions">
        <ul class="profession-list">
            <li class="profession-node" v-for="profession in professions">
                <!-- Node info -->
                <div class="profession-node-info">
                    <!-- Title -->
                    <h3 v-on:click="loadProfession(profession.image_file)">
                        {{ profession.name }}
                    </h3>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: "Professions",
    data() {
        return {
            editMode: false,
        }
    },
	computed:{
			professions: function () {
                return this.$store.state.professions
            }
    },
    methods: {
        loadProfession: function(image_file) {
            // TODO: call the store-method to set the current skilltree.
            console.log(image_file);
            this.$store.commit('setSkilltree', image_file);
            this.$emit("updateBackground");
            console.log("calling...")
            return 0;
        }
    },
}
</script>

<style scoped>

.professions {
  padding-left: 20px;
  clear: both;
  width: 400px;
  position: relative;
}

ul.profession-list {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
.profession-node {
  flex: 0 0 auto;
  display: block;
  min-width: 300px;
  margin: 10px;
  padding: 5px;
  overflow: auto;
  position: relative;
}

.profession-node-info {
  background-color: #FFFFFF;
  display: block;
  padding: 20px;
  border: 1px solid #000000;
  box-shadow: 5px 5px #000000;
  }

  h3 {
    margin: 0;
  }

</style>
