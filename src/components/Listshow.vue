<template>
    <div class="listshow">
        <ul>
            <li v-for="(item,index) in goods" :key="index">
                <div class="classifyIcon">
                    <img :src="item.thumbnail">
                </div>
                <div class="classifyTxt">{{item.name}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:['goods']
}
</script>
<style scoped>
    .listshow ul{
        display: flex;
        flex-wrap: wrap
    }
    .listshow ul li{
        width: 2.3rem;
        height: 2.4rem;
        box-sizing: border-box;
        border: 1px solid #1d84a7;
        border-radius: 0.1rem;
        overflow: hidden;
        margin: 0.2rem 0 0 0.2rem;
        
    }
    .classifyIcon{
        width: 100%;
        height: 1.88rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .classifyIcon>img{
        width: 85%;
        height: 85%;
    }
    .classifyTxt{
        height: 0.5rem;
        background: #1d84a7;
        font-size: 0.22rem;
        color: #fff;
        line-height: 0.5rem;
        letter-spacing: 1em;
        text-align: center;
    }
</style>