const {request} = require("../../config/request.js");
const apiModel = require('../../utils/api.js');
const cheerio = require('cheerio');


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
            arr.push(obj);
        }
        dataList.push(arr)
    }
    return list;
}


module.exports = {
    getTaoPiaoPiao
}