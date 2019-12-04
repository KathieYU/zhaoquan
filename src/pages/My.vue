<template>
    <div class="my">
        <div class="top"></div>
        <div class="topNav">
            <div class="settings iconfont">&#xe624;&nbsp;</div>
            <div class="mycenter">个人中心</div>
            <div class="msgs iconfont">&nbsp;&#xe628;</div>
        </div>
        <div class="avatar">
            <div class="avaImg"><img src="" alt=""></div>
        </div>
        <div class="toLogin">
            <span @click="goLogin" v-show="!hasLogin">点击登录</span>
            <span v-show="hasLogin">{{username}}</span>
        </div>
        <div class="myClo">
            <span class="iconfont">&#xe614;</span><span>我的收藏</span>
        </div>
        <div class="spaceWhite"></div>
        <div class="myOrder">
            <span class="mytxt">我的订单</span><span class="allOrders">查看全部订单</span>
        </div>
        <div class="orderStatus">
            <div class="waitPay">
                <div class="img img1"></div>
                <div class="txt">待付款</div>
            </div>
            <div class="waitShip">
                <div class="img img2"></div>
                <div class="txt">待发货</div>
            </div>
            <div class="waitSign">
                <div class="img img3"></div>
                <div class="txt">待收货</div>
            </div>
            <div class="waitComment">
                <div class="img img4"></div>
                <div class="txt">待评价</div>
            </div>
            <div class="afterSale">
                <div class="img img5"></div>
                <div class="txt">退款/售后</div>
            </div>
        </div>
        <div class="spaceWhite"></div>
        <div class="receipt">收货地址管理</div>
        <myTab></myTab>
    </div>
</template>
<script>
import myTab from '@/components/MyTab'
export default {
    data(){
        return {
            hasLogin:false,
            username:''
        }
    },
    components:{
        myTab,
    },
    methods:{
        //点击去登录
        goLogin(){
            this.$router.push({path:'/login'})
        }
    },
    mounted(){
        let username = localStorage.getItem('username')
        if(username){
            // console.log(this.$route.query.user)
            this.username = username;
            this.hasLogin = true
        }
    }
}
</script>
<style scoped>
    body{
        background:#f3f3f3;
    }
    .my{
        padding-bottom: 1.04rem
    }
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
    .settings,.mycenter,.msgs{
        font-size: 0.4rem;
        color: #fff
    }
    .iconfont{
        font-size: 0.5rem;
    }
    .avatar{
        height: 2.3rem;
        background: #ff9900;
        position: relative;
    }
    .avaImg{
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        background: #e6dfdf;
        border: 0.14rem solid #fff;
        position:absolute;
        bottom: -0.7rem;
        left: 50%;
        margin-left: -1.04rem;
        overflow: hidden;
    }
    .toLogin{
        margin-top: 0.8rem;
        text-align: center;
        font-size: 0.34rem;
        color: #494949;
    }
    .myClo{
        font-size: 0.34rem;
        line-height: 1.1rem;
        color: #494949;
        padding: 0 0.3rem;
    }
    .myClo .iconfont{
        font-size: 0.38rem;
        color: #ef7774;
        margin-right: 0.15rem;
    }
    .spaceWhite{
        height: 0.15rem;
        background: #efeeee;
    }
    .myOrder{
        height: 1.2rem;
        padding: 0 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.34rem;
        border-bottom: 1px solid #eee;
    }
    .mytxt{
        color: #494949
    }
    .allOrders{
        color: #999;
    }
    .orderStatus{
        height: 1.88rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .orderStatus>div{
        height: 1.88rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .img{
        width: 0.54rem;
        height: 0.48rem;
        margin-bottom: 0.3rem;
        background: url('../assets/images/my.png') no-repeat;
        background-size: cover;
    }
    .img1{
        background-position: 0 -0.91rem;
    }
    .img2{
        background-position: 0 -1.37rem;
    }
    .img4{
        background-position: 0 -1.82rem;
    }
    .img5{
        background-position: 0 -0.45rem;
    }
    .txt{
        font-size: 0.24rem;
        color: #969696;
        text-align: center;
    }
    .receipt{
        height: 1.3rem;
        line-height: 1.3rem;
        padding: 0 0.4rem;
        font-size: 0.3rem;
        color: #969696;
        background: #fafafa;
    }

</style>