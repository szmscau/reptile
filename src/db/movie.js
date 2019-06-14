const mongoose = require('./config')
const Schema = mongoose.Schema

let movie = new Schema({
	// uid: {type:String,unique:true,index: true,}, // 用户Id
	actor: String, // 主演名
	country: String, // 地区
	director: String, // 导演
	imgSrc: String, // 电影图片
	language: String, // 语言
	
	movieName: String, // 电影名
	score: Number, // 评分
	time: String, // 时长
	type: String, // 类型
    
    date: Date // 爬取时间
	// followees: {type:Array,default: []}, // 存放你关注的列表
	// follower: {type:Array,default: []} // 存放关注你的列表
})

module.exports = mongoose.model('movie', movie)
