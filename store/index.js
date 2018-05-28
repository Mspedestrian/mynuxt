import Vuex from 'vuex'
export default function() {
	return new Vuex.Store({
		state: {
			userObj:null,
		},
		actions: {
			CHANGE_USER({ commit }, data) {
				commit('SET_USER', data);
			},
		},
		mutations: {
			SET_USER(state, data) {
				state.userObj = data;
			},
			
		}
	})
}
