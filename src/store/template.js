export default {
        namespaced: true,
        state: {
                BtnState: {
                        Menu: false,
                        Back: false,
                        Search: false,
                        Text: false,
                        Logo: false,
                        Edit: false,
                },
                footerMenu: true,
                alertState: false,
                alertMessage: ''
        },
        getters: {},
        mutations: {
                changeBtnState(state, payload){
                        /*初始化状态*/
                        for(let i in state.BtnState){
                                state.BtnState[i] = false;
                        }
                        /*更改状态*/
                        payload.btn.forEach(v => {
                                if(v === 'Text') state.BtnState.Text = payload.NavTextContent; else state.BtnState[v] = true;
                        });
                },
                changeFooterMenu(state, payload){
                        state.footerMenu = payload;
                },
                changeAlert(state, payload){
                        state.alertState = payload.state;
                        state.alertMessage = payload.msg;
                },
                changeEdit(state,payload){
                        state.BtnState.Edit = payload;
                }
        },
        actions: {},
        modules: {}
};