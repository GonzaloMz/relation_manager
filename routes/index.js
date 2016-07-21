
/*
 * GET home page.
 */

exports.index = function(req, res){
res.set('content-type','text/html');
 res.send(fs.readFileSync('public/index.html','utf8'));
  res.end();
 };
