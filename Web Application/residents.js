
var resident_list = document.getElementById("list");
var list = "";
db.collection("landlord").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
		console.log(doc.data().name);
		var user =`<tr><td>${doc.data().name}</td>
				<td>${doc.data().email}</td>
				<td>${doc.data().contact}</td>
				<td>${doc.data().ic}</td>
				<td>${doc.data().unit}</td>
				<td>${doc.data().role}</td>
				<td><button>Delete</button></td>
		</tr>`
		
		list = list.concat(user);
		
    });
	
	resident_list.innerHTML = list;
}).then(()=>{
	$('#resident-list').DataTable({
					"pagingType": "simple_numbers",
					info: false,
					"sDom": '<"top"i>rt<"bottom"flp><"clear">'
				});	
});