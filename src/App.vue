<template>
	<div class="tree" id="skilltree-app" v-bind:style="{ 'background-image': 'url(../img/' + activeSkilltree + ')' }">
		<div class="loading-screen flashing" v-if="loading">
			<h3>Still Waiting for API I don´t want to use...</h3>
		</div>
		<Professions
				class="ProfessionSelection">
		</Professions>
		<SkillTree
				class="skill-tree-root"
				v-bind:skillData="root.children"
				v-on:update="updateSkill"
				v-on:create="createSkill"
				v-on:remove="removeSkill">
		</SkillTree>
	</div>
</template>

<script>
    import Vue from 'vue'
    import SkillTree from './components/SkillTree.vue'
    import Professions from "./components/Professions"
    Vue.component('SkillTree', SkillTree); // Needed for recursive SkillTrees
    Vue.component("Professions", Professions);

    let api = require('./api.js') // Apparently `import` is forbidden here

    export default {
        name: 'skilltree-app',
        data() {
            return {
                root: {
                    children: [],
                },
                loading: true,
				currentBackground: "Tutorial_bg.jpg",
            }
        },
        created() {
            this.loading = false

            this.$store.commit('setSkilltree', root.currentBackground);

            // Once created, fetch skills
            api.fetchSkills()
                .then(skills => {
                    this.loading = false
                    this.root = this.rootify(skills)
                })
        },
        methods: {
            updateSkill(info) {
                let newData = info.updates
                let skill = info.skill

                // Update local data
                skill.name = newData.name
                skill.value = newData.value

                // Save to API
                api.updateSkill(
                    skill.id,
                    newData.name,
                    newData.value,
                    newData.target
                )
                    .then( () => {
                        // Update saved to backend
                    })
                    .catch( (error) => { console.log("Update error: " + error) })
            },

            createSkill(info) {
                let parent = info.parent || this.root;

                // Call API to create skill
                api.createSkill(info).then( (newSkill) => {
                    newSkill.children = []; // Currently necessary for Vue reactivity

                    // Add new skill to parent
                    parent.children.push(newSkill)
                })
                    .catch( (error) => { console.log("Create error: " + error) })
            },

            removeSkill(info) {
                let remId = info.id
                let parent = info.parent || this.root

                // Call API to delete skill
                api.deleteSkill(remId).then( () => {
                    // Remove child skill from parent
                    parent.children = parent.children.filter(child => !(child.id == remId))
                })
            },

            findSkill(id) {
                // Recursive skill finder
                let recursiveFind = function(skill, queryId) {
                    if (skill.id == id)
                        return skill

                    if (skill.children && skill.children.length > 0) {
                        for (let i = 0; i < skill.children.length; i++) {
                            let result = recursiveFind(skill.children[i], queryId)
                            if (result)
                                return result
                        }
                    }
                }

                // Use recursive finder on tree root
                return recursiveFind(this.root, id)
            },

            rootify(data) {
                // Need to make sure all nodes have a 'children' property...
                //  (This is currently necessary for Vue reactivity)
                let recursiveChildMaker = function(node) {
                    if (node.children) {
                        for (let i = 0; i < node.children.length; i++) {
                            recursiveChildMaker(node.children[i]);
                        }
                    }
                    else {
                        node.children = [];
                    }
                }

                // Place skill data in new root
                let newRoot = {
                    children: data
                };

                // Run recursive child maker on new root
                recursiveChildMaker(newRoot);

                return newRoot;
            },
        },
        components: {
            SkillTree,
            Professions,
        },
		computed: {
            activeSkilltree: function() {
                return this.$store.state.activeSkilltree
            }
		}
    }
</script>

<style lang="scss">
	@import './variables.scss';
	@import './assets/tree.css';
	@import './assets/theme.css';

	#skilltree-app {
		font-family: "Trebuchet MS", Helvetica, Arial, sans-serif;
		color: $default-blue;
		background-repeat: no-repeat;
		width: 1440px;
		height: 918px;
	}

	.header {
		text-align: center;
	}

	.header h1 {
		font-size: 75px;
		margin-top: 1em;
		margin-bottom: 0.2em;
	}

	.header h2 {
		font-style: italic;
	}

	.loading-screen {
		text-align: center;
	}

	.loading-screen h3 {
		margin: 50px auto;
	}

	.flashing {
		-webkit-animation: flash linear 8s infinite;
		animation: flash linear 2s infinite;
	}
	@-webkit-keyframes flash {
		0% { opacity: 1; }
		50% { opacity: .1; }
		100% { opacity: 1; }
	}
	@keyframes flash {
		0% { opacity: 1; }
		50% { opacity: .1; }
		100% { opacity: 1; }
	}

</style>
