// JavaScript Document
var t = $('#payment-log').DataTable({
  "pagingType": "simple_numbers",
  info: false,
  "sDom": '<"top"i>rt<"bottom"flp><"clear">'
});

db.collection("payment").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var user_id = doc.data().user_id;
    var amount = doc.data().amount;
	var status = doc.data().status;
    db.collection("landlord").doc(user_id).get().then(function (doc) {
      t.row.add([
        doc.data().name,
        doc.data().role,
        doc.data().contact,
        doc.data().unit,
        amount,
		status
      ]).draw();
		
    });
  });

});