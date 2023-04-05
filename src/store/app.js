export const state = () => ({
    appNavBar: false,
});

export const mutations = {
    setNavBar(state, payload) {
        state.appDrawer = payload;
    },
};