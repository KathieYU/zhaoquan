<template>
  <div class="shopIndex">
      <div class="topBanner">
        <div class="search">
            <input type="text" placeholder="Montagne jeunesse" class="srchInp">
            <span class="iconfont srchicon">&#xe613;</span>
        </div>
      </div>
      <!-- 主页列表 -->
      <div class="list" v-if='dataclassify.length'>
        <div class="indexList" v-for='(item, index) in dataclassify' :key='index'>
          <div class="title">
            <div :class="getClass(index)"></div>
            <div class="titleTxt">{{item.name}}</div>
          </div>
          <indexList :goodslist='item.list'></indexList>
        </div>
      </div>
      <!-- myTab -->
      <div class="myTab">
        <myTab></myTab>
      </div>
  </div>
</template>

<script>
import indexList from '@/components/IndexList';
import myTab from '@/components/MyTab';
export default {
  data () {
    return {
      dataclassify:[]
    }
  },
  components:{
    indexList,
    myTab
  },
  created () {
     this.$http({
      url:'http://yd.msword.top/getIndexData',
    }).then(res=>{
      // console.log(res.data.data)
      this.dataclassify = res.data.data
    })
  },
  methods:{
    getClass(n){
      switch (n){
        case 0 :return 'crazyday indexIcon';break;
        case 1 :return 'motherbaby indexIcon';break;
        case 2 :return 'makeups indexIcon';break;
        case 3 :return 'homelife indexIcon';break;
        case 4 :return 'foods indexIcon';break;
        case 5 :return 'global indexIcon';break;
        default: return'indexIcon' ;
      }
    }
  }
}
</script>

<style scoped>
  .shopIndex{
    width:100%;
    background: #fafafa;
  }
  .topBanner{
    width:100%;
    height:5.2rem;
    background:url('../assets/images/indexbanner.jpg') no-repeat;
    background-size: cover;
    font-size:.26rem;
    overflow:hidden;
  }
  .search{
    width:5.16rem;
    height:0.62rem;
    margin:0.66rem auto;
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

  /* 主页列表 */
    .indexList{
        font-size: .16rem;
        line-height: 1;
    }
    .title{
        /* width: 100%; */
        height: .96rem;
        display: flex;
        align-items: center;
        padding:1px 0.2rem;
        color: #6c6c6c;
        font-size: 0.28rem;
    }
    .indexIcon{
        width: .5rem;
        height: .94rem;
        background: url('../assets/images/indexIcon.png') no-repeat;   
        background-size: cover; 
    }
    .crazyday{
        background-position: 0 -2.82rem;
    }
    .motherbaby{
      background-position: 0 -3.76rem;
    }
    .makeups{
      background-position: 0 -4.7rem;
    }
    .homelife{
      background-position: 0 0;
    }
    .foods{
      background-position: 0 -0.94rem;
    }
    .global{
      background-position: 0 -1.88rem;
    }

/* myTab */
  .myTab{
    height: 1rem;
    border-top: 1px solid #eee;
    margin-top: 0.22rem;
    z-index: 100;
  }
</style>
