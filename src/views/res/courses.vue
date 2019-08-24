<template style="background:#f26fc;">
  <div class="videos">
    <Pros></Pros>
    <Courses class="courses"></Courses>
  </div>
</template>

<script> 
import v from '@/api/pros.js';
import Pros from '@/components/Pros';
import Courses from '@/components/Courses';
export default {
  name: 'Cs',
  components:{Pros,Courses},

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