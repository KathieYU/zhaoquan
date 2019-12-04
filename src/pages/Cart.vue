<template>
    <div id="cart">
        <div class="top"></div>
        <div class="topNav">
            <div class="back iconfont">&#xe6a8;</div>
            <div class="txt">购物车</div>
            <div></div>
        </div>
         <div class="cartMain">
            <div class="main" v-if='cartUl.length'>
                <div class="row" v-for="(item,index) in cartUl" :key="index">
                    <div class="storePos">
                        <span class="storeIcon"></span>
                        <span class="posTxt">杭州保税区</span>
                    </div>
                    <div class="buyDet">
                        <div class="checkOne" @click="oneChecked(index)"><span :class="item.checked?'oneChecked spImg':'spImg'" ></span></div>
                        <div class="det">
                            <div class="detImg"><img :src="item.showImgSrc" alt=""></div>
                            <div class="detDes">
                                <div class="detDesTxt">
                                    <p class="destxt">{{item.name}}
                                        <span class="spe">90粒装</span>
                                    </p>
                                </div>
                                <div class="detOpr">
                                    <span class="reduce" @click="reduce(index)">-</span>
                                    <input type="text" v-model="item.count">
                                    <span class="add" @click="add(index)">+</span>
                                </div>
                            </div>
                            <div class="detPrice">¥{{item.price*item.count}}</div>
                        </div>
                        <div class="del" @click="del(index)">删除</div>
                    </div>
                </div>
                <div class="btm">
                    <div class="opr">
                        <div class="checkAll" @click="allChecked()">
                            <div :class="isallChecked? 'caImg spImg allChecked':'caImg spImg'"></div>
                            <div class="caTxt">全选</div>
                        </div>
                        <div class="edit">
                            <div class="edImg spImg"></div>
                            <div class="edTxt">编辑</div>
                        </div>
                    </div>
                    <div class="total"><p>合计：{{total}}<br>（不含运费）</p></div>
                    <div class="toAcc">去结算</div>
                </div>
            </div>
            <div class="nothing" v-else>
                <div class="cartIcon iconfont">&#xe621;</div>
                <div class="cartMsg">购物车还是空的<br>快去逛逛吧～</div>
            </div>
        </div>
        <myTab></myTab>
    </div>
</template>
<script>
import myTab from '@/components/MyTab'
export default {
    data(){
        return {
            //购物车内是否有内容
            // show:true,
            count:1,
            cartUl:[], 
            isallChecked:false
        }
    },
    computed: {
        //也可以通过computed来监听变化
        //   show () {
        //       return !!this.cartUl.length
        //   },
        //合计
        total(){
            let total = 0
            this.cartUl.map((val,index)=>{
                if(val.checked){//选中计算总价
                    total += val.count*Number(val.price)
                }
            })
            return parseInt(total).toFixed(2)
        }
    },
    components:{
        myTab
    },
    mounted(){
        //判断用户是否登录
        let storage =  localStorage.getItem('username')
        // console.log(storage)
        if(storage==null){//用户未登录，拿出游客购物车缓存
            let otherUser = JSON.parse(localStorage.getItem('otherUser'));
            // console.log(otherUser)
            if(localStorage.getItem('otherUser')==null||otherUser.cartlist.length==0){//游客购物车为空,不渲染
                // this.show = false
                // console.log(this.show)
            }else{//游客购物车不为空，渲染购物车
                this.cartUl = otherUser.cartlist;
                // console.log(this.cartUl)
            }
        }else{//用户已登陆，拿出myUsers购物缓存
            let myUsers = JSON.parse(localStorage.getItem('myUsers'))
            // console.log(myUsers)
            myUsers.map((val,index)=>{
                if(val.username==storage){//目标用户
                    myUsers[index].myCart = val.myCart || [];
                    if(myUsers[index].myCart.length==0){//购物车为空,不渲染
                        // this.show = false;
                    }else{//购物车不为空，渲染用户购物车
                        this.cartUl = myUsers[index].myCart
                    }
                }
            })
        }

        //默认单选全部未选
        this.cartUl.map((val,index)=>{
            this.cartUl[index].checked = false
        })
        console.log(this.cartUl)
    },
    methods:{
        del(cartIndex){//删除
            let storage =  localStorage.getItem('username');
            if(storage==null){//未登录
                let otherUser = JSON.parse(localStorage.getItem('otherUser'));
                // console.log(otherUser)
                otherUser.cartlist.splice(cartIndex,1);
                this.cartUl = otherUser.cartlist
                console.log(this.cartUl)
                localStorage.setItem('otherUser',JSON.stringify(otherUser))
            }else{//已登录
                let myUsers = JSON.parse(localStorage.getItem('myUsers'))
                // console.log(myUsers)
                myUsers.map((val,index)=>{
                    if(val.username=storage){//目标用户
                        myUsers[index].myCart.splice(cartIndex,1);
                        this.cartUl = myUsers[index].myCart
                    }
                })
                localStorage.setItem('myUsers',JSON.stringify(myUsers))
            }

        },
        oneChecked(i){//单选
            this.cartUl[i].checked = !this.cartUl[i].checked
            console.log(this.cartUl)
            let flag = true;
            this.cartUl.map((val,index)=>{
                if(!val.checked){
                    flag = false
                }
            })
            if(!flag){//未全部选中
                this.isallChecked = false
            }else{//全部选中
                this.isallChecked = true
            }

        },
        allChecked(){//全选
            this.isallChecked = !this.isallChecked;
            if(this.isallChecked){
                this.cartUl.map((val,index)=>{
                    this.cartUl[index].checked = true
                })
            }else{
                this.cartUl.map((val,index)=>{
                    this.cartUl[index].checked = false
                })
            }
        },
        reduce(i){//减少数量
            if(this.cartUl[i].count==1){
                alert('不能再少啦～～')
            }else{
                this.cartUl[i].count--
            }
            let storage = localStorage.getItem('username');
            if(storage==null){//用户未登录，拿出游客购物车缓存
                let otherUser = JSON.parse(localStorage.getItem('otherUser'));
                otherUser.cartlist = this.cartUl
                localStorage.setItem('otherUser',JSON.stringify(otherUser))
            }else{//用户已登陆，拿出myUsers购物缓存
                let myUsers = JSON.parse(localStorage.getItem('myUsers'))
                myUsers.map((val,index)=>{
                    if(val.username==storage){//目标用户
                        myUsers[index].myCart = this.cartUl
                        localStorage.setItem('myUsers',JSON.stringify(myUsers))
                    }
                })
            }
        },
        add(i){//增加数量
            this.cartUl[i].count++;
            let storage = localStorage.getItem('username');
            if(storage==null){//用户未登录，拿出游客购物车缓存
                let otherUser = JSON.parse(localStorage.getItem('otherUser'));
                otherUser.cartlist = this.cartUl
                localStorage.setItem('otherUser',JSON.stringify(otherUser))
            }else{//用户已登陆，拿出myUsers购物缓存
                let myUsers = JSON.parse(localStorage.getItem('myUsers'))
                myUsers.map((val,index)=>{
                    if(val.username==storage){//目标用户
                        myUsers[index].myCart = this.cartUl
                        localStorage.setItem('myUsers',JSON.stringify(myUsers))
                    }
                })
            }
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
        width: 100%;
        height: 1rem;
        padding: 0 0.3rem;
        box-sizing: border-box;
        background: #ff9900;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .back,.txt{
        font-size: 0.4rem;
        color: #fff
    }
    /* 购物车 */
    .cartMain{
        width: 100%;
        /* position: relative; */
    }
    .main{
        padding-bottom: 2.2rem;
    }
    .nothing{
        width: 100%;
        height: 11rem;
        background: #fafafa;
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    .cartIcon{
        font-size: 1rem;
        color: #666;
        margin-bottom: 0.4rem;
        margin-top: 3.3rem;
    }
    .cartMsg{
        font-size: 0.3rem;
        color: #333;
    }
    .row{
        padding-left: 0.4rem;
    }
    .row:nth-child(2n-1){
        background: #fafafa
    }
    .rwo:nth-child(2n){
        background: #f7f7f7;
    }
    .storePos{
        width: 100%;
        height: 1.2rem;
        display: flex;
        align-items: center;
    }
    .storeIcon{
        width: 0.5rem;
        height: 0.5rem;
        background: url('../assets/images/baoshui.png');
        background-size: cover;
        margin-right: 0.36rem;
    }
    .posTxt{
        font-size: 0.26rem;
        color: #999;
    }
    .buyDet{
        width: 100%;
        height: 1.6rem;
        padding-bottom: 0.4rem;
        display: flex;
        font-size:0.24rem;
        align-items: stretch
    }
    .checkOne{
        width: 0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .checkOne>span{
        width: 0.5rem;
        height: 0.5rem;
        padding: 0 0.2rem;
        background: url(../assets/images/img.png) no-repeat;
        background-size: 0.5rem;
        background-position: 0 -2rem;
    }
    .oneChecked{
        background-position: 0 0 !important;
    }
    .det{
        width:6rem;
        display: flex;
    }
    .detImg{
       width: 1.6rem;
        height: 1.6rem;
        overflow: hidden
    }
    .detImg img{
        width: 1.6rem;
        height: 1.6rem;
    }
    .detDes{
        width:2.8rem;
        padding: 0 0.2rem;
    }
    .detDesTxt{
        font-size: 0.3rem;
        line-height: 0.44rem;
        margin-bottom: 0.3rem;
        overflow: hidden;
    }
    .destxt{
        position: relative;
        display: -webkit-box;
        -webkit-line-clamp:2;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;

    }
    .destxt::after{
        content: '...';
        display: block;
        font-size: 0.3rem;
        position:absolute;
        right: 0;
        bottom: 0;
        padding-right: 1.92rem;
        background: #fafafa;
    }
    .spe{
        font-size: 0.24rem;
        color: #999;
        position:absolute;
        right: 0;
        bottom: 0;
        padding-right: 0.78rem;
        background: #fafafa;
        z-index: 2;
    }
    .detOpr{
        width: 2.4rem;
        height: 0.46rem;
        border: 1px solid #eee;
        box-sizing: border-box;
        display: flex;
        align-items: stretch;
    }
    .detOpr input{
        width: 0.8rem;
        border: none;
        outline: none;
        background: transparent;
        text-align: center;
        line-height: 0.44rem;
        font-size: 0.26rem;
        color: #666
    }
    .detOpr span{
       width: 0.8rem;
       text-align: center;
       line-height: 0.44rem;
       font-size: 0.26rem;
       color: #666
    }
    .reduce{
        border-right: 1px solid #eee;
    }
    .add{
        border-left: 1px solid #eee;
    }
    .detPrice{
        width: 0.9rem;
        padding: 0 0.05rem;
        font-size: 0.38rem;
        color: #333;
        text-align: center;
        line-height: 1.6rem;
    }
    .del{
        width: 1rem;
        text-align: center;
        line-height: 1.6rem;
        background: #ff9900;
        color: #fff;
        font-size: 0.3rem;
    }
    /* 底部结算栏 */
    .btm{
        width: 100%;
        height: 1.14rem;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        background:#fff;
        font-size: 0.24rem;
        position: fixed;
        bottom: 0;
        margin-bottom: 1.04rem;
        display: flex;
        z-index: 100;
    }
    .btm>div{
        flex: 1;
    }
    .opr{
        font-size: 0.28rem;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .spImg{
        width: 0.5rem;
        height: 0.5rem;
        background: url(../assets/images/img.png) no-repeat;
        background-size: 0.5rem;
    }
    .caImg{
        background-position: 0 -2rem;
    }
    .allChecked{
        background-position: 0 -1.5rem!important;
    }
    .edImg{
        background-position: 0 -0.5rem;
    }
    .total{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .total p{
        line-height: 0.28rem;
        color: #999;
    }
    .toAcc{
        line-height: 1.14rem;
        background: #ff5500;
        color: #fff;
        text-align: center;
        font-size: 0.4rem;
    }

</style>