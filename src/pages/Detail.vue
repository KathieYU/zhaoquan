<template>
    <div id="detail">
        <div class="top"></div>
        <div class="topOprBtn">
           <div class="back" @click="backIndex"><i class="iconfont">&#xe6a8;</i></div>
            <div class="tocart" @click="tocart"><i class="iconfont">&#xe63f;</i></div>
            <div class="more"><i class="iconfont">&#xeb30;</i></div> 
        </div>
        <!-- 轮播图 -->
        <div class="swiper">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in goodsDetail.swiperImgArr" :key='index'><img :src="item"></div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <!-- 商品信息 -->
        <div class="des">
                <div class="row1">
                    <div class="destxt">{{goodsDetail.name}}</div>
                    <div class="clo">
                        <div class="cloIcon"><i class="iconfont">&#xe645;</i></div>
                        <div class="cloTxt">收藏</div>
                    </div>
                </div>
                <div class="row2">
                    <div class="price">
                        <div class="curPrice">¥{{parseInt(goodsDetail.reduct_price).toFixed(2)}}</div>
                        <div class="oriPrice">¥{{parseInt(goodsDetail.original_price).toFixed(2)}}</div>
                    </div>
                    <div class="discountserve">
                        <div class="dis">
                            <span class="discount">{{(goodsDetail.allowance*10).toFixed(1)}}折</span>
                            <span class="discount" v-if='goodsDetail.isFreeShip'>包邮</span>
                        </div>
                        <div class="serv">
                            <span class="otherService" v-for="(item,index) in goodsDetail.describe" :key='index'>{{item}}</span>
                        </div>
                    </div>
                </div>   
        </div>
        <!-- whitespace -->
        <div class="whitespace"></div>
        <!-- 商品详情 -->
        <div class="detail">
            <div class="detTop">
                <nav class="detNav">
                    <router-link :to='{path:"/detail/goods",query:{"id":goodsDetail.pid}}' active-class="active">商品详情</router-link>
                    <router-link :to='{path:"/detail/comments",query:{"id":goodsDetail.pid}}' active-class="active">买家口碑</router-link>
                </nav>
            </div>
            <router-view/>
        </div>
        <!-- 详情页用户操作 -->
        <div class="userOpr">
            <div class="total">总价：<i class="totalPrice">¥{{totalPrice}}</i></div>
            <div class="addToCart" @click="addCart">加入购物车</div>
            <div class="buyNow">立即购买</div>
            <!-- <div class="buyCover">
                <div class="goodsDet">
                    <img src="" alt="">
                </div>
            </div> -->
        </div>
        <!-- 挑选商品弹窗 -->
        <div class="cover" v-show="show" v-if='goodsDetail.pid'>
            <div class="ups">
                <div class="showDet clearfix">
                    <div class="showImg"><img :src="goodsDetail.swiperImgArr[0]" alt=""></div>
                    <div class="showOther">
                        <div class="showPri">¥ {{parseInt(goodsDetail.reduct_price).toFixed(2)}}</div>
                        <div class="showNum">库存{{goodsDetail.total}}件</div>
                        <div class="showMsg">请选择商品属性</div>
                    </div>
                    <div class="cancelShow iconfont" @click="cancelShow">&#xe690;</div>
                </div>
                <div class="buyNum">
                    <div class="buyTxt">购买数量</div>
                    <div class="num">
                        <span class="reduce" @click="reduceN()">-</span>
                        <input type="text" v-model="count">
                        <span class="add" @click="addN()">+</span>
                    </div>
                </div>
                <div class="form" v-for="(item,index) in form" :key="index">
                    <div class="formTitle">{{item.name}}</div>
                    <div class="formCon">
                        <span v-for="(val,key) in item.list" :key="key" @click="selForm(index,item.name,val.name,val.flag,key)" :class="val.flag?'selActive':''">{{val.name}}</span>
                    </div>
                </div>
                <input type="hidden" v-model="pid">
            </div>
        </div>    

    </div>
</template>
<script>
import Swiper from 'swiper'; 
export default {
    data(){
        return {
            goodsDetail:{},
            show:false,
            count:1,
            form:[],
            pid:''
        }
    },
    mounted(){
        setTimeout(() => {
            let mySwiper = new Swiper('.swiper-container', { 
                pagination: {
                el: '.swiper-pagination',
                },
                autoplay:true
            });
        }, 0);
        // console.log(this.$route.query)
        this.$http({
            url:'http://yd.msword.top/getDetails?pid='+this.$route.query.id
        }).then(res=>{
            // console.log(res.data.data)
            this.goodsDetail = res.data.data;
            this.pid = this.goodsDetail.pid;
            //补充商品规格
            this.goodsDetail.buySelect.map((val,index)=>{
                let f_list = {}
                f_list.name = val.name
                f_list.list = []
                val.list.map((v,i)=>{
                    let json = {};
                    json.name = val.list[i];
                    json.flag = false;
                    f_list.list.push(json)
                })
                this.form.push(f_list)
            })
            // console.log(this.form)
        })
    },
    methods:{
        addCart(){//打开弹窗
            if(!this.show){//如果弹窗未打开时打开
                this.show = true; 
            }else{//弹窗已打开时，加入购物车
                //判断是否已选商品规格
                let isSle  = Boolean;
                this.form.map((val,index)=>{
                    isSle= val.list.some((v,i)=>{
                        return v.flag
                    })
                })
                if(!isSle){//商品规格未选
                    alert('请选择正确的商品规格')
                }else{//商品规格已选，将选择提交到购物车缓存
                    let users = JSON.parse(localStorage.getItem('myUsers')) //取出购物车缓存
                    let username = localStorage.getItem('username')  //取出用户登录信息
                    if(users){//已登录，直接加到用户购物车
                        let myUsers = users;
                        // console.log(myUsers)
                        let goods = {//此次添加购物车的商品id 数量和规格
                            pid:this.pid,
                            count:Number(this.count),
                            goodsForm:this.form,
                            name:this.goodsDetail.name,
                            price:this.goodsDetail.reduct_price,
                            showImgSrc:this.goodsDetail.swiperImgArr[0]
                        }
                        myUsers.map((val,index)=>{
                            if(val.username==username){//找到特定用户的购物车
                                myUsers[index].myCart = val.myCart || []; 
                                // console.log(myUsers[index].myCart)
                                //判断购物车内是否已有同种商品
                                if(myUsers[index].myCart.length==0){//购物车为空，直接添加商品
                                    myUsers[index].myCart.push(goods); 
                                }else{//购物车已有商品
                                    let cartGoods = {
                                        index: -1,
                                        count: 0
                                    };
                                    
                                     val.myCart.map((v,i)=>{
                                        if (v.pid == goods.pid) {
                                            cartGoods.index = i;
                                            cartGoods.count = v.count
                                        }
                                    })
                                    if (cartGoods.index === -1) {
                                        //不同品种，直接追加到购物车
                                        myUsers[index].myCart.push(goods); 
                                    } else {
                                        //同种商品，数量叠加
                                        goods.count = goods.count + cartGoods.count;
                                        myUsers[index].myCart.splice(cartGoods.index,1,goods)
                                    }
                                }
                            }
                        })
                        localStorage.setItem('myUsers',JSON.stringify(myUsers))


                    }else{//未登录，全部加入游客购物车
                    //先取出游客缓存
                        let otherUser = JSON.parse(localStorage.getItem('otherUser')) || null;
                        let goods = {
                            pid:this.pid,
                            count:Number(this.count),
                            goodsForm:this.form,
                            name:this.goodsDetail.name,
                            price:this.goodsDetail.reduct_price,
                            showImgSrc:this.goodsDetail.swiperImgArr[0]
                        }
                        if(otherUser ==null){//如果游客购物车为空，直接放到游客购物车
                            otherUser = {};
                            otherUser.cartlist = [];
                            otherUser.cartlist.push(goods)
                        }else{//游客购物车不为空，判断购物车是否有相同商品
                            let cartGoods = {
                                index: -1,
                                count: 0
                            };
                            otherUser.cartlist.map((val,index)=>{
                                if (val.pid == goods.pid) {
                                    cartGoods.index = index;
                                    cartGoods.count = val.count
                                }
                            })
                            if (cartGoods.index === -1) {
                                //不同品种，直接追加到购物车
                                otherUser.cartlist.push(goods); 
                            } else {
                                //同种商品，数量叠加
                                goods.count = goods.count + cartGoods.count;
                                otherUser.cartlist.splice(cartGoods.index,1,goods)
                            }
                        }
                        localStorage.setItem('otherUser',JSON.stringify(otherUser))
                    }
                    //提交成功后关闭弹窗
                    this.show = false;

                }
                
            }
           
        },
        cancelShow(){//关闭弹窗
            this.show = false;
        },
        addN(){//购买数量+1
            this.count++
        },
        reduceN(){//购买数量-1
            if(this.count==1){
                alert('不能再少了')
            }else{
                this.count--
            }
        },
        selForm(itemIndex,itemName,valName,valFlag,valIndex){//选择规格
            // console.log(itemIndex,itemName,valName,valFlag,valIndex)
            this.form.map((val,index)=>{
                if(val.name==itemName){//判断规格
                    val.list.map((v,i)=>{
                        v.flag = false;
                    })
                }
            })
            this.form[itemIndex].list[valIndex].flag = true;
           
        },
        backIndex(){//返回首页
            this.$router.push({path:'/index'})
        },
        tocart(){//去购物车
            this.$router.push({path:'/cart'})
        }
    },
    computed:{
        totalPrice(){
            let totalPrice = 0;
            if(this.show){
                //规格全选后计算总价
                let isSle  = Boolean;
                this.form.map((val,index)=>{
                    isSle= val.list.some((v,i)=>{
                        return v.flag
                    })
                })
                if(isSle){
                    totalPrice = Number(this.goodsDetail.reduct_price)*this.count
                }
            }
             
            return totalPrice.toFixed(2)
        }
    }
}
</script>
<style scoped>
    #detail{
        padding-top: 0.4rem;
        padding-bottom:1rem; 
    }
    .top{
        width: 100%;
        height: 0.4rem;
        background: #ff9900;
        position: fixed;
        top: 0;
        z-index: 101;
    }
    .topOprBtn{width: 100%;height: 0.7rem;z-index: 200;position: fixed;background: #fff}
    .back,.tocart,.more{
        width: 0.5rem;
        height: 0.5rem;
        background: #b2b2b2;
        border-radius: 50%;
        color: #fff;
        font-size: 0.3rem;
        line-height: 0.5rem;
        text-align: center;
        position: absolute;
        z-index: 100;
        top:0.1rem;
    }
    .back{
        left: 0.28rem;
    }
    .tocart{
        right: 1.2rem;
    }
    .more{
        right: 0.28rem
    }
    /* 轮播图 */
    .swiper{
        position: relative;
        border-bottom: 1px solid #eee;
    }
    .swiper-container {
        width: 100%;
        height: 5.44rem;
    }  
    .swiper-slide{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .swiper-slide img{
        width: 80%;
        height: 85%;
    }
    
    /* 商品描述 */
    .des{
        height: 1.82rem;
        padding: 0.1rem 0.24rem;
        box-sizing: border-box;
    }
    .row1{
        display: flex;

    }
    .destxt{
        flex: 8.5;
        font-size: 0.28rem;
        line-height: 0.38rem;
        color: #333;
        border-right: 1px solid #eee;
        padding-right: 0.5rem
    }
    .clo{
        flex: 1.5;
        text-align: center;
        color: #e71f19;
        display: flex;
        flex-direction: column;
    }
    .cloIcon{
        font-size: 0.16rem;
        /* margin-bottom: 0.15rem; */
    }
    .iconfont{
        font-size: 0.4rem;
    }
    .cloTxt{
        font-size: 0.16rem;
    }
    .row2{
        font-size: 0.28rem;
        display: flex;
    }
    .curPrice{
        color: #e71f19;
        margin-right: 0.3rem;
    }
     .oriPrice{
        text-decoration: line-through;
        color: #999;
        font-size: 0.2rem;
    }
    .dis{
        color: #fff;
        line-height: .3rem;
        margin-bottom: 0.14rem;
    }
    .discount{
        padding: 0 0.15rem;
        font-size: 0.2rem;
        background: #ff9900;
        margin-right: 0.1rem;
    }
    .serv{
        color: #ff9900;
        font-size: 0.2rem;
        line-height: 0.28rem;
    }
    
    .otherService{
        padding: 0 0.1rem;
        margin-right: 0.1rem;
        border: 1px solid #ff9900;
    }
    .whitespace{
        height: 0.3rem;
        background: #eee;
    }
    /* 商品详情 */
    .detTop{
        height: 0.7rem;
        padding: 0.1rem 0;
    }
    .detNav{
        width: 100%;
        height: 0.7rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .detNav a{
        height: 0.5rem;
        font-size: 0.22rem;
        line-height: 0.5rem;
        padding: 0 0.25rem
    }
    .active{
        color: #ff9900;
        border-bottom: 1px solid #ff9900;
    }
    /* 用户操作 */
    .userOpr{
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: stretch;
        font-size: 0.28rem;
        text-align: center;
        line-height: 1rem;
        position: fixed;
        bottom: 0;
        z-index: 101;
    }
    .total{
        flex: 4.6;
        color: #999;
        padding-left: 0.3rem;
        text-align: left;
        background: #fff;
    }
    .totalPrice{
        color: #e71f19;
        font-style: normal;
    }
    .addToCart{
        flex: 2.7;
        background: #ff9900;
        color: #fff;
    }
    .buyNow{
        flex: 2.7;
        background: #eb2222;
        color: #fff;
    }
    /* 购买选项(弹出层) */
    .cover{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 100;
    }
    .ups{
        width: 100%;
        height: 5.8rem;
        padding:0 0.4rem;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        background: #fff;
        position: fixed;
        bottom: 1rem;
        font-size: 0.24rem;
    }
    .showDet{
        height: 1.88rem;
        /* overflow: hidden; */
    }
    .showImg{
        width: 2rem;
        height: 2rem;
        border: 0.1rem solid #eee;
        float: left;
        margin-top: -0.32rem;
        z-index: 1000;
    }
     .clearfix:after{
        content: "";
        display: block;
        height: 0;
        clear:both;
    }
    .showImg img{
        width: 100%;
        height: 100%;
    }
    .showOther{
        float: left;
        margin: 0.66rem 0 0 0.22rem;
    }
    .showPri{
        font-size: 0.26rem;
        color: #eb2222;
        line-height: 0.36rem;
    }
    .showNum,.showMsg{
        font-size: 0.24rem;
        line-height: 0.34rem;
        color: #333;
    }
    .cancelShow{
        width: 0.6rem;
        height: 0.6rem;
        float: right;
        margin-top: 0.3rem;
        color: #999;
        font-size: 0.58rem;
        line-height: 0.6rem;
        text-align: center;
    }
    .buyNum{
        width: 100%;
        height: 0.78rem;
        line-height: 0.78rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.2rem;

    }
    .buyTxt{
        font-size: 0.3rem;
        color: #333;
    }
    .num{
        width: 2rem;
        height: 0.5rem;
        line-height: 0.5rem;
        display: flex;
        border: 1px solid #eee;
        align-items: stretch;
        text-align: center;
    }
    .add{
        width: 0.5rem;
        background: #999;
        color: #fff;
    }
    .reduce{
        width: 0.5rem;
        background: #999;
        color: #fff;
    }
    .num>input{
        width: 1rem;
        color: #333;
        border: none;
        outline: none;
        text-align: center;
    }
    .form .formTitle{
        line-height: 0.5rem;
        font-size: 0.3rem;
        color: #333
    }
    .formCon{
        line-height: 0.8rem;
    }
    .formCon span{
        padding: 0 0.25rem;
        background: #ddd;
        color: #fff;
        font-size: 0.24rem;
        line-height: 0.5rem;
        border-radius: 0.1rem;
        margin-right: 0.2rem;
    }
    .selActive{
        background: #ff9900!important;
    }
    
</style>