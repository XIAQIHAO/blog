import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Happy from '@/components/Happy/happy'
import About from '@/components/About/about'
import Message from '@/components/Message/message'
import Login from '@/components/Login/login'
import Register from '@/components/Register/register'
import UserCenter from '@/components/UserCenter/usercenter'
import Time from '@/components/Time/time'
import UserList from '@/components/UserCenter/base/userlist'
import sightseeing from '@/components/UserCenter/base/sightseeing'
import Happying from '@/components/Happy/base/Happying'
import Happyinfo from '@/components/Happy/base/HappyInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
   {
     path:'/happy',
     name:'Happy',
     component:Happy,
     children:[
       {
         path:'happying',
         component:Happying
       },
       {
         path:'happyinfo',
         component:Happyinfo
       },
      
     ],
     redirect:"/happy/happyinfo"
   },
    {
      path:'/about',
      name:'About',
      component:About
    },
    {
      path:'/time',
      name:'Time',
      component:Time

    },
    {
      path:'/message',
      name:'Message',
      component:Message
    },
    {
      path:'/UserCenter',
      name:'UserCenter',
      component:UserCenter,
      children:[
        {path:'userlist',component:UserList},
        {path:'sightseeing',component:sightseeing}
        
      ],redirect:"/usercenter/userlist",
      meta:{auth:true},
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    }



  ]
})
