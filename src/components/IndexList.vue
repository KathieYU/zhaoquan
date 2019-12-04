<template>
    <div>
        <!-- 主页列表 -->
        <div class="goodsUl">
             <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in goodslist" :key='index' @click='toDetail(item.id)'>
                        <div class="goodsImg"><img :src="item.thumbnail"></div> 
                        <div class="goodsPrice">
                            <span class="curPri">¥{{parseInt(item.reduct_price).toFixed(2)}}</span>
                            <span class="oriPri">¥{{parseInt(item.original_price).toFixed(2)}}</span>
                        </div>
                        <p class="goodsDes">{{item.name}}</p>
                    </div>  
                </div>
            </div>
            <!-- <ul class="ul">
                <li>
                    <img src="" alt="" class="goodsImg">
                    <div class="goodsPrice">
                        <span class="curPri">¥88.00</span>
                        <span class="oriPri">¥96.00</span>
                    </div>
                    <p class="goodsDes">美国/SUPER MILD沐浴露500ml</p>
                </li>
                <li>
                    <img src="" alt="" class="goodsImg">
                    <div class="goodsPrice">
                        <span class="curPri">¥88.00</span>
                        <span class="oriPri">¥96.00</span>
                    </div>
                    <p class="goodsDes">美国/SUPER MILD沐浴露500ml</p>
                </li>
                <li>
                    <img src="" alt="" class="goodsImg">
                    <div class="goodsPrice">
                        <span class="curPri">¥88.00</span>
                        <span class="oriPri">¥96.00</span>
                    </div>
                    <p class="goodsDes">美国/SUPER MILD沐浴露500ml</p>
                </li>
            </ul> -->
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper'
export default {
    data(){
        return {
        }
    },
    props:['goodslist'],
    mounted(){
        //vue中异步操作
        this.$nextTick(() => {
            let mySwiper = new Swiper('.swiper-container',{
                slidesPerView: 2.2,
                spaceBetween: 24,
            })   
        })
    },
    methods:{
        //跳转至详情页
        toDetail(id){
            this.$router.push({
                path:'/detail',
                query:{
                    id

                }
            })
        }
    }
}
</script>
<style scoped>
    .goodsUl{
        padding: 0 0.24rem;
    }
    /* .ul{
        padding:1px 0.2rem;
        overflow: hidden;
        display: flex;
    }
    .ul li{
        flex-shrink: 0;
        width: 3.24rem;
        height: 4.66rem;
        border: 1px solid #eee;
        background: #fff;
        margin-right: 0.24rem;
        padding: 0.24rem;
        box-sizing: border-box;
        color: #989898;
    } */
    .swiper-container {
        width: 100%;
        height: 4.66rem;
    } 
    .swiper-slide{
        /* width: 3.24rem;
        height: 4.66rem; */
        border: 1px solid #eee;
        background: #fff;
        margin-right: 0.24rem;
        padding: 0.24rem;
        box-sizing: border-box;
        color: #989898;
    }
    .swiper-slide:last-child{
         margin-right: 0;
     }
     .goodsImg{
         display: block;
         width: 100%;
         height: 3.1rem;
         /* border: 1px solid; */
         display: flex;
         justify-content: center;
         align-items: center;
         overflow: hidden;
     }
     .goodsImg>img{
         width: 80%;
         height: 80%;
     }
     .goodsPrice{
         display: flex;
         justify-content: space-between;
         align-items: center;
         margin-bottom: 0.15rem;
     }
     .curPri{
         font-size: 0.26rem;
         color: #e60012;
     }
     .oriPri{
         font-size: 0.22rem;
         text-decoration: line-through;
     }
     .goodsDes{
         font-size: 0.22rem;
         line-height: 0.4rem;
     }
</style>