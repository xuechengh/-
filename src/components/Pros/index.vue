<template>
<div class="pros">
  <el-tabs @tab-click="clearSels" v-model="activeTab">
    <el-tab-pane  v-for="v of blocks" :key="v.id" :label="v.nam" :name = "'tab'+v.id" >
      <el-breadcrumb separator="/" style="line-height:35px;font-size:12px;">
        <el-breadcrumb-item @click.native.prevent="getPros(0,0)">全部:</el-breadcrumb-item>
        <el-breadcrumb-item  
        v-for="(val,key) of sels" 
        :key="val.id" 
        @click.native.prevent="getPros(val.id,key+1)">{{val.nam}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-tab-pane>
  </el-tabs>
  <el-card class="box-card" v-show="show">
    <div>
      <div class="btn"  v-for="v of pros" :key="v.id" >
          <el-button size="small" @click.native.prevent="handlePros(v)">{{v.nam}}</el-button>
          <span v-show="edit" @click.prevent="delPro(v)">×</span>
      </div>
      <div v-show="edit">
        <el-input placeholder="请输入内容" v-model="input" style="width:180px;">
          <el-button  slot="append" @click.native.prevent="addPro">+</el-button>
        </el-input>
      </div>
    </div>
     <div style="clear:both"></div>
      <el-divider style="float:left"><el-switch
          style="padding: 3px 0;font-size:12px;width:110px"
          active-text="编辑"
          v-model="edit" 
          active-color="#13ce66"
          inactive-color="#ff4949"
          inactive-text="操作"></el-switch></el-divider>
    </el-card>
  </div>
</template>

<script>
import v from '@/api/pros.js';
import {isNameUseful} from '@/utils/validate.js';
export default {
  name: 'Pros',
  data() {
      return {
        show:false,
        blocks:[],
        pros:[],
        sels:[],
        lvl:1,
        edit:false,
        activeTab:'',
        input:''
      }
    },
  created(){
    this.initBlocks();
  },
  methods:{
    initBlocks(){
       v.getPros({pid:0}).then((res)=>{
        const d = res.data;
        if(d.Code !== 0){
          this.$message.error(d.Msg);
        }else{
          for(const val of d.Data){
            this.blocks.push(val);
          }
          this.lvl = 0;
          this.sels = [];
         
          this.sels.push(this.blocks[0]);
          this.set_cur_pro(this.sels[this.sels.length-1].id);
          this.activeTab = 'tab'+this.blocks[0].id;
          //console.log(this.blocks);
        }
      }).catch((err)=>{
        console.log(err);
      });
    },
    getPros(pid,k){
       v.getPros({'pid':pid}).then((res)=>{
        const d = res.data;
        if(d.Code !== 0){
          this.$message.error(d.Msg);
        }else{
          this.lvl = k;//选项的层级[0,1,2,3,4]
          this.sels.length =  k;
          this.pros = [];
          for(const val of d.Data){
            this.pros.push(val);
          }
          this.show = true
          }
      
      }).catch((err)=>{
        console.log(err);
      });
    },

    handlePros(v){ //处理点击
      if(this.sels.length>2){
        this.sels.length=this.lvl;
      }
      this.sels.push(v);
      this.set_cur_pro(this.sels[this.sels.length-1].id);
      this.show = false;
    },
    clearSels(v){//切换面板 
      this.pros = [];
      this.show = false;
      this.lvl = 1;
      this.sels = [];
      this.sels.push(this.blocks[v.index]);
      this.set_cur_pro(this.sels[this.sels.length-1].id);
    },

    addPro(){
      let pid = 0;
      if(this.lvl!== 0){
        pid=this.sels[this.sels.length-1].id;
      }
      if(!isNameUseful(this.input)){
        this.$message.error("数据不符合要求");
      }else{
        v.addPro({'pid':pid,nam:this.input}).then((res)=>{
        const d = res.data;
        if(d.Code !== 0){
          this.$message.error(d.Msg);
        }else{
          this.input = '';
          this.pros = []; //重新更新sels
          for(const v of d.Data){
            this.pros.push(v);
          }
          if(this.lvl === 0){ //如果是板块更新，重新刷新 blocks
            this.blocks.length = 0;
            for(const v of d.Data){
              this.blocks.push(v);
            }
          }
          this.$message({
            message: '添加成功',
            type: 'success'
          });
        }
      }).catch((err)=>{
          console.log(err);
      });}
    },

    delPro(v){
      this.openConfirm(v);
    },

    _delPro(id,pid){
      console.log(id)
      v.delPro({'id':id,'pid':pid}).then((res)=>{
        const d = res.data;
        if(d.Code !== 0){
          this.$message.error(d.Msg);
        }else{
          this.pros = []; //重新更新pros
          for(const v of d.Data){
            this.pros.push(v);
          }
          if(this.lvl === 0){ //如果是板块更新，重新刷新 blocks
            this.blocks.length = 0;
            for(const v of d.Data){
              this.blocks.push(v);
            }
          }
         this.$message({
            message: '删除成功！',
            type: 'success'
          });
        }
      }).catch((err)=>{
          console.log(err);
      });

    },

    openConfirm(v){
        this.$confirm(`确定要删除分类:${v.nam} 吗?`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._delPro(v.id,v.pid);
        }).catch(() => {
          this.$message.error('您已取消操作');          
        });
      },
    set_cur_pro(id){
      this.$store.dispatch('SetCurPro',id).then(()=>{
          console.log(this.$store.state.user.cur_pro);
        })
    }

  },
}

</script>

<style scoped>
.pros {
	padding: 20px 16px 10px;
  font-size: 12px;
}
.btn {
  float: left;
  position: relative;
  margin: 0 15px 15px 0;
}
.btn span {
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background: #F56C6C;
  text-align: center;
  line-height: 18px;
  color: #fff;
  position: absolute;
  top: -8px;
  right: -8px;
}
.btn span:hover {
  opacity: 0.7;
}
.box-card {
  margin-top: 10px;
  padding-top: 10px;
  box-shadow: 0 2px 6px #eeeeee;
}
</style>