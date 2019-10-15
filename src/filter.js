import router from "./router"
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
    //根据字段判断是否路由过滤
    if (to.matched.some(record => record.meta.auth)) {
      if (localStorage.getItem("admin")) {
        next()
      } else {
        //防止无限循环
        if (to.name === '/login') {
          next();
          return
        }
        
        
        alert("请先登录")
        
        next({
          path: '/login',
        });
      }
    } else {
      next()//若点击的是不需要验证的页面,则进行正常的路由跳转
    }
  });