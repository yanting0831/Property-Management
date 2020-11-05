// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (!user) {
	  
	  console.log("no user logged in.");
	  location.replace("login.html");
  }else{
	  console.log(user,"logged in.");
	  user.getIdTokenResult().then(idTokenResult => {
		user.master = idTokenResult.claims.master;
			if (user.master) {
				
				//logout();
	  			
			}else{
				console.log("user is not a master or admin");
			}
    	});
  }
});
//logout listener
document.getElementById("logout").addEventListener("click",logout);

console.log("Initializing auth script");

function logout(){
	
	
	auth.signOut().then(()=>{
		console.log("user signed out");
		location.replace("login.html");
	});
}