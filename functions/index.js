const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data,context)=>{
	//get user and add custom claim
	return admin.auth().getUserByEmail(data.email).then(user=>{
		return admin.auth().setCustomUserClaims(user.uid,{
			admin: true
		})
	}).then(()=>{
		return {
			message: `Success! ${data.email} has been made a admin`
		}
	}).catch(err =>{
		return err;
	});
});

exports.addMasterRole = functions.https.onCall((data,context)=>{
	//get user and add custom claim
	return admin.auth().getUserByEmail(data.email).then(user=>{
		return admin.auth().setCustomUserClaims(user.uid,{
			master: true
		})
	}).then(()=>{
		return {
			message: `Success! ${data.email} has been made a master`
		}
	}).catch(err =>{
		return err;
	});
});