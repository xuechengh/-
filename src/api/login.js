import request from '@/utils/request'

export default {
    loginByMb(loginInfo) {
        const data = loginInfo;
        return request({
            url: '/auth/login',
            method: 'post',
            data
        })
    },

    logout() {
        return request({
            url: '/auth/logout',
            method: 'post'
        })
    },

    getUserInfo(token) {
        return request({
            url: '/auth/user_info',
            method: 'get',
            params: { token }
        })
    },

    SignByMb(signInfo) {
        const data = signInfo;
        return request({
            url: '/auth/sign',
            method: 'post',
            data
        })
    },

    ChpwdByMb(info) {
        const data = info;
        return request({
            url: '/auth/chpwd',
            method: 'post',
            data
        })
    },

    GetSignCode(mb) {
        const data = mb;
        return request({
            url: '/auth/sign_code',
            method: 'post',
            data
        })
    },
    GetChpwdCode(mb) {
        const data = mb;
        return request({
            url: '/auth/chpwd_code',
            method: 'post',
            data
        })
    },
}