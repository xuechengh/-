import L from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        },
        login_act: 1, //1:登录，2：注册，3，修改密码,4,微信登录
        cur_pro: 0


    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        // SET_SETTING: (state, setting) => {
        //   state.setting = setting
        // },
        // SET_STATUS: (state, status) => {
        //   state.status = status
        // },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_LOGIN_ACT: (state, code) => {
            state.login_act = code
        },
        SET_CUR_PRO: (state, code) => {
            state.cur_pro = code
        },
    },

    actions: {
        // 手机号码登录
        LoginByMb({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                L.loginByMb(userInfo).then(response => {
                    const d = response.data
                    if (d.Code === 0) {
                        commit('SET_TOKEN', d.Data.token)
                        setToken(d.Data.token)
                        resolve()
                    } else {
                        reject(new Error(d.Msg));
                    }

                }).catch(error => {
                    reject(error)
                })
            })
        },

        SignByMb({ commit }, signInfo) {
            return new Promise((resolve, reject) => {
                L.SignByMb(signInfo).then(response => {
                    const d = response.data
                    if (d.Code === 0) {
                        resolve()
                    } else {
                        reject(new Error(d.Msg));
                    }

                }).catch(error => {
                    reject(error)
                })
            })
        },
        ChpwdByMb({ commit }, ChpwdInfo) {
            return new Promise((resolve, reject) => {
                L.ChpwdByMb(ChpwdInfo).then(response => {
                    const d = response.data
                    if (d.Code === 0) {
                        resolve()
                    } else {
                        reject(new Error(d.Msg));
                    }

                }).catch(error => {
                    reject(error)
                })
            })
        },

        GetSignCode({ commit }, mbInfo) {
            return new Promise((resolve, reject) => {
                L.GetSignCode(mbInfo).then(response => {
                    const d = response.data
                    if (d.Code === 0) {
                        resolve()
                    } else {
                        reject(new Error(d.Msg));
                    }

                }).catch(error => {
                    reject(error)
                })
            })

        },

        GetChpwdCode({ commit }, mbInfo) {
            return new Promise((resolve, reject) => {
                L.GetChpwdCode(mbInfo).then(response => {
                    const d = response.data
                    if (d.Code === 0) {
                        resolve()
                    } else {
                        reject(new Error(d.Msg));
                    }

                }).catch(error => {
                    reject(error)
                })
            })

        },
        // 获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                L.getUserInfo(state.token).then(response => {
                    const d = response.data;
                    if (d.Code !== 0) {
                        reject(d.Msg);
                    } else {
                        if (d.roles && d.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                            commit('SET_ROLES', d.roles)
                            commit('SET_NAME', d.name)
                            commit('SET_AVATAR', d.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
                            commit('SET_INTRODUCTION', d.introduction)
                            resolve(response)
                        } else {
                            reject('getInfo: roles must be a non-null array!')
                        }

                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },


        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                L.logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        },
        LoginAct({ commit }, code) {
            return new Promise(resolve => {
                commit('SET_LOGIN_ACT', code)
                removeToken()
                resolve()
            })
        },
        SetCurPro({ commit }, pro) {
            return new Promise((resolve) => {
                commit('SET_CUR_PRO', pro);
                resolve();
            })
        },
        // 动态修改权限
        ChangeRoles({ commit, dispatch }, role) {
            return new Promise(resolve => {
                commit('SET_TOKEN', role)
                setToken(role)
                L.getUserInfo(role).then(response => {
                    const data = response.data
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_INTRODUCTION', data.introduction)
                    dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
                    resolve()
                })
            })
        }
    },
}
export default user