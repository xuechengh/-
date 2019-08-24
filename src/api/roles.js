import request from '@/utils/request'

export default {
    getRoles(info) {
        const data = info;
        return request({
            url: '/roles',
            method: 'post',
            data
        });
    }
}