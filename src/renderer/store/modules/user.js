import locs from '../../utils/locs'
export default {
    state: {
        is_login: '',
        login_key:'',
        mer_no:'',
        shop_no:'',
        waiter_no:'',
    },
    mutations: {
        SET_USER_DATA: (state, data) => {
            Object.keys(data).forEach(function (key) {
                state[key] = data[key]
            })
        },
    },
    actions: {
        SET_LOGIN({
            commit,
            state
        }, res) {
            let data = {
                is_login: true,
                login_key:res.login_key,
                mer_no:res.mer_no,
                shop_no:res.shop_no,
                waiter_no:res.waiter_no,
            }
            locs.set('login_key', res.login_key)
            locs.set('mer_no', res.mer_no)
            locs.set('shop_no', res.shop_no)
            locs.set('waiter_no', res.waiter_no)
            commit("SET_USER_DATA", data)
        }
    }
}