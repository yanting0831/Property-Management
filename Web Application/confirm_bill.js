// JavaScript Document
var id = document.getElementById("user_id").value;
var price = parseFloat(document.getElementById("price").value)*100;
var desc = document.getElementById("payment-desc").value;
var ndate = new Date();
var due = new Date();
due.setMonth(due.getMonth() + 1);
if (user_id == null || price == null || desc == null) {
  event.preventDefault();
  alert("price and description cannot be empty");
} else {
  console.log("hello");
  db.collection("billing").add({
    user_id: id,
    amount: price,
    status: "unpaid",
    description: desc,
    date: ndate,
    due_date: due
  }).then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
  }).catch(function (error) {
    console.log("Error adding document: ", error);
  });
}
