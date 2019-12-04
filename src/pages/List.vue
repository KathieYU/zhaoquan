<template>
    <div class="list">
        <div class="topsrch">
            <div class="search">
                <input type="text" placeholder="Montagne jeunesse" class="srchInp">
            <span class="iconfont srchicon">&#xe613;</span>
            </div>
        </div>
        <div class="display">
            <!-- 商品主类目 -->
            <div class="classify">
                <ul>
                    <li @click='tabSwitch(index)' v-for="(item,index) in goodsclassify" :key='index' :class="item.flag?'active':''">{{item.name}}</li>
                </ul>
            </div>
            <!-- 类目展示 -->
            <div class="show">
                <list :goods='goods'></list>
            </div>
        </div>
        <myTab></myTab>
    </div>
</template>
<script>
import list from '@/components/Listshow';
import myTab from '@/components/MyTab';
export default {
    data(){
        return {
            goodsclassify:[],
            //分类商品列表
            goods:[]
        }
    },
    components:{
        list,
        myTab
    },
    methods:{
        tabSwitch(i){//tab切换改变当前样式
            // console.log(i.flag)
            this.goodsclassify.map((val,index)=>{
                val.flag = false;
            })
            this.goodsclassify[i].flag = true;
            // console.log(this.goodsclassify)
            this.goodsclassify.map((val,index)=>{
                if(val.flag){this.goods=val.list}
            })
        }
    },
    created(){
        this.$http({//获取分类页数据
            url:'http://yd.msword.top/getClassify'
        }).then(res=>{
            // console.log(res.data.data)
            this.goodsclassify = res.data.data;
            this.goodsclassify.map((val,index)=>{//给分类加上flag属性识别，默认第一个选中
                if(index==0){val.flag = true}
                else{val.flag = false}
            })  
            this.goodsclassify.map((val,index)=>{//选中类目展示商品
                if(val.flag){this.goods=val.list}
            })
        });
        
    }
}
function tabSwitch(){}
</script>
<style scoped>
    .list{
        width: 100%;
    }
    .topsrch{
        padding-top: 0.58rem;
        box-sizing: border-box;
        background: #ff9900;
        overflow: hidden;
        height: 1.38rem;
    }
    .search{
    width:5.16rem;
    height:0.62rem;
    margin:0 auto;
    background:rgba(255, 255, 255, 0.5);
    border-radius: 0.15rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .srchInp{
      width: 100%;
    padding-left: .2rem;
    line-height: 0.62rem;
    font-size: 0.26rem;
    background: transparent;
    border: none;
    outline: none;
  }
  .srchicon{
    margin-right: 0.2rem;
    text-align: center;
    font-size: 0.26rem;
    line-height: 0.62rem;
    color: #666;
  }
  /* 分类展示 */
  .display{
      font-size: 0.16rem;
      line-height: 0.16rem;
      display: flex;
  }
  .classify{
      flex: 0.8;
      background: #efeeee;
  }
  .classify ul{
      width: 100%
  }
  .classify ul li{
      width: 100%;
      height: 0.94rem;
      box-sizing: border-box;
      line-height: 0.94rem;
      font-size: 0.28rem;
      color: #333;
      text-align: center;
  }
  .active{
      border-left: 0.1rem solid #1d84a7;
      color: #ff9900;
      background: #fff;
  }
  .show{
      flex: 2.2;
  }
</style>