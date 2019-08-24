import request from '@/utils/request'

export default {
    getPapers(info) {
        const data = info;
        return request({
            url: '/papers',
            method: 'post',
            data
        });
    },
    delPapers(info) {
        const data = info;
        return request({
            url: '/papers/del',
            method: 'post',
            data
        });
    },
}