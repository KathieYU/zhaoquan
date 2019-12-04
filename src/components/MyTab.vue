<template>
    <div class="myTab">
        <router-link to="/index" class="item" active-class="active">
            <div class="myicon home"></div>
            <div class="mytxt">首页</div>
        </router-link>
        <router-link to="/list" class="item" active-class="active">
            <div class="myicon list"></div>
            <div class="mytxt">分类</div>
        </router-link>
        <router-link to="/cart" class="item" active-class="active">
            <div class="myicon cart"></div>
            <div class="mytxt">购物车</div>
        </router-link>
        <router-link to="/my" class="item" active-class="active">
            <div class="myicon my"></div>
            <div class="mytxt">我</div>
        </router-link>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .myTab{
        width: 100%;
        height: 1.04rem;
        background: #fff;
        display: flex;
        justify-content: space-around;
        font-size: 0.22rem;
        position: fixed;
        bottom: 0;
        z-index:100
    }
    .item{
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .myicon{
        width: 0.42rem;
        height: 0.42rem;
        margin-top: 0.14rem;
        background:url('../assets/images/myicon.png') no-repeat;
        background-size: cover;
    }
    .mytxt{
        line-height: 0.44rem;
    }
    .active{
        color: #ff9900;
    }
    .home{
        background-position: 0 -1.68rem;
    }
    .list{
         background-position: 0 -2.1rem;
    }
    .cart{
         background-position: 0 -2.52rem;
    }
    .my{
         background-position: 0 -2.94rem;
    }
</style>