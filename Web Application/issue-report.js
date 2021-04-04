// JavaScript Document
var t = $('#issue-report').DataTable({
	"pagingType": "simple_numbers",
	info: false,
	"sDom": '<"top"i>rt<"bottom"flp><"clear">'
});

var issuesDoc = db.collection("issues");

function get_data(){
	issuesDoc.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			var img_path = "issues/" + doc.data().img;
			var issue_status = "Not Solved"; 
			var action_button = '<button type="button" onclick="solve(\''+doc.id+'\');">Mark as Solved</button>';
			
			if(doc.data().status != undefined)
				issue_status = doc.data().status;
			
			if(issue_status == "Solved")
				action_button = '<button type="button" onclick="unsolve(\''+doc.id+'\');">Mark as Unsolved</button>';
			
			storage.ref().child(img_path).getDownloadURL().then(function(url) {
				var image_link = '<button class="image_link" type="button" onclick="show_img(\''+url+'\');">Show</button>';
				t.row.add([
					doc.data().date.toDate().toLocaleString(),
					doc.data().name,
					doc.data().pno,
					doc.data().email,
					doc.data().block,
					image_link,
					doc.data().desc,
					issue_status,
					action_button
				]).draw();
			}).catch((err) => {
				t.row.add([
					doc.data().date.toDate().toLocaleString(),
					doc.data().name,
					doc.data().pno,
					doc.data().email,
					doc.data().block,
					"Image not found",
					doc.data().desc,
					issue_status,
					action_button
				]).draw();
			});
		});
	}).catch((err) => {
		console.log(err);  
	});
}

function show_img(url){
	var img_container = document.getElementById("img-container");
	var img_holder = document.getElementById("img-holder");
	img_holder.src = url;
	img_container.style.display = "Block";
}

function hide(){
	var img_container = document.getElementById("img-container");
	img_container.style.display = "None";
}

function solve(id){
	issuesDoc.doc(id).update({ status: "Solved" }).then(() => {
		t.clear();
		get_data();
	});
}

function unsolve(id){
	issuesDoc.doc(id).update({ status: "Not Solved" }).then(() => {
		t.clear();
		get_data();
	});
}

get_data();