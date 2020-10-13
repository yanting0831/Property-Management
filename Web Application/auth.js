// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
	  console.log(user, " logged in.");
	  location.replace(residents.html);
  }
});

//login
document.getElementById ('login-form').addEventListener ('submit',(e) => {
	const email = document.getElementById('login').value;
    const password = document.getElementById('password').value;
	e.preventDefault();
	
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
		console.log("user logged in");
		location.replace("residents.html");
  	}).catch(err => {
		console.log(err.message);
	
  	});
	
});


//utilities
//function to show error
function errormsg(err){
	//const error = document.getElementById("error");
	error.innerHTML = err;
}