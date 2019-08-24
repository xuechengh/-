<template>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" 
    class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">
          {{ $t('login.login_title') }}
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
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:15px;" @click.native.prevent="handleLogin">
        {{ $t('login.logIn') }}
      </el-button>
      <el-row type="flex"  justify="space-between">
        <el-col :span="12"><el-link :underline="false"  style="color:#eee;font-size:14px;" @click="go(3)">忘记密码</el-link></el-col>
        <el-col :span="12" style="text-align:right;">
          <el-link :underline="false"  style="color:#eee;font-size:14px;" @click="go(4)">微信&nbsp;</el-link>
          <el-link :underline="false"  style="color:#eee;font-size:14px;" @click="go(2)"> / 注册</el-link>
        </el-col>
      </el-row>
 </el-form>
</template>

<script>
import { validMb,validPwd } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
export default {
  name: 'Login',
  components: { LangSelect},
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
    return {
      loginForm: {
        mb: '',
        password: ''
      },
      loginRules: {
        mb: [{ required: true, trigger: 'blur', validator: validateMb }],
        password: [{ required: true, trigger: 'blur', validator: validatePwd }]
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByMb', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch((err) => {
            this.loading = false
            this.$message.error(err.message);
          })
        } else {
          return false
        }
      })
    },
    go(n){
       this.$store.dispatch('LoginAct',n).then(()=>{
         console.log(this.$store.state.user.login_act)
       })
    },
  }
}
</script>