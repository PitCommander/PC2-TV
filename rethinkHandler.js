r = require('rethinkdb');

r.connect({
  host: 'localhost',
  port: 28015
}, function (err, connection) {

  //This code will run when the rankings update
  r.table('eventData').get('rankings').changes({
    includeInitial: true
  }).run(connection, function (err, cursor) {
    cursor.each(updateRankings);
  });

  //This code will run when the schedule updates
  r.table('eventData').get('schedule').changes({
    includeInitial: true
  }).run(connection, function (err, cursor) {
    cursor.each(updateSchedule);
  });
});

function updateRankings(err, rankingData) {
  console.log(rankingData.new_val.value);
}

function updateSchedule(err, scheduleData) {
  console.log(scheduleData.new_val.value);
}