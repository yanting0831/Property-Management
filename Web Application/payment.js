// JavaScript Document
var payment_log = document.getElementById("list");
var list = "";
db.collection("payment").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
		console.log(doc.data().amount);
		var user =`<tr><td>${doc.data().name}</td>
				<td>${doc.data().amount}</td>
				<td>${doc.data().facility}</td>
				<td>${doc.data().duration}</td>
				<td>${doc.data().date}</td>
				<td>${doc.data().status}</td>
				<td>${doc.data().amount}</td>
				
		</tr>`
		
		list = list.concat(user);
		
    });
	
	payment_log.innerHTML = list;
});