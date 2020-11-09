// JavaScript Document
var t = $('#visitor-log').DataTable({
  "pagingType": "simple_numbers",
  info: false,
  "sDom": '<"top"i>rt<"bottom"flp><"clear">'
});

db.collection("visitor").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
	  var checkin_time = new Date(doc.data().checkin_time.seconds);
	  var checkout_time = new Date(doc.data().checkout_time.seconds);
      t.row.add([
        doc.data().username,
		doc.data().ic,
        doc.data().contact,
        checkin_time.toLocaleString(),
		checkout_time.toLocaleString(),
		doc.data().status
      ]).draw();
  });
});