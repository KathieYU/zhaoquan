<template>
    <div class="comments">
        <div class="comNav">
            <div v-for="(item,index) in flags" :key="index" :class="item.flag?'active':''" @click="findReviews(index)">{{item.review}}</div>
        </div>
        <div class="comUl">
            <ul>
                <li v-for="(item,index) in reviews" :key="index">
                    <div class="row1">
                        <span class="username">{{item.buyerName}}</span>
                        <span class="comtime">{{item.createTime | formateTime}}</span>
                    </div>
                    <div class="row2">
                        <img :src="val" alt="" v-for="(val,key) in item.postImg" :key="key">
                    </div>
                    <div class="row3">
                        <p class="comtxt">{{item.postDescribe}}</p>
                    </div>
                    <div class="row4">
                        <p class="managerReply">管理员：{{item.adminReviews}}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            goodsComments:{},
            flags:[//选择评论类型数据
                {
                    review:'全部评价',
                    flag:true   
                },
                {
                    review:'好评',
                    flag:false
                },
                {
                    review:'差评',
                    flag:false
                },
                {
                    review:'晒单',
                    flag:false
                },
            ],
            reviews:[]

        }
    },
    mounted(){
        this.$http({
            url:'http://yd.msword.top/getDetails?pid='+this.$route.query.id
        }).then(res=>{
            this.goodsComments = res.data.data.buyerReviews;
            // console.log(this.goodsComments);
            this.flags.map((val,index)=>{
                if(val.flag){
                    if(val.review=='全部评价'){
                        this.reviews = this.goodsComments.all
                    }else if(val.review=='好评'){
                        this.reviews = this.goodsComments.good
                    }else if(val.review=='差评'){
                        this.reviews = this.goodsComments.bad
                    }else{
                        this.reviews = this.goodsComments.postForm
                    }
                }
            })
            // console.log(this.reviews)
        })
    },
    methods:{
        //选择评论
        findReviews(index){
            this.flags.map((val,index)=>{
                val.flag = false
            })
            this.flags[index].flag = true;
            this.flags.map((val,index)=>{
                if(val.flag){
                    if(val.review=='全部评价'){
                        this.reviews = this.goodsComments.all
                    }else if(val.review=='好评'){
                        this.reviews = this.goodsComments.good
                    }else if(val.review=='差评'){
                        this.reviews = this.goodsComments.bad
                    }else{
                        this.reviews = this.goodsComments.postForm
                    }
                }
            })
        }
    },
    filters:{
        formateTime(time){
            var date = new Date(Number(time))
            var Y = date.getFullYear() + '-'
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            var D = date.getDate() + ' '
            var h = date.getHours() + ':'
            var m = date.getMinutes() + ':'
            var s = date.getSeconds()
            return Y + M + D + h + m + s
        }
    }
}
</script>
<style scoped>
    .comments{
        border-top: 1px solid #eee;
        padding: 0 0.3rem;
    }
    .comNav{
        width: 100%;
        height: 0.7rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
    }
    .comNav>div{
        width: 1.36rem;
        height: 0.5rem;
        background: #999;
        color: #fff;
        font-size: 0.24rem;
        line-height: 0.5rem;
        text-align: center;
        border-radius: 0.2rem
    }
    .active{
        background: #ff9900 !important;
    }
    .comUl ul li{
        padding: 0.2rem 0.3rem;
        border-bottom: 1px solid #eee;
    }
    .row1{
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.18rem;
    }
    .username{
        font-size: 0.24rem;
        color: #ff9900;
    }
    .comtime{
        font-size: 0.16rem;
        color: #999;
    }
    .row2>img{
        width:1.5rem;
        height: 1.5rem;
        border: 1px solid #eee;
        margin: 0 0.1rem 0.1rem 0;
    }
    .row3{
        margin-bottom: 0.12rem;
        font-size: 0.2rem;
        color: #999;
    }
    .row4{
        padding: 0.15rem;
        line-height: 0.28rem;
        font-size: 0.2rem;
        color: #898989;
        background: #ddd;
        border-radius: 0.15rem;
    }
</style>