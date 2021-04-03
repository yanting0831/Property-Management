// JavaScript Document
var t = $('#issue-report').DataTable({
	"pagingType": "simple_numbers",
	info: false,
	"sDom": '<"top"i>rt<"bottom"flp><"clear">'
});

db.collection("issues").get().then((querySnapshot) => {
	querySnapshot.forEach((doc) => {
		var img_path = "issues/" + doc.data().img;
		storage.ref().child(img_path).getDownloadURL().then(function(url) {
			var image_link = '<button class="image_link" type="button" onclick="show_img(\''+url+'\');">Show</button>';
			t.row.add([
				doc.data().date.toDate().toLocaleString(),
				doc.data().name,
				doc.data().pno,
				doc.data().email,
				doc.data().block,
				image_link,
				doc.data().desc
			]).draw();
		}).catch((err) => {
			console.log(err);  
		});
	});
}).catch((err) => {
	console.log(err);  
});

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