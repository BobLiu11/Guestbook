var http=require('http')
var fs=require('fs')
var template=require('art-template')
var url=require('url')

var comments = [
    {
        name:'张三',
        message:'今天天气不错',
        dateTime:'2019-10-23'
    }
]
http.createServer(function(req,res){
    var parseObj=url.parse(req.url,true)
    var pathname=parseObj.pathname
    if(pathname==='/'){
        fs.readFile('./views/index.html',function(err,data){
            if(err){
                return res.end('404 Not Found.')
            }
            var commentData = template.render(data.toString(),{
                comments:comments
            })
            res.end(commentData)
        }) 
    }else if(pathname==='/post'){
        fs.readFile('./views/post.html',function(err,data){
            if(err){
                return res.end('404 Not Found.')
            }
            res.end(data)
        }) 
    }
    else if(pathname.indexOf('/public/')===0){
        fs.readFile('.'+url,function(err,data){
            if(err){
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    }else if(pathname==='/pinglun'){
        var comment = parseObj.query
        comment.dateTime=""
        //comments.push(comment)
        comments.unshift(comment)
        //res.end(JSON.stringify(parseObj.query))
        res.statusCode=302
        res.setHeader('Location','/')
        res.end()
    }else{
        fs.readFile('./views/404.html',function(err,data){
            if(err){
                return res.end('404 Not Found.')
            }
            res.end(data)
        }) 
    }
}).listen(3000,function(){
    console.log('runing...')
})