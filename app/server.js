const express = require('express')
const mongoose = require('mongoose')
let app = express()
const publish = require("./Schema/comment")
const custom = require("./Schema/customcomm")
const userlist = require("./Schema/setUser")
const disscuss = require("./Schema/discuss")
//默认中间件
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//连接数据库
mongoose.connect("mongodb://localhost:27017/blog",{useNewUrlParser:true}).then(()=>{
                console.log("数据库连接成功");
                app.listen(5000,()=>{
                    console.log("node服务器已开启,成功监听5000端口");
                })
}).catch(err=>{
    if(err)throw err
    console.log("数据库连接失败");
});


//添加旅游数据
app.post("/comment",(req,res)=>{
    let comments = req.body;
    publish.create(
        {
            title:comments.title,
            desc:comments.descinfo,
            imges:comments.imges,
            date:new Date().toLocaleString()
            
        }
    ).then(()=>{
        console.log("添加成功");
        res.send({erro:1})
        
    }).catch(erro=>{
        if(erro) throw erro
         console.log("添加失败");
         res.send({erro:0});
    })
})


//获取旅游数据
app.post("/allcomment",(req,res)=>{
    publish.find().then(mes=>{
        res.send(mes);
    })
})

//发评论
app.post("/getdesc",(req,res)=>{
 
    let whatever = {title:req.body.title};

    let updates = {descdate:req.body.descdate,commentuser:req.body.commentuser,comment:req.body.comment}
    console.log(updates);
    publish.updateOne(whatever,updates,(err,res)=>{
        if(err){
            console.log(err)
        }else{
            console.log(res);
           
        }
    }) 

});

//发表评论
app.post("/getcomment",(req,res)=>{
    let {username,imgUrl,desces,date} = req.body;

    custom.create({username,imgUrl,desces,date}).then(()=>{
        console.log("添加成功");
        res.send({ernno:1});
    }).catch(()=>{
        console.log("添加失败");
        res.send({ernno:0});
    })

});

//获取评论信息
app.get("/allcustoment",(req,res)=>{
    custom.find().then(mes=>{
        if(mes){
            console.log(mes);
            res.send(mes);
        }else{
            console.log('查询失败');
            
        }
    })
});


//删除评论
app.post("/deleteinfo",(req,res)=>{
            let {date} = req.body;
                custom.deleteOne({date}).then(()=>{
                    console.log("删除成功");
                    res.send({errno:1})
                }).catch(()=>{
                    console.log("删除失败");
                    res.send({errno:0});
                })
})



//注册
app.post("/setuser",(req,res)=>{
    let {username,age,password,date} = req.body
    userlist.findOne({username}).then(mes=>{
        if(mes){
            res.send({errno:2})
            console.log("该用户已注册");
            

        }else{
            userlist.create({username,age,password,date}).then(()=>{
                console.log("添加成功");
                res.send({errno:1});
            }).catch(error=>{
                console.log("添加失败");
                res.send({errno:0});
                if(error) throw error;
            })
        }
    })
})
//登录
app.post("/findadmin",(req,res)=>{
        let {username,password} = req.body;
        userlist.findOne({username,password}).then(mes=>{
            if(mes){
                console.log("登录成功");
                res.send({errno:1});
            }else{
                console.log("登录失败");
                res.send({errno:0});
            }
        }).catch(error=>{

                if(error) throw error;
                console.log("服务器错误");
        })
})


//获取用户
app.get("/alluserlist",(req,res)=>{
    userlist.find().then(mes=>{
       res.send(mes);
    })
})

//修改用户
app.post("/changeinfo",(req,res)=>{
    let {username,age,password,_id} = req.body;
    console.log(req.body);
    userlist.updateOne({_id},{username,age,password}).then(()=>{
                console.log("修改成功");
                res.send({errno:1})
    }).catch(()=>{
        console.log("修改失败");
        res.send({errno:0})
    })
})

//删除用户
app.post("/deleteuser",(req,res)=>{
     let {_id} = req.body       
        userlist.deleteOne({_id}).then(()=>{
            console.log("删除成功");
            res.send({errno:1})
        }).catch(()=>{
            console.log("删除失败");
            res.send({errno:0})
        })



})  

//查找用户
app.post("/search",(req,res)=>{
    let {username} = req.body;
    userlist.findOne({username}).then(info=>{
       if(info){
        console.log(info);
        res.send({errno:1,info});
       }else{
        res.send({errno:0,info});
       }
    })
});



//添加评论
app.post("/adddiscuss",(req,res)=>{
    let {comment,usercomment,title} = req.body;
    disscuss.create({comment,usercomment,title}).then(()=>{
        console.log("添加成功");
        res.send({errno:1});
    }).catch(()=>{
        console.log("添加失败");
        res.send({errno:0});
    })
})


//获取评论
app.post("/finddiscuss",(req,res)=>{
    let {title} = req.body;
    console.log(req.body);
    disscuss.find({title}).then(info=>{
        if(info){
            console.log("查询成功");
            res.send({info,errno:1});
            console.log(info);
        }else{
            console.log("查询失败");
        }
    })
 })


//删除评论
app.post("/deletedis",(req,res)=>{
    let {_id} = req.body;
    disscuss.deleteOne({_id}).then(()=>{
        console.log("删除成功");
        res.send({errno:1})
    }).catch(()=>{
        console.log("删除成功");
        res.send({errno:0});
    })
})


//阅读量
app.post("/addreadnum",(req,res)=>{
    let {_id,readnum} = req.body;
    
           publish.updateOne({_id},{readnum:readnum+1}).then(()=>{
            publish.findOne({_id}).then(info=>{
               if(info){
                        res.send({info,errno:1})
               }else{
                        res.send({errno:0});
               }
            })
           })
   
})

//点赞
app.post("/addlikenum",(req,res)=>{
    let {_id,likenum} = req.body;
    publish.updateOne({_id},{likenum:likenum+1}).then(()=>{
        publish.findOne({_id}).then(info=>{
            if(info){
                console.log(info)
                res.send({info,errno:1})
            }else{
                res.send({errno:0});
            }
        })
    })
});


//搜素查找
app.post("/findthing",(req,res)=>{
    let {title} = req.body;
        console.log(title);
    publish.findOne({title}).then(info=>{
        console.log(info);
        if(info){
            res.send({info,errno:1})
        }else{
            res.send({errno:0})
        }
    })
})