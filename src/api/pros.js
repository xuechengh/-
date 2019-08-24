import request from '@/utils/request'

export default {
    getPros(info) {
        const data = info;
        return request({
            url: '/pros',
            method: 'post',
            data
        });
    },
    addPro(info) {
        const data = info;
        return request({
            url: '/pros/add',
            method: 'post',
            data
        });
    },
    delPro(info) {
        const data = info;
        return request({
            url: '/pros/del',
            method: 'post',
            data
        });
    }

}