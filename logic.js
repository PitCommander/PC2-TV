r = require('rethinkdb');

r.connect({
  host: 'localhost',
  port: 28015
}, function (err, connection) {

  //This code will run when the rankings update
  r.db('pc2').table('eventData').get('rankings').changes({
    includeInitial: true
  }).run(connection, function (err, cursor) {
    cursor.each(updateRankings);
  });

  //This code will run when the schedule updates
  r.db('pc2').table('eventData').get('schedule').changes({
    includeInitial: true
  }).run(connection, function (err, cursor) {
    cursor.each(updateSchedule);
  });

  //This code will run whenever the stream data updates
  r.db('pc2').table('eventData').get('streamSettings').changes({
    includeInitial: true
  }).run(connection, function (err, cursor) {
    cursor.each(updateStream);
  });

  //Used to update page settings
  r.db('pc2').table('eventData').get('pageSettings').changes({
    includeInitial: true
  }).run(connection, function (err, cursor) {
    cursor.each(updatePage);
  });
});

function updateRankings(err, rankingData) {
  console.log(rankingData.new_val.value);
  let table = $('#ranksTable').DataTable();
  table.clear();
  table.rows.add(rankingData.new_val.value);
  table.draw();

}

function updateSchedule(err, scheduleData) {
  console.log(scheduleData.new_val.value);
}

function updateStream(err, streamData) {
  console.log(streamData);
}

function updatePage(err, pageData) {
  console.log(pageData);

  const pages = ['ranksView', 'scheduleView', 'streamView'];

  pages.forEach(function (page) {
    if (page == pageData.new_val.value) {
      $('#' + page).removeClass('d-none');
    } else {
      $('#' + page).addClass('d-none');
    }
  })
}