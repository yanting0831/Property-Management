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
	createUser({ email: emails,pass:idno }).then(result => {
		
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

}