var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

mongoose.connect('mongodb://192.168.0.9:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var gameSchema = new Schema({
	player_a :{type:String, required:true}
	, player_b :{type:String, required:true}
	, points : [{
		player : {type:String, required:true}
		, player_points: [{
			_id : {type:Schema.Types.ObjectId, required:true}
			, color :{type:String, required:true}
			, date : {type:Date, default:Date.now}
			, comment : {type:String, required:true}
			, reply: {type:String, required:false}
		}]
	}]
});

mongoose.model('GameModel', gameSchema);

