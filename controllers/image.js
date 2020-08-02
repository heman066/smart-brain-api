const clarifai= require('clarifai');
//API call in backend to privatise api key
const app = new Clarifai.App({
 apiKey: '73c48f411229442fb728f4a09ea217b1'
});

const handleApiCall = (req,res)=>{
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
  .then(data=>{
    res.json(data);
  })
  .catch(err=>res.status(400).json("Unable to fetch"));
}

const handleEntries=(req,res,db)=>{
	const {id} = req.body;
	db('users')
  	.where('id', '=', id)
  	.increment('entries',1)
  	.returning('entries')
  	.then(entries=>{
  		res.json(entries[0]);
  	})
  	.catch(err=> res.status(400).json("Unable to get entries"));
}
module.exports={
	handleEntries,//object and function name is same
  handleApiCall
};