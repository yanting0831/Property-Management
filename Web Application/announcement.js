$("#image_url").change(function(){
	var name = document.getElementById('image_url');
	if (this.files && this.files[0]) {
		var reader = new FileReader();
		console.log(this.files[0]['name']);
		reader.onload = function(e) {
			var element = "<img src='" +e.target.result +"' width='500' height='200'></img>";
			$('#image_preview').html(element);
		}
		
		reader.readAsDataURL(this.files[0]); // convert to base64 string
	}
});

