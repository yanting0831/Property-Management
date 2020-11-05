// JavaScript Document
document.getElementById('add-resident-form').addEventListener("submit", function(e){
	e.preventDefault();    //stop form from submitting
	
	var password = document.getElementById('password').value;
	var cpassword = document.getElementById('cpassword').value;
	var email = document.getElementById('email').value;

	
	//validate user input
	if(password == cpassword && password != "" && cpassword != "" && email != "" ){
		// sign up the user & add firestore data
		//by default icno will be password
		createadmin(email,password);
	}else{
		alert("input incorrect");
	}
	
});

async function createadmin(emails,password){
	
	await auth.createUserWithEmailAndPassword(emails, password).then(cred => {
		
		const addAdminRole = functions.httpsCallable('addAdminRole');
		addAdminRole({ email: emails }).then(result => {
			console.log(result);
		});
		
	}).then(() => {
		//do something
	}).catch(err => {
		switch (err.code) {
			case 'auth/email-already-in-use':
//				console.log(`Email address ${this.state.email} already in use.`);
				alert("user already exist");
			  	break;
			case 'auth/invalid-email':
				alert("invalid email");
			  	break;
			case 'auth/operation-not-allowed':
				alert("Error during sign up");
			  	break;
			default:
			  	console.log(error.message);
			  	break;
      }
	});

}