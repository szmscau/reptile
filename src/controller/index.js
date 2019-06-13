const {request} = require("../../config/request.js");
const apiModel = require('../../utils/api.js');


async function getTaoPiaoPiao() {
    let url = apiModel.tppUrl;
    let data = null;
	try {
        data = await request(url, 'GET');
    }catch(e){
        console.log('getTaoPiaoPiao',e);   
    }
    return data;
}


module.exports = {
    getTaoPiaoPiao
}