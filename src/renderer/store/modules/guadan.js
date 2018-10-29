import locs from '../../utils/locs'
export default {
    state: {
        guadan_data:[]    
    },
    mutations: {
        SET_GUADAN_DATA: (state, data) => {
            state.guadan_data.push(JSON.stringify(data));
        },
        DEL_GUADAN_DATA: (state, data) => {
            state.guadan_data.splice(data,1) 
        },
    },
    actions: {
        SET_GUADAN({
            commit,
            state
        }, res) {
            commit("SET_GUADAN_DATA", res);
        },
        DEL_GUADAN({
            commit,
            state
        }, res) {
            commit("DEL_GUADAN_DATA", res);
        },
    }
}