<template>
    <li class="profession-node">

        <!-- Node info -->
        <div class="profession-node-info">
            <!-- Title -->
            <h3 v-on:click="loadProfession">
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

