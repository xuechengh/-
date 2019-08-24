import request from '@/utils/request'

export default {
    getUsers(info) {
        const data = info;
        return request({
            url: '/users',
            method: 'post',
            data
        });
    },
    getRoles(info) {
        const data = info;
        return request({
            url: '/roles',
            method: 'post',
            data
        });
    },
    getAdd(info) {
        const data = info;
        return request({
            url: '/add',
            method: 'post',
            data
        });
    },
    upDataUsers(info){
        const data = info;
        return request({
            url: '/users/update',
            method: 'post',
            data
        });
    }
}