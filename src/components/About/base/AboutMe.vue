<template>
    <div class="about-me b-r b-s">
        <h1>关于我</h1>
        <p>
            大家好，欢迎来到我的小家，这是我的个人博客，现在负责整理网站内容的主要是我的妈妈，我的妈妈是一名前端设计师，这个博客就是她设计的。

妈妈一直想给我做一个关于我的个人博客，从我出生到现在，我已经三岁半了，妈妈才行动起来。妈妈说，无论什么时候开始，都不晚，这是一个伴随我成长，最重要的，也是最值得珍惜的礼物。

整理照片也是一个琐碎的事情，妈妈一直想挑选照片出来，拿去照相馆洗出来，但是我照片那么多，估计一个星期都挑不出来，洗照片还得用一个大大的相册，哈哈，这回省事儿了，妈妈做了这样的一个博客，不用洗照片了，而且以后整理照片也方便了很多。

还有一点很重要的是，我的爷爷，奶奶，姥姥，姥爷，爸爸妈妈的朋友们都可以很方便的看到我的照片，视频，了解我最近的生活学习。他们也不用下载APP，直接输入我的个人博客网站地址就能访问了。


做一个个人博客很简单，但要持久的做一件事情却不简单！等我长大了，我也会更新下去，因为妈妈说，这是一个非常有意义的持久的接力赛，我是可以完成的。
        </p>
        <div class="img-wrap">
            <img src="https://www.daiyiyang.com/d/file/p/2018/09-15/408032b4c3b8d3e8f78d6febbd277d6a.jpg" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    }
}
</script>
<style scoped>
.about-me{

    width:700px;
    height: 1125px;
    float: left;
    background-image: linear-gradient(135deg, rgb(194, 255, 216) 10%, rgb(70, 94, 251) 100%);
    padding: 20px;
    box-shadow: 0 8px 8px rgba(10, 16, 20, .24), 0 0 8px rgba(10, 16, 20, .12);
}
.about-me h1{
    text-shadow: 0 0 10px black;
    font-size: 30px;
    letter-spacing: 8px;
    color: #fff;
}
.about-me p{
    line-height: 40px;
    text-shadow:  0 0 5px #1f7994;
    letter-spacing: 2px;
}
.img-wrap{
   text-align: center;

}
.img-wrap>img{
    border-radius: 5px;
    transform: translateY(70px);
}
</style>