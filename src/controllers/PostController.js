const axios = require('axios');
const Post = require('../models/Post');
const {Op} = require("sequelize");

class Controller{
    async update(){
        axios.get("https://api.reddit.com/r/artificial/hot").then(r => {
            const datas = r.data.data.children;            
			
			datas.forEach(async (data) => {
                const title = data.data.title;
                const author = data.data.author;
                const created_reddit_utc = data.data.created_utc;
                const ups = data.data.ups;
                const num_comments = data.data.num_comments;
                const idReddit = data.data.id;

                const post = await Post.findOne({
                    where: {idReddit}
                });

                if(post){
					if(post.ups !== ups || post.num_comments !== num_comments){
						post.ups = ups;
						post.num_comments = num_comments;
						await post.save();
					}
					return false;
				}
				
                await Post.create({
                    title,
                    author,
                    created_reddit_utc,
                    ups,
                    num_comments,
                    idReddit
				}); 
				return true;
            });

        }).catch(err => {
            console.log(err);
        });
    }

    async get(req, res){
        let {i_date, e_date, order} = req.params;
        let config = {};
        
        if(order !== 'ups' && order !== 'num_comments') return res.status(500).send({msg: 'Invalid order'});
        
        if(i_date && e_date){
            let a_i_date = i_date.split('-');
            let a_e_date = e_date.split('-');
    
            if(a_i_date.length !== 3  ||  parseInt(a_i_date[1]) <= 0 || parseInt(a_i_date[1]) > 12){
                return res.status(500).send({msg: "Invalid initial date"});
            }
    
            if(a_e_date.length !== 3  ||  parseInt(a_e_date[1]) <= 0 || parseInt(a_e_date[1]) > 12){
                return res.status(500).send({msg: "Invalid end date"});
            }
    
            let i_time = new Date();
            i_time.setFullYear(parseInt(a_i_date[0]));
            i_time.setMonth(parseInt(a_i_date[1]) - 1);
            i_time.setDate(parseInt(a_i_date[2]));
            i_time.setHours(0, 0, 0);
    
            let e_time = new Date();
            e_time.setFullYear(parseInt(a_e_date[0]));
            e_time.setMonth(parseInt(a_e_date[1]) - 1);
            e_time.setDate(parseInt(a_e_date[2]));
            e_time.setHours(23, 59, 59);
            
            config.where =  {
                        created_reddit_utc: {
                            [Op.and]:[
                                {[Op.gte]: i_time.getTime() / 1000},
                                {[Op.lte]: e_time.getTime() / 1000 },
                            ]
                        }
                    }
        }

        config.order = [
            [order, 'DESC']
        ]

        const posts = await Post.findAll(config);
        return res.send(posts);
	}
	
	async getUsers(req, res){
		let {order} = req.params;
        const posts = await Post.findAll({
			order:[
				[order, 'DESC']
			]
		});
		
		const users = posts.map(p => p.author);

		return res.send(users);
	}
}

module.exports = new Controller();