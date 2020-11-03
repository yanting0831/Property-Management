var t = $('#resident-list').DataTable({
					"pagingType": "simple_numbers",
					info: false,
					"sDom": '<"top"i>rt<"bottom"flp><"clear">'
				});	
db.collection("landlord").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
		console.log(doc.data().name);
		
		t.row.add( [
            doc.data().name,
            doc.data().email,
            doc.data().contact,
            doc.data().ic,
            doc.data().unit,
			doc.data().role,
			"<button>Delete</button>"
        ] ).draw( );
    });
	
});
