<template>
    <div class="goods">
        <img v-for="(item,index) in goods.shopDes" :key="index" :src="item" alt="">
    </div>
</template>
<script>
export default {
    data(){
        return {
            goods:{}
        }
    },
    mounted(){
        // console.log(this.$route.query)
        this.$http({
            url:'http://yd.msword.top/getDetails?pid='+this.$route.query.id
        }).then(res=>{
            this.goods = res.data.data
            // console.log(this.goods)
        })
    }
}
</script>
<style scoped>
    .goods{
        padding:0.1rem 0.45rem;
    }
    .goods img{
        width: 100%;
    }
</style>