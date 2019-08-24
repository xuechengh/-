import request from '@/utils/request'

export default {
    getCourses(info) {
        const data = info;
        return request({
            url: '/courses',
            method: 'post',
            data
        });
    },
    delCourses(info) {
        const data = info;
        return request({
            url: '/courses/del',
            method: 'post',
            data
        });
    },
}