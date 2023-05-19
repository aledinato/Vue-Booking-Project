export default {
    state: {
        user: '',
        token: '',
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        }
    },
    actions: {
        setUser(state, user) {
            state.commit('setUser', user);
        },
        setToken(state, token) {
            state.commit('setToken', token);
        },
        logout(state) {
            state.commit('setUser', {
                id: '',
                name: '',
                surname: '',
                email: '',
            });
            state.commit('setToken', '');
        }
    },
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },
        getUser(state) {
            return state.user;
        },
        getToken(state) {
            return state.token;
        }
    }
}