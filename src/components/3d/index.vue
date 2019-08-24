<template>
<div class="course" style="padding:0 15px 20px">
  <div class="table">
    <el-row class="th">
        <el-col :sm="2" class="hidden-xs-only">
            ID
        </el-col>
        <el-col :xs="16" :sm="4">
            课程名称     
        </el-col>
        <el-col :sm="3" :xs="8">
            设计老师
        </el-col>
        <el-col :sm="5" class="hidden-xs-only" >
            描述信息
        </el-col>
        <el-col :sm="3" :xs="6" class="hidden-xs-only">
            课程类型
        </el-col>
        <el-col :sm="7" class="hidden-xs-only">
            操作
        </el-col>
    </el-row>
   
    <el-row class="tr" v-for="v of tb" :key="v.id">
        <el-col :sm="2" class="hidden-xs-only">
            {{v.id}}
        </el-col>
        <el-col :xs="16" :sm="4">
            {{v.nam}}
        </el-col>
        <el-col :sm="8" :xs="8">
            {{v.t_name}}
        </el-col>
        <el-col :sm="5" class="hidden-xs-only">
            {{v.des}}
        </el-col>
        <el-col :sm="3" class="hidden-xs-only">
            {{v.tp_nam}}
        </el-col>
        <el-col :sm="7" class="hidden-xs-only">
            <template>
                <el-button
                size="mini"
                type="warning"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click.native.prevent="handleDelete(v)">删除</el-button>
                <el-button size="mini" type="primary">添加</el-button>
            </template>
        </el-col>
    </el-row>

    <el-row :gutter="10" style="padding:20px 0 5px;">
        <el-button size="mini" type="success" style="background:#42b983">上一页</el-button>
        <el-select v-model="options.value" placeholder="1" class="inner" style="background:none">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-button size="mini" type="success" style="background:#42b983">上一页</el-button>
    </el-row>
    </div>
  
</div>
</template>

<script>
import c from '@/api/courses.js';
export default {
  name: 'Three',
  data() {
      return {
        tb: [],
        multipleSelection: [],
      };
    },
  computed:{
    cur_pro(){
      return this.$store.state.user.cur_pro;
    }
  },
  methods:{
    get3dCourses(_pro){ 
      c.getCourses({'pid':_pro}).then((res)=>{
      const d = res.data;
      this.tb = [];
      if(d.Code !== 0){
        this.$message.error(d.Msg);
      }else{
        for(const v of d.Data){
           this.tb.unshift(v);
        }
       
      }}).catch((err)=>{
        console.log(err);
      });

    },
    handleDelete(v){
      this.openConfirm(v);
    },
    openConfirm(v){
      this.$confirm(`确定要删除课程:${v.nam} 吗?`, '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._delCourse(v.id);
      }).catch(() => {
        this.$message.error('您已取消操作');          
      });
    },
    _delCourse(id){
      c.delCourses({'id':id,'pro':this.cur_pro}).then((res)=>{
      const d = res.data;
      this.tb = [];
      if(d.Code !== 0){
        this.$message.error(d.Msg);
      }else{ //重新更新tbs
        for(const v of d.Data){
          this.tb.unshift(v);
        }
      }}).catch((err)=>{
        console.log(err);
      });
    },
  
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
  },

  watch:{
    cur_pro:{
      handler(_new,_old){
        this.getCourses(_new);
      },
    }
  }
}

</script>


<style rel="stylesheet/scss" lang="scss" scoped>
* {
    font-size: 12px;
}
.tb {
    width: 100%;
    box-shadow: 0 2px 6px #EEEEEE;
    border: 1px solid #EBEEF5;
}

.always-shadow {
	box-shadow: 0 2px 6px #EEEEEE;
	border: 1px solid #EBEEF5;
}
.table {
    border: solid 1px #ebeef5;
    line-height: 28px;
    font-size: 14px;
    padding: 20px;
    box-shadow: 0 2px 6px #eeeeee;
}
.th {
    // background: #eeeeee;
    font-weight: bold;
    color: #999;
    border-bottom: solid 1px #ebeef5;
}
.tr {
    color: #666;
    border-bottom: solid 1px #ebeef5;
}
.el-button {
    margin-right: 10px;
    margin-left: 0;
    // margin-bottom: 10px
}
.th .el-col,.tr .el-col {
    padding: 10px;
    // border-right: solid 1px #ebeef5; 
}
.tr .el-col {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.carder {
    padding: 15px;
    border-bottom: solid 1px #ebeef5;
    line-height: 36px;
    color: #666;
    background: #fafafa;
}
.carder span {
    display: block;
    width: 90px;
    float: left;
    font-weight: bold;
    color: #99a9bf;
}
.carder img {
    width: 50%;
    max-width: 180px;
    min-width: 150px;
    height: auto;
    float: left;
}

.el-table .caret-wrapper {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    height: 34px;
    width: 24px;
    vertical-align: middle;
    cursor: pointer;
    overflow: initial;
    position: relative;
}
.inner {
    width: 60px;
    height: 28px;
    margin-right: 10px;
    background: none;
}
.el-input--medium .el-input__inner {
    height: 28px;
}
.el-icon-arrow-up:before,.el-icon-arrow-up:after {
    content: none;
}
</style>	