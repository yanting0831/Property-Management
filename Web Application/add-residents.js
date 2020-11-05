// JavaScript Document
auth.onAuthStateChanged(user => {
  if (user) {
	  	
	  	user.getIdTokenResult().then(idTokenResult => {
		user.master = idTokenResult.claims.master;
			if (user.master) {
				document.getElementById("create-admin").style.display = "block";
			}
    	});
  }
});

function addTenants(){
	var residentType = document.getElementById('resident-type');
	var haveTenant = document.getElementById('have-tenant');
	if(residentType.value == "landlord"){
		haveTenant.style.display = "block";
	}
	else if(residentType.value == "tenant"){
		haveTenant.style.display = "none";
	}
}
document.getElementById('add-resident-form').addEventListener("submit", function(e){
	e.preventDefault();    //stop form from submitting
	
	var name = document.getElementById('name').value;
	var idno = document.getElementById('idno').value;
	var contact = document.getElementById('contact').value;
	var email = document.getElementById('email').value;
	var unitno = document.getElementById('unitno').value;
	var restype = document.getElementById('resident-type').value;

	
	// sign up the user & add firestore data
	//by default icno will be password
	if(name == "" ||idno == "" ||contact == "" ||email == "" ||unitno == "" ||restype == "" ){
		
	}else{
		createresident(name,idno,contact,email,unitno,restype)
	}
	
});

async function createresident(username,idno,contacts,emails,units,role){
	
	const createUser = functions.httpsCallable('createUser');
	createUser({ email: emails,pass:password }).then(result => {
		
		if(result == emails){
			db.collection('landlord').doc(cred.user.uid).set({
			
		  	name: username,
			ic: idno,
			contact: contacts,
			email: emails,
			unit: firebase.firestore.FieldValue.arrayUnion(units), 
			role: role
			
			}).catch(err => {
				console.error("Error adding document: ", error);
			});
		}else{
			console.log(result);
			alert(result);
		}
		
	});
	
	await auth.createUserWithEmailAndPassword(emails, idno).then(cred => {
		console.log("entered function");
		
		
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