var db = require('./db');
var log = require('../log');

exports.events = function (req, res) {
  log.Logger.info('Loading DB events...');
  db.Events
    .findAll()
    .then(events => {
        log.Logger.debug('Fetched events, count: ' + events.length);
        res.json(events);
    })
    .catch(err => {
      log.Logger.error('** Fetch failed: ', err);
    });
};

exports.event = function (req, res) {
  log.Logger.debug('Handling event call, method: ' + req.method + ', event ID: ' + req.params.eventId)
  switch(req.method) {
    case "DELETE":
      db.Events
      .destroy({
        where: {
          id: req.params.eventId
        }
      }).then(function() {
        log.Logger.info('Deleted event with id: ' + req.params.eventId)
        res.status(200).end();
      });
      break
    case "POST":
      db.Events
        .create({
          title: req.body.title,
          detail: req.body.detail,
          date: req.body.date
        })
        .then(function() {
          log.Logger.info('Created event with title: ' + req.body.title)
          res.send('{}');
          res.status(201).end();
        });
      break
  }
};