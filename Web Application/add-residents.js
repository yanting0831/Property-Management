// JavaScript Document

$('#add-resident-form').submit(function(event){
	
	// get user info
	var firstname = $('#fname').value;
	var lname = $('#lname').value;
	var idno = $('#idno').value;
	var genderlist = document.getElementsByClassName('gender');
	var gender;
	var contact = $('#contact').value;
	var email = $('#email').value;
	var unitno = $('#unitno').value;
	var restype = $('#resident-type').options[e.selectedIndex].value;
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
	//by default ic no will be password
	
	
});

async function firebasedb(username,idno,contacts,emails,units,genders){
	
	await auth.createUserWithEmailAndPassword(email, idno).then(cred => {
		db.collection('landlord').doc(cred.user.uid).set({
			
		  	name: ann_title,
			ic: idno,
			contact: contacts,
			email: emails,
			unit: ["B-1-1","B-2-2"], //placeholder units
			gender: genders
			
		}).catch(err => {
			console.error("Error adding document: ", error);
		});
		
	}).then(() => {
		
	}).catch(err => {
		console.error("Error adding document: ", error);
	});

}