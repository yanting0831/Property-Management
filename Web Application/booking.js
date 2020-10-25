// JavaScript Document
var booking_log = document.getElementById("list");
var list = "";
db.collection("booking").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
		console.log(doc.data().facility);
		var user =`<tr><td>${doc.data().contact}</td>
				<td>${doc.data().contact}</td>
				<td>${doc.data().contact}</td>
				<td>${doc.data().contact}</td>
				<td>${doc.data().facility}</td>
				<td>${doc.data().date}</td>
				<td>${doc.data().duration}</td>
				<td><button>Approve</button></td>
				<td><button>Reject</button></td>
				
		</tr>`
		
		list = list.concat(user);
		
    });
	
	booking_log.innerHTML = list;
});