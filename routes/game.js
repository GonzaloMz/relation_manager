var mongoose = require('mongoose');
 
var GameModel = mongoose.model('GameModel');

exports.getGame = function(req, res){
	/**
	* Se solicitan los puntos para un juego dado
	* se retorna un objeto con la forma de un gameSchema en res
	*/
	var gameId = req.params.gameId;
	var game;
	GameModel.findById(mongoose.Types.ObjectId(gameId), function (err, doc) {
		if (err){
			res.send(err);
		}
		game=doc;
		res.json(game);
	});
	console.log(gameId);
}

exports.addPoint = function(req, res){
	/**
	* Se agrega un punto del color que viene en el req con su comentario
	*/
	//TODO notificar al usuario puntuado
	var gameId = req.params.gameId;
	var player = req.params.player;
	var pointToAdd = req.body;
	var msg;
	pointToAdd._id = new mongoose.Types.ObjectId;
	GameModel.findById(mongoose.Types.ObjectId(gameId), function(err, game){
		if (err){
			msg = err;
			return;
			res.send(msg);
		}
		console.log('adding point '+game);
		for (var i =0; i<game.points.length; i++){
			if (game.points[i].player = player){
				game.points[i].player_points.push(pointToAdd);
				game.save();
				res.json(game);
				return;
			}
		}
	});
}

exports.replyPoint = function(req, res){
	/**
	* Se replica el punto que viene en el req con el commentario entrante
	*/
	//gameId de req (gameId)
	//el punto a replicar de req (pointToReply)
	//el usuario que replica el punto (player)
	//la replica del punto (replyMessage)
	//TODO notificar al usuario puntuador
	var pointToReply = req.body.point;
	var gameId = req.params.gameId;
	var player = req.params.player;
	var replyMessage = req.body.comment;
	var msg;
	console.log(req.body);
	GameModel.findById(gameId, function(err, game){
		if (err){
			res.json(err);
			return;
		}
		for (var i =0; i<game.points.length; i++){
			if (game.points[i].player == player){
				for(var j=0; j< game.points[i].player_points.length;j++){
					if (game.points[i].player_points[j]._id==pointToReply){
						if(game.points[i].player_points[j].reply==undefined)
							game.points[i].player_points[j].reply = replyMessage;
						game.save();
						res.json(game);
						return;
					}
				}
			}
		}
	});
}

exports.requestPoint = function(req,res){
	/**
	* dos acciones
		- se asienta el request de un punto en la partida
		- se notifica a los demas usuarios de la partida que se solicito el punto
	*/

}

exports.replyPointRequest = function(req, res){
	/**
	* Si el usuario respondio que el punto aplica, se asienta el punto y se notifica a quien lo solicito
	* Si el usuario respondio que no aplica se deja asentado y se cierra la solicitud
	*/
}
