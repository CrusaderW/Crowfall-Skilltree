<template>
    <li class="profession-node">

        <!-- Node info -->
        <div class="node-info">
            <!-- Title -->
            <h3 v-if="!editMode" v-on:click="loadProfession">
                {{ profession.name }}
            </h3>
        </div>
    </li>
</template>

<script>
    export default {
        name: 'profession-node',
        props: {
            'profession': Object
        },
        data() {
            return {
                editMode: false,
            }
        },
        methods: {
            loadProfession() {
                this.$emit('loadProfession', {
                    name: this.profession.name,
                })
            }
        },
    }
</script>

<style scoped>

    .profession-node {
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

