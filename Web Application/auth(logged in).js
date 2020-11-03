// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (!user) {
	  console.log("no user logged in.");
	  location.replace("login.html");
  }else{
	  console.log(user,"logged in.");
  }
});
//logout listener
document.getElementById("logout").addEventListener("click",logout);

console.log("Initializing auth script");

function logout(){
	
	console.log("user signed out");
	auth.signOut();
}