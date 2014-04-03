var transaction = require('../lib/transaction.js');

/*
 * GET home page.
 */

exports.index = function(req, res){
  transaction.get(0, function (err, resp) {
    // console.log('resp', resp);
    res.render('index', { title: 'Express', history: JSON.stringify(resp) });
  });

};


exports.getHistory = function(req, res) {
  var start_num = req.params.start_num; //where should we fetch from?

  transaction.get(start_num, function (err, resp) {
    if (err) return res.send('There was an error retrieving your JSON data.');
    // console.log()
    res.json(resp);
  });
};
