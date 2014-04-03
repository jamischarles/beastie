var transaction = require('../lib/transaction.js');

/*
 * GET home page.
 */

exports.index = function(req, res){
  transaction.get(0, function (err, resp) {
    res.render('index', { title: 'Express', history: JSON.stringify(resp) });
  });

};


exports.getHistory = function(req, res) {
  var start_num = req.params.start_num;

  transaction.get(start_num, function (err, resp) {
    if (err) return res.send('There was an error retrieving your JSON data.');
    res.json(resp);
  });
};
