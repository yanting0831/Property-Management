// JavaScript Document
var userid = location.search.substring(1);
var chats_element = "";
var chat_list = document.getElementById("chat-panel");;
console.log(userid);

const p1 = db.collection("landlord").doc(userid).collection("chatroom").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
		
		var docdata =  doc.data();
		if(docdata.user == "user"){
			var chats = `<div class="row no-gutters">
				<div class="col-md-3">
				  <div class="chat-bubble chat-bubble--left">
					${docdata.message}
				  </div>
				</div>
			  </div>`;
		}else{
			var chats = `<div class="row no-gutters">
				<div class="col-md-3 offset-md-9">
				  <div class="chat-bubble chat-bubble--right">
					${docdata.message}
				  </div>
				</div>
			  </div>`;
		}
		chats_element = chats_element.concat(chats);
		chat_list.innerHTML = chats_element;
		});
	});
p1.then(() => {
	db.collection("landlord").doc(userid).get().then(function(doc) {
		
		if (doc.exists) {
			var pathReference = storage.ref(doc.data().imageurl);
			
			pathReference.getDownloadURL().then(function(url) {
				
				var imgset = document.getElementById('profile-image');
				imgset.src = url;
				
			}).catch(function(error) {
				console.log(error);
			});
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});
})