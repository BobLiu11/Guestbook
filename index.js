var  express = require('express')
var bodyParser = require('body-parser')
//相当于http.createServer
var app=express()

//配置body-parser
// 只要加入这个配置，则在req请求对象上会多出来一个属性：body
// 也就是说可以直接通过req.body来获取表单post请求数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// 配置使用art-template模板引擎
//art表示渲染.art结尾的文件时，使用art-template模板引擎
//express-art-template依赖art-template，是专门在Express中整合art-template
app.engine('html', require('express-art-template'));
//Express为Response对象提供了render方法，该方法默认不可使用，只有配置模板引擎才可使用
//使用方法：res.render('模板文件名', {模板数据})
//第一个参数不能写路径，默认去views文件中找相应的模板文件
//Express有个约定，开发人员把所有的视图文件都放到views目录中
var comments = [
    {
        name:'张三',
        message:'今天天气不错',
        dateTime:'2019-10-23'
    }
]
app.get('/', function (req, res) {
    res.render('index.html',{
        comments:comments
    });
});
//如果想修改默认的views目录，则可以
//app.set('views',render函数默认的路径)


//当服务器收到get请求/的时候，执行回调处理函数
// app.get('/',function(req,res){
//     res.send('hello express')
// })
//get请求
app.get('/get',function(req,res){
    res.render('get.html')
})
app.get('/get',function(req,res){
    var comment=req.query//req.query只能拿到get请求参数
    comment.dateTime=new Date()
    comments.unshift(comment)//comments.push(comment)
    res.redirect('/')// res.statusCode=302   res.setHeader('Location','/')
})
//post请求
app.get('/post',function(req,res){
    res.render('post.html')
})
app.post('/post',function(req,res){
    var comment=req.body
    comment.dateTime=new Date()
    comments.unshift(comment)
    res.redirect('/')
})
//公开指定目录
//可以通过/public/xx的方式访问./public/目录中的所有资源
app.use('/public/',express.static('./public/'))
//可以通过/a/xx的方式访问./public/目录中的所有资源,/a/相当于是/public/的引用(别名)
//app.use('/a/',express.static('./public/'))
//可以通过省略/public/xx的方式，通过/xxx访问./public/目录中的所有资源
//app.use(express.static('./public/'))
//相当于server.listen
app.listen(3000,function(){
    console.log('app is running at port 3000')
})