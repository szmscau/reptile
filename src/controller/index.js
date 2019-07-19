const {request} = require("../../config/request.js");
const apiModel = require('../../utils/api.js');
const cheerio = require('cheerio');
const reqe = require('request')
const fs = require("fs");
const path = require('path')
const { movie } = require('../db/model.js');

async function getTaoPiaoPiao() {
    let url = apiModel.tppUrl;
    let data = null;
	try {
        data = await request(url, 'GET');  
    }catch(e){
        console.log('getTaoPiaoPiao',e);   
    }
    let $ = cheerio.load(data.text);
    let list = $('.tab-movie-list');
    let dataList = new Array();
    let date = new Date();
    for(let i = 0 ; i<list.length; i++){
        let div = $(list[i]).find('.movie-card-wrap');
        let arr = new Array();
        for(let j = 0 ;j < div.length;j++){
            let obj = {};
            obj.imgSrc = $(div[j]).find('.movie-card-poster img').attr('src');
            obj.movieName =  $(div[j]).find('.movie-card-name .bt-l').text();
            obj.score =  $(div[j]).find('.movie-card-name .bt-r').text();
            obj.director = $($(div[j]).find('.movie-card-info .movie-card-list span')[0]).text();
            obj.actor = $($(div[j]).find('.movie-card-info .movie-card-list span')[1]).text();
            obj.type = $($(div[j]).find('.movie-card-info .movie-card-list span')[2]).text();
            obj.country = $($(div[j]).find('.movie-card-info .movie-card-list span')[3]).text();
            obj.language = $($(div[j]).find('.movie-card-info .movie-card-list span')[4]).text();
            obj.time = $($(div[j]).find('.movie-card-info .movie-card-list span')[5]).text();
            obj.date = date.getTime();
            arr.push(obj);
        }
        dataList = dataList.concat(arr)
    }
    try{
        let result =  await movie.insertMany(dataList);
        console.log('db -insert',result);
    }catch(e){
        console.log('db -insert',e);
    }
    return list;
}
async function getMaoYan() {
    let url = apiModel.tppUrl;
    let data = null;
	try {
        data = await request(url, 'GET');  
    }catch(e){
        console.log('getTaoPiaoPiao',e);   
    }
    let $ = cheerio.load(data.text);
    let style = $('style');
    console.log(style);
    // try{
        // let result =  await movie.insertMany(dataList);
        // console.log('db -insert',result);
    // }catch(e){
    //     console.log('db -insert',e);
    // }
    // return list;
}
async function downloadFile(){
    var dirPath = path.join(__dirname, "file");
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log("文件夹创建成功");
    } else {
        console.log("文件夹已存在");
    }
    //循环多线程下载
    let date = new Date();
    let fileName = `font${date.getTime()}.woff`;
    let fileName1 = `font1${date.getTime()}.woff`;
    let fileName2 = `font2${date.getTime()}.woff`;
    let url = "http://vfile.meituan.net/colorstone/7acc74113a1adb135aede78e6a7e60382088.woff"
    let stream = fs.createWriteStream(path.join(dirPath, fileName)); // woff
    let stream1 = fs.createWriteStream(path.join(dirPath, fileName1)); // woff
    let res =  await request(url,'GET');
    let res1 = await request(url);
    fs.writeFile(fileName2,res.text,{},function(err){
        console.log('ttt',err);
    })
    // console.log(res,res1);
    // stream
    stream.on('finish', function() {
        console.log("写入完成。");
    });   
    stream.on('error', function(err){
        console.log(err.stack);
    });
    stream.write(res.text,'utf-8');
    stream.end();
    reqe(url).pipe(stream1).on("close", function (err) {
        console.log("文件[" + fileName1 + "]下载完毕");
    });
}


module.exports = {
    getTaoPiaoPiao,
    getMaoYan,
    downloadFile
}