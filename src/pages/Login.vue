<template>
    <div class="login">
        <div class="top"></div>
        <div class="topNav">
            <div class="back iconfont" @click="back">&#xe6a8;</div>
            <div class="txt">登录</div>
            <div class="toRegister" @click="toReg()"><a>注册</a></div>
        </div>
        <div class="main">
            
            <div class="row"><input type="text" placeholder="手机号：" name="tel" v-model="userInfo.phone"></div>
            <div class="row"><input type="password" placeholder="密码：" name="pass" v-model="userInfo.password"></div>
            <div class="row"><span class="forgetPass">忘记密码</span></div>
            <div class="row"><button id="btn" @click="subForm()">登录</button></div>
            
        </div>
    </div>
</template>
<script>
export default {
        data(){
            return {
                userInfo:{
                    phone:'',
                    password:''
                }
                
            }
        },
        methods:{
            subForm(){//登录
                // console.log(this.userInfo);
                this.$http({
                    url:'http://yd.msword.top/login',
                    //这里必须用parmas
                    params:{
                        phone:this.userInfo.phone,
                        password:this.userInfo.password
                    }

                }).then(res=>{
                    console.log(res)
                    if(res.data.msg=='登录成功。'){
                        //将登录信息记录缓存
                        let myUsers = JSON.parse(localStorage.getItem('myUsers')) || [];
                        // if(myUsers==''){//如果没有登录则为空数组
                        //     myUsers = []
                        // }
                        //将游客购物车追加至用户购物车
                        let otherUser = JSON.parse(localStorage.getItem('otherUser'));
                        let myCart = [];
                        otherUser.cartlist.map((v,i)=>{
                            myCart.push(v)
                        })
                        let obj = {
                            id:myUsers.length+1,
                            username:this.userInfo.phone,
                            userpass:this.userInfo.password,
                            myCart:myCart
                        }
                        myUsers.push(obj)
                        localStorage.setItem('myUsers',JSON.stringify(myUsers))
                        localStorage.setItem('username',this.userInfo.phone)
                        this.$router.push({path:'/my',query:{user:this.userInfo.phone}})
                    }else{
                        alert(res.data.msg)
                    }
                })
            },
            toReg(){//去注册
                this.$router.push({path:'/register'})
            },
            back(){//返回my
                history.go(-1)
            }
        }
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
        padding: 1.9rem 0.7rem;
    }
   input{
       height: 1.34rem;
       width: 100%;
       font-size: 0.3rem;
       border: none;
       border-bottom: 1px solid #eee;
   }
   
   .row:nth-child(3){
       text-align: right;
       font-size: 0.28rem;
       color: #666;
       line-height: 0.98rem;
   }
   .forgetPass{
       padding: 0 0.1rem;
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

    
</style>