<template>
    <div class="professions">
        <ul class="profession-list">
            <ProfessionNode
                v-for="profession in professions"
                v-bind:profession="profession"
                v-bind:key="profession.id"
                v-on:loadProfession="loadProfession"
            >
            </ProfessionNode>
        </ul>
    </div>
</template>

<script>
import ProfessionNode from "./ProfessionNode"

export default {
    name: "Professions",
    props: {
        "professions":Array
    },
    data() {
        return {
            editMode: false,
        }
    },
    methods:{
        loadProfession(name){
            this.$emit("loadProfession",{
                name: name
            })
        }
    },
    components: {
        ProfessionNode
    }
}
</script>

<style scoped>

.professions {
  padding-left: 20px;
  clear: both;
  width: 100%;
  position: relative;
}

ul.profession-list {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

</style>
