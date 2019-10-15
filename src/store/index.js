import vuex from 'vuex'
import Vue from 'vue'
Vue.use(vuex)
import axios from 'axios'



export default new vuex.Store({
    state:{
    allcommentinfo:JSON.parse(localStorage.getItem("allcinfo")),
    title:localStorage.getItem("gethappys"),
    getindex:localStorage.getItem("getindexinfo"),
    allcustominfo:JSON.parse(localStorage.getItem("allcustom")),
    getadmin:localStorage.getItem("admin")||"",
    navindex:localStorage.getItem("getindex")||0,
    UserList:JSON.parse(localStorage.getItem("allList"))||[],
    username:""
    },
    mutations:{
        getcommentinfo(state,value){
                state.allcommentinfo = value;
                localStorage.setItem("allcinfo",JSON.stringify(value));
        },
        gethappy(state,value){
            state.title = value;
            localStorage.setItem("gethappys",value);
        },
        getindexes(state,value){
            state.getindex = value;
            localStorage.setItem("getindexinfo",value)
        },
        getcustomentinfo(state,value){
            state.allcustominfo = value;
            localStorage.setItem("allcustom",JSON.stringify(value))
        },
        setadmin(state,value){
            state.getadmin = value;
            localStorage.setItem("admin",value);
        },
        getnav(state,value){
            state.navindex = value;
            localStorage.setItem("getindex",value)
        },
        getuserlist(state,value){
            state.UserList = value;
            localStorage.setItem("allList",JSON.stringify(value));
        },
        getusers(state,value){
            state.username = value
        }
        
    },
    actions:{
            getcomment(ctx){
                return new Promise((reslove,rej)=>{
                    axios.post("/api/allcomment").then(mes=>{
                        ctx.commit("getcommentinfo",mes.data);
                        reslove();
                    })
                })
            },
            getcustoment(ctx){
                return new Promise((reslove,rej)=>{
                    axios.get("/api/allcustoment").then(mes=>{
                        ctx.commit("getcustomentinfo",mes.data);
                        reslove();
                    })
                })
            },
            getUserList(ctx){
                return new Promise((reslove,rej)=>{
                    axios.get("/api/alluserlist").then(mes=>{
                        ctx.commit("getuserlist",mes.data);
                        reslove();
                    })
                })
            }
    },
    getters:{

    }
})