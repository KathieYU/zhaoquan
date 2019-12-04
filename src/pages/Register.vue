<template>
    <div id="register">
        <div class="top"></div>
        <div class="topNav">
            <div class="back iconfont" @click="goBack()">&#xe6a8;&nbsp;</div>
            <div class="txt">注册</div>
            <div class="toRegister"><a>登录</a></div>
        </div>
        <div class="main">
            <div class="row">
                <input type="text" placeholder="手机号：" name="tel" v-model="regData.phone"  @blur="phBlur">
                <span class="msg" v-html="phoneErr" v-show='flag'></span>
            </div>
            <div class="row">
                <input type="password" placeholder="密码：" name="pass" v-model="regData.password" @blur="pasBlur">
                <span class="msg" v-html="passErr"  v-show="flag"></span>
            </div>
            <div class="row">
                <input type="text" placeholder="验证码：" v-model="regData.verifycode" >
                <span class="getVeritify msg" @click="getVfcode()">点击获取</span>
            </div>
            <div class="row"><button id="btn" @click="goReg()">下一步</button></div>
            <div class="row row4"><input type="checkbox" name="agree" v-model="regData.agree" value="true"><span>我已阅读并同意使用条款和隐私政策</span></div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return {
            regData:{
                phone:'',
                password:'',
                verifycode:'',
                agree:false
            },
            sjs:'',
            phoneErr:'',
            passErr:'',
            flag:true,
        }
    },
    methods:{
        goReg(){
            console.log(this.regData)
            let user={
                phone:this.regData.phone,
                password:this.regData.password
            }
            this.$http({
                url:'http://localhost:3000/captcha/verify',
                params:{
                    phone:this.regData.phone,
                    captcha:this.regData.verifycode
                }
            }).then(res=>{
                console.log(res)
                if(res.data.code=='200'){//验证码正确
                    if(this.regData.phone&&/^1[3456789]\d{9}$/.test(this.regData.phone)&&this.regData.password&&/\w{6,16}/.test(this.regData.password)){
                        if(!this.regData.agree){
                            alert('请同意协议后注册')
                        }else{
                            this.$http({
                                url:'http://yd.msword.top/register',
                                method:'POST',
                                data:qs.stringify(user)
                            }).then(res=>{
                                console.log(res.data)
                                alert(res.data.msg)
                                if(res.data.msg=='注册成功'){
                                    this.$router.push({path:'/login'})
                                }
                            })
                        }
                    }
                }
            })
           
        },
        getVfcode(){
            // let sjs = Math.floor(Math.random()*10000)
            // this.sjs = sjs;
            // alert('验证码为：'+sjs)
            if(!this.regData.phone){
                this.phoneErr = '手机号不能为空'
            }else if(!/^1[3456789]\d{9}$/.test(this.regData.phone)){
                this.phoneErr = '手机号格式不正确'
            }else{
                this.$http({
                    url:'http://localhost:3000/captcha/sent',
                    params:{
                        phone:this.regData.phone
                    }
                }).then(res=>{
                    console.log(res)
                })
            }
            
        },
        goBack(){
            history.go(-1)
        },
        phBlur(){
            if(!this.regData.phone){
                this.phoneErr = '手机号不能为空'
            }else if(!/^1[3456789]\d{9}$/.test(this.regData.phone)){
                this.phoneErr = '手机号格式不正确'
            }else{
                this.phoneErr = ''
            }
        },
        pasBlur(){
            if(!this.regData.password){
                this.passErr = '密码不能为空'
            }else if(!/\w{6,16}/.test(this.regData.password)){
                this.passErr = '密码格式不正确，请重新输入'
            }else{
                this.passErr = ''
            }
        },
      
        
    },
}
</script>
<style scoped>
    .top{
            height: 0.4rem;
            background: #ff9900;
    }
    .topNav{
        height: 1rem;
        padding: 0 0.3rem;
        background: #ff9900;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .back,.txt,.toRegister{
        font-size: 0.4rem;
        color: #fff
    }
    .toRegister a{
        color: #fff;
    }
    .main {
        padding: 1rem 0.7rem;
    }
   input{
       height: 1.34rem;
       width: 100%;
       font-size: 0.3rem;
       border: none;
       border-bottom: 1px solid #eee;
   }
   
   .row:nth-child(1),.row:nth-child(2),.row:nth-child(3){
       text-align: right;
       font-size: 0.28rem;
       line-height: 1.34rem;
       position: relative;
   }
   .getVeritify,.msg{
       position:absolute;
       right: 0.1rem;
       color: #fe0041;
   }
   .forgetPass:hover{
       color: #ff9900;
   }
   #btn{
       width: 100%;
       height: 1rem;
       background: #ff9900;
       color: #fff;
       border: none;
       border-radius: 0.1rem;
       font-size: 0.38rem;
   }
   .row4{
       font-size: 0.28rem;
       margin-top: 0.5rem;
       color: #333;
   }
   .row4 input{
       width: 0.3rem;
       height: 0.3rem;
       background: transparent;
       border: 1px solid #eee;
       vertical-align: middle;
       margin-right: 0.1rem;
   }
</style>