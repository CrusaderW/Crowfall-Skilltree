import Vue from  'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        activeSkilltree: "Tutorial_bg.jpg",
        professions: [
            {name:"Combat", image_file:"0_Combat.jpg"},
            {name:"Crafting", image_file:"1_Crafting.jpg"},
            {name:"Exploration", image_file:"2_Exploration.jpg"},
        ],
    },
    mutations: {
        setSkilltree (state, image_file) {
            state.activeSkilltree = image_file;

        }
    }
})