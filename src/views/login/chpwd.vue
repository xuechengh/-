<template>
    <el-form ref="LoginForm" :model="loginForm" :rules="loginRules" 
    class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">
          {{ $t('login.chpwd_title') }}
        </h3>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="mb">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.mb"
          :placeholder="$t('login.mb')"
          name="mb"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-row :gutter="15">
        <el-col :xs="12" :sm="17" >
          <el-form-item  prop="code">
            <span class="svg-container">
              <svg-icon icon-class="edit" />
            </span>
            <el-input 
            :placeholder="$t('login.code')"
            name="code"
            v-model="loginForm.code"
            auto-complete="on" 
            @keyup.enter.native="handleLogin"
            style="width:70%"/>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="7">
          <el-button type="primary" 
          :disabled="!can_use"
          icon="el-icon-mobile-phone" 
          @click.native.prevent="handleCode"
          style="width:100%;height:46px;margin-top:2px">
         {{ $t('login.code') }}
          </el-button>
        </el-col>
      </el-row>



      <el-button :loading="loading" 
      type="primary" 
      style="width:100%;margin-bottom:15px;" 
      @click.native.prevent="handleChpwd">
        {{ $t('login.chpwd') }}
      </el-button>
      <el-row type="flex"  justify="space-between">
        <el-col :span="12"><el-link :underline="false"  style="color:#eee;font-size:14px;" @click="go(3)">忘记密码</el-link></el-col>
        <el-col :span="12" style="text-align:right;">
          <el-link :underline="false"  style="color:#eee;font-size:14px;" @click="go(4)">微信&nbsp;</el-link>
          <el-link :underline="false"  style="color:#eee;font-size:14px;" @click="go(1)"> / 登录</el-link>
        </el-col>
      </el-row>
 </el-form>
</template>

<script>
import { validMb,validPwd,validCode } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import { setTimeout } from 'timers';
export default {
  name: 'Sign',
  components: { LangSelect },
  data() {
    const validateMb = (rule, value,callback) => {
      if (!validMb(value)) {
        callback(new Error('手机号码格式不正确！'))
      } else {
        callback()
      }
    }
    const validatePwd = (rule, value,callback) => {
      if (!validPwd(value)) {
        callback(new Error('密码最少6位，数字和字母组合'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value,callback) => {
      if (!validCode(value)) {
        callback(new Error('验证码4位整数'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        mb: '',
        password: '',
        code:''
      },
      can_use:true, //倒计时
      loginRules: {
        mb: [{ required: true, trigger: 'blur', validator: validateMb }],
        password: [{ required: true, trigger: 'blur', validator: validatePwd }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined,
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
  },
  mounted(){
  },
  destroyed() {
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleChpwd() {
      this.$refs.LoginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('ChpwdByMb', this.loginForm).then(() => {
            this.loading = false
            this.$message({
              message: '密码修改成功,请重新登录！',
              type: 'success'
            });
            setTimeout(this.$store.commit,1500,'SET_LOGIN_ACT', 1);
          }).catch((err) => {
            this.loading = false
            this.$message.error(err.message);
          })
        } else {
          this.loading = false
          setTimeout(()=>{
            this.$refs.LoginForm.clearValidate()
          },2500);
          return false
        }
      })
    },
    go(n){
       this.$store.dispatch('LoginAct',n).then(()=>{
         console.log(this.$store.state.user.login_act)
       })
    },
    handleCode(){
      this.$refs.LoginForm.validateField('mb',(valid) => {
        if (!valid) { //通过时valid为空值，不通过时为错误提示
          this.can_use = false;
          this.$store.dispatch('GetChpwdCode', {mb:this.loginForm.mb}).then(() => {
            this.can_use =true;
            this.$message({
              message: '注册码发送成功！',
              type: 'success'
            });
          }).catch((err) => {
            this.can_use =true;
            this.$message.error(err.message);
          })
        } else {
          setTimeout(()=>{
            this.$refs.LoginForm.clearValidate()
          },2500);
          return false
        }
      })
    },
  }
}
</script>
