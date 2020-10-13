// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (!user) {
	  console.log("no user logged in.");
	  location.replace(login.html);
  }
});
//logout listener
document.getElementById("logout").addEventListener("click",logout);
//add resident listener
document.getElementById("add-resident-form").addEventListener("submit",(e) = {
	// get user info
	const firstname = signupForm['fname'].value;
	const lname = signupForm['lname'].value;
	const idno = signupForm['idno'].value;
	const genderlist = document.getElementsByName('gender');
	const gender;
	const contact = signupForm['contact'].value;
	const email = signupForm['email'].value;
	const unitno = signupForm['unitno'].value;
	var restype = document.getElementById("resident-type").options[e.selectedIndex].value;;
	//get gender
	for (var i = 0, length = genderlist.length; i < length; i++) {
	  if (genderlist[i].checked) {
		// do whatever you want with the checked radio
		gender = radios[i].value;
		// only one radio can be logically checked, don't check the rest
		break;
	  }
	}
	
	  // sign up the user & add firestore data
	  auth.createUserWithEmailAndPassword(email, password).then(cred => {
		return db.collection('users').doc(cred.user.uid).set({
		  bio: signupForm['signup-bio'].value
		});
	  }).then(() => {
		// close the signup modal & reset form
		const modal = document.querySelector('#modal-signup');
		M.Modal.getInstance(modal).close();
		signupForm.reset();
		signupForm.querySelector('.error').innerHTML = ''
	  }).catch(err => {
		signupForm.querySelector('.error').innerHTML = err.message;
	  });
});


function logout(){
	
	Console.log("user signed out");
	auth.signout();
}