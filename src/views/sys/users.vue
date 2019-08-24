<template style="background:#f26fc;">
    <div class="videos">
        <Pros></Pros>
        <Users class="courses"></Users>
    </div>
</template>

<script> 
    import Pros from '@/components/Pros';
    import Users from '@/components/Users';
    export default {
        name: 'Us',
        components:{Pros,Users}
    }

</script>

<style rel="stylesheet/scss" lang="scss">
    .pros {
        background: #FFF;
    }
    .el-tabs__item,.el-input__inner{
        font-size: 12px !important;
    }
    .el-input--medium .el-input__inner {
        height: 30px;
    }

    .el-switch__label *{
        font-size: 12px !important;
    }

    .el-message-box{
        width:260px;
    }
</style>