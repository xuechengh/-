<template>
  <el-dialog 
  :title="til"
  width="30%"  
  :close-on-click-modal="false"
  :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="姓名:" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="公司:" :label-width="formLabelWidth">
     <el-input v-model="form.company" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机:" :label-width="formLabelWidth">
    <el-input v-model="form.phone" autocomplete="off" ></el-input>
    </el-form-item>
    <el-form-item label="角色:" :label-width="formLabelWidth">
    <span v-for="(item,index) in form.role" :key="index">
    <el-tag v-if="item.bn" @click="elTag(index)" >{{item.des}}</el-tag>
    <el-tag v-else type="info" @click="elTag(index)">{{item.des}}</el-tag>
    </span>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="diaBtn(false)">取 消</el-button>
    <el-button type="primary" @click="diaBtn(true)">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import u from '@/deal_json/index.js'
export default {
  name: 'Dialog',
  data() {
      return {
        form: {
          id:'',
          name: '',
          company:'',
          region: '',
          intro:'',
          phone:'',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          role:[],
          roleid:[],
          saveRole:[]
        },
        multipleSelection: [],
        dialogFormVisible: false,
        formLabelWidth: '80px',
        til:'',
        tilan:['用户添加','信息修改']
      };
    },
    watch:{
      dia(val){
       this.dialogFormVisible = val
       
      },
      mb(val){
       
       
       this.empty(val)
       this.til = val?this.tilan[1]:this.tilan[0]
       this.roleFun(val)  
       
       
        
       
      },
      rol(val){
     //  console.log(val)
       this.form.role = val
      }
    },
    methods:{
     diaBtn(val){
      var role,str = ''
     
      this.elTage()
      this.form.saveRole.forEach((item,index)=>{
      str+=item+','
      })
      str=str.substring(0, str.length - 1)
      role = {
        'userid':this.form.id,
        'usernam':this.form.name,
        'usercompany':this.form.company,
        'usermb':this.form.phone,
        'role':str
         }
      this.$emit('getDia',val)
      if(val)
      this.$emit('getMb',role)
      if(this.dis)
      this.empty(),this.elTage(true)
     },
     roleFun(val){
      this.form.role.forEach((blem,b)=>{
        blem.bn = 0
      })
      if(val)
      this.form.roleid.forEach((rlem,r)=>{
        this.form.role.forEach((blem,b)=>{
          
          if(rlem == blem.id)
          blem.bn = 1
        })
      })
      
     },
     elTag(i){
     var ele = document.getElementsByClassName('el-tag')[i]
     u.hasClass(ele,'el-tag--info')?(this.form.role[i].bn=1,u.removeClass(ele,'el-tag--info')):(this.form.role[i].bn=0,u.addClass(ele,'el-tag--info'))
    },
    elTage(a){
      var ele = document.getElementsByClassName('el-tag')
      this.form.saveRole = []
     
      for(var k=0;k<ele.length;k++){
      if(!u.hasClass(ele[k],'el-tag--info'))
      this.form.saveRole.push(k+1) 
      if(a)
      this.form.role[k].bn=0,u.addClass(ele[k],'el-tag--info')
      }   
    },
    empty(val){
      
       this.form.id = val?val.userid:'' 
       this.form.name = val?val.usernam:''
       this.form.company = val?val.usercompany:''
       this.form.phone = val?val.usermb:''
       this.form.roleid = val?val.roleid.split(','):''
    }
    }, 
    props:['dia','mb','rol','dis']
}

</script>
<style rel="stylesheet/scss" lang="scss">
.el-dialog__wrapper{
 .el-dialog{
   width:900px;
   border-radius:10px 10px 0 0;
  .el-dialog__header{
    position:relative;
    height:60px;
    padding:0;
    margin:0;
    display:block;
    background-color:#135ace;
    display:flex;
    flex-flow:column wrap;
    justify-content:center;
    border-radius: 10px 10px 0 0;
    .el-dialog__title{
      text-align:center;
      color:#fff;
    }
   .el-dialog__headerbtn{
     display:none;
   }
  }
 }
 .el-tag{
   margin-right:10px;
   cursor:pointer;
 }
}
</style>