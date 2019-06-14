const movie = require('./movie.js');

module.exports = {
	movie: { 
		findOrInsert: (conditions) => { // 查询
			return new Promise((resolve, reject) => {
				movie.find({},conditions, (err, doc) => {
					if (err) return reject(err)
					if (doc){
						return resolve(doc)
					}
				})
			})
		},
        update: (conditions) => { // 更新
            return new Promise((resolve, reject) => {
				movie.update( {uid:conditions.id},conditions, (err, doc) => {
					if (err) return reject(err)
					return resolve(doc)
				})
			})
        },
        insert:(conditions)=>{ // 插入
            return new Promise((resolve, reject) => {
				movie.update( {},conditions, {"upsert": true}, (err, doc) => {
					if (err) return reject(err)
					return resolve(doc)
				})
			})
        },
        insertMany:(conditions)=>{
            return new Promise((resolve, reject) => {
				movie.insertMany( conditions, (err, doc) => {
					if (err) return reject(err)
					return resolve(doc)
				})
			})
        }
    }
}