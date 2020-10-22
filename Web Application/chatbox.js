// JavaScript Document
var userid = location.search.substring(1);
var chats_element = "";
var chat_list = document.getElementById("chat-panel");
var chats = "";
console.log(userid);
//get chat details
const p1 = db.collection("landlord").doc(userid).collection("chatroom").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
		
		var docdata =  doc.data();
		if(docdata.user == "user"){
			chats = chats + `<div class="row no-gutters">
				<div class="col-md-3">
				  <div class="chat-bubble chat-bubble--left">
					${docdata.message}
				  </div>
				</div>
			  </div>`;
		}else{
			chats = chats + `<div class="row no-gutters">
				<div class="col-md-3 offset-md-9">
				  <div class="chat-bubble chat-bubble--right">
					${docdata.message}
				  </div>
				</div>
			  </div>`;
		}
		
		});
	
		return chats;
	});
p1.then((chats) => {
	//insert send message box
	chats = chats + `<div class='row'>
			<div class='col-12'>
			  <div class="chat-box-tray">
				<i class="far fa-grin"></i>
				<input type="text" placeholder="Type your message here...">
				<i class="far fa-paper-plane"></i>
			  </div>
			</div>
		  </div>`;
	chats_element = chats_element.concat(chats);
	chat_list.innerHTML = chats_element;
	//set image
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