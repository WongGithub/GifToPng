var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/upload',function(req,res){
   var data = req.body.data,
       name = req.body.name,
       upload = {
           filedir:'public/processed/',
           create:function(dir,data,name){

               var data = data.replace('data:image/png;base64,','');
                   data = new Buffer(data,'base64');
               fs.writeFile(dir+name.replace('.gif','.png'),data,function(err){
                   if(err){
                       console.log(err);
                       return;
                   }
                   res.writeHead(200, {"Content-Type": "text/html"});
                   res.end('{"stat":"1"}');
                   console.log('success!');
               });
           },
           init:function(){
               this.create(this.filedir,data,name);
           }
       };
    upload.init();

//   fs.readFile('public/t1.gif','base64',function(err,data){
//             if(err){
//                 console.log(err);
//                 return;
//             }
//             var data = new Buffer(data,'base64');
//             fs.writeFile('public/t2.png',data,function(err){
//                 if(err){
//                     console.log(err);
//                     return;
//                 }
//                 console.log('success!')
//             });
//   });
});

router.get('/list',function(req,res){
   var readdir = {
       filedir : 'public/upload',
       read:function(dir){
           fs.readdir(dir,function(err,list){
               if(err){
                   console.log(err);
                   return;
               }
               var list = JSON.stringify(list).split(',');
               res.writeHead(200, {"Content-Type": "text/html"});
               res.end('{"list":'+ list +'}');
           });
       },
       init:function(){
           this.read(this.filedir);
       }
   }
   readdir.init();
});

module.exports = router;
