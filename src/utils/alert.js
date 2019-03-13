import store from '../store';

let timer;
let alert = {
        info(msg){
                if(!msg) return;
                if(timer){clearInterval(timer)}
                store.commit('template/changeAlert', {state: true, msg});
                timer = setTimeout(() => {
                        store.commit('template/changeAlert', {state: false, msg});
                }, 2000)
        }
};

export default alert;