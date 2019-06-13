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
    console.log('list',list);
    return data;
}


module.exports = {
    getTaoPiaoPiao
}