<template>
<div class="course" style="padding:0 15px 20px">
  <div class="table">
    <el-row class="th"> 
        <el-col :sm="3" class="hidden-xs-only">
            姓名
        </el-col>
        <el-col :sm="3" class="hidden-xs-only">
            角色
        </el-col>
        <el-col :sm="4" :xs="16">
            公司
        </el-col>
        <el-col :sm="7" class="hidden-xs-only">
            手机
        </el-col>
        <el-col :sm="7" class="hidden-xs-only">
           操作 
        </el-col>
        
        
    </el-row>
   
    <el-row class="tr" v-for="(item,index) in tb" :key="index" >
        <el-col :sm="3" class="hidden-xs-only">
           {{item.usernam}}
        </el-col>
        <el-col :sm="3" class="hidden-xs-only">
            {{item.roleName}}
        </el-col>
        <el-col :sm="4" class="hidden-xs-only">
           {{item.usercompany}}
        </el-col>
        <el-col :sm="7" class="hidden-xs-only">
           {{item.usermb}}
        </el-col>
        <el-col :sm="7" class="hidden-xs-only">
            <template>
                <el-button
                size="mini"
                type="warning"
                @click="handleEdit(index)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(item)">删除</el-button>
                
            </template>
        </el-col>
    </el-row>

    <el-row :gutter="10" style="padding:20px 0 5px;">
        <el-button size="mini" type="success" @click="value>1?value--:false" style="background:#42b983">上一页</el-button>
        <el-select v-model="value" placeholder="1" class="inner" style="background:none">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-button size="mini" type="success" @click="value<pages?value++:false" style="background:#42b983">下一页</el-button>
        <el-button size="mini" type="primary" @click="handleAdd()">添加</el-button>
    </el-row>
    </div>
   <Dialog  :mb="this.mb" :rol="this.getRoles" :dis="this.distinguish" :dia="this.dialogFormVisible" @getMb="getMal" @getDia="getVal"></Dialog>
 

</div>
</template>

<script>
import c from '@/api/users.js';
import u from '@/deal_json/index.js'
import Dialog from '@/components/Dialog';
export default {
  name: 'Courses',
  components:{Dialog},
  data() {
      return {
        tb: [],
        mb:{},
        getRoles:[],
        options: [
        {value: 1,label: 1},
        {value: 2,label: 2}  
        ],
        value:1,
        pages:2,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        multipleSelection: [],
        dialogFormVisible: false,
        distinguish: false,
        formLabelWidth: '120px'
      };
    },
  computed:{
    cur_pro(){
      return this.$store.state.user.cur_pro;
    }
  },
  created(){
   this.getRolesFun() 
  },
  mounted(){
    this.getRole()
  },
  methods:{
    getRole(_pro){ 
      c.getUsers({}).then((res)=>{
      const d = res.data;
     // console.log(res)
      this.tb = [];
      if(d.Code == 0){
       this.tbFun(d.Data)
      }else{
       this.$message.error(d.Msg);
       
      }}).catch((err)=>{
        console.log(err);
      });

    },
    handleDelete(v){
      this.openConfirm(v);
    },
    openConfirm(v){
      
      this.$confirm(`确定要删除用户:${v.usernam} 吗?`, '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
       
        this._delCourse(v);
      }).catch(() => {
        
        this.$message.error('您已取消操作');          
      });
      
      
    },
    _delCourse(v){
      u.removeArray(this.tb,v)
      /*
      c.delCourses({'id':id,'pro':this.cur_pro}).then((res)=>{
      const d = res.data;
      
      if(d.Code !== 0){
        this.$message.error(d.Msg);
      }else{ //重新更新tbs
        this.tb = [];
        for(const v of d.Data){
          this.tb.unshift(v);
        }
      }}).catch((err)=>{
        console.log(err);
      });
      */
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
      },
    handleEdit(index){
    
     this.mb = this.tb[index]
     this.dialogFormVisible = true
     this.distinguish = false
    },
    handleAdd(){
      this.mb = ''
      this.dialogFormVisible = true
      this.distinguish = true
    },
    getVal(msg){
      if(!msg)
      this.dialogFormVisible = msg
      else
      this.dialogFormVisible =!msg
    },
    getMal(msg){
      console.log(msg)
     if(this.distinguish)
     c.getAdd(msg).then((res)=>{
      const d = res.data;
      console.log(res)
      //  this.tb = [];
      if(d.Code == 0){
    //  this.tbFun(d.Data)
      }else{
      this.$message.error(d.Msg);
       
      }}).catch((err)=>{
        console.log(err);
      });
     else  
     c.upDataUsers(msg).then((res)=>{
      const d = res.data;
        this.tb = [];
      if(d.Code == 0){
      this.tbFun(d.Data)
      }else{
      this.$message.error(d.Msg);
       
      }}).catch((err)=>{
        console.log(err);
      });
   
    },
    getRolesFun(){
     c.getRoles({}).then((res)=>{
      const d = res.data;
   //   console.log(res)
    
      if(d.Code == 0){
      
       this.getRoles= d.Data
      
      }else{
       this.$message.error(d.Msg);
       
      }}).catch((err)=>{
        console.log(err);
      });
    },
    tbFun(data){
     var provisionalArt = [],str = '',roleArt = this.getRoles
     
     provisionalArt = u.uniqueArray(data,'userid')
     provisionalArt.forEach((alem,a)=>{
       data.forEach((blem,b)=>{
         if(alem.userid == blem.userid)
         if(alem.roleid != blem.roleid)
         alem.roleid += ','+blem.roleid
       })
     })
     provisionalArt.forEach((alem,a)=>{ 
       str = ''
      if(typeof(alem.roleid)==='number') 
      alem.roleid = String(alem.roleid)
      alem.roleid.split(',').forEach((blem,b)=>{
       roleArt.forEach((clem,c)=>{
         if(clem.id == blem)
         str+=clem.des+','
       
       })
          
      })
   
      str = str.substring(0,str.length-1)
     
      alem.roleName = str
     })
     console.log(provisionalArt)
     this.tb  = provisionalArt
    } 
  },

  watch:{
    cur_pro:{
      handler(_new,_old){

        this.getRole(_new);
      }
    },
    value(val){
      
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