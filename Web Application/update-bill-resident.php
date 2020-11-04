<?php
if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['contact']) || empty($_POST['ic']) || empty($_POST['unit'])){
	function disable(){}
	function setValue($value){}
}
else{
	function disable()
	{
		echo "disabled";
	}
	
	function setValue($value)
	{
		echo "value='$value'";
	}
	
	function getMonth()
	{
		echo date("F",mktime(0, 0, 0, date("m")-1, date("d"),   date("Y")));
	}
}
?>

<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>Update Bill - Project Management System</title>
	<link rel="stylesheet" href="style/style.css"/>
	<script src="https://kit.fontawesome.com/a076d05399.js"></script>
	<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
	<script src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.22/css/jquery.dataTables.css">
	<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>

<body>
	<!-- Place required backend part is fill with #-->
	<div class="sidebar">
		<header><img src="images/dryx-black.png" alt="dryx-logo" width="50%"></header>
		<ul>
			<li><a href="residents.html"><i class="fas fa-user-friends"></i>Residents</a></li>
			<li><a href="livechat.html"><i class="fas fa-comment-dots"></i>Live Chat</a></li>
			<li><a href="update-bill.html"><i class="fas fa-bolt"></i>Update bill</a></li>
			<li><a href="payment-log.html"><i class="fas fa-money-bill-alt"></i>Payment Log</a></li>
			<li><a href="visitor-log.html"><i class="fas fa-address-card"></i>Visitor Log</a></li>
			<li><a href="announcement.html"><i class="fas fa-bell"></i>Announcements</a></li>
			<li><a href="bookings.html"><i class="fas fa-building"></i>Facility bookings</a></li>
			<li><a href="login.html" id="logout"><i class="fas fa-sign-out-alt"></i>Logout</a></li>
		</ul>
	</div>
	
	<div class="update-bill">
		<h1>Update bill</h1>
		
		<form action="confirm_bill.php" id="update-bill-form" method="post" class="mt-0 col-md-10" class="update-bill-form">
			<input type="hidden" name="user_id" id="user_id" <?php setValue($_POST['user_id']); ?> />
			<div class="form-row">
				<div class="col-md-4 mb-4">
					<label for="name">Name</label>
					<input type="text" name="name" id="name" class="form-control" <?php setValue($_POST['name']); ?> placeholder="John Doe" required <?php disable(); ?> />
				</div>	
				<div class="col-md-4 mb-4">
					<label for="ic">IC</label>
					<input type="text" name="ic" id="ic" class="form-control" <?php setValue($_POST['ic']); ?> placeholder="012345131234" required <?php disable(); ?> />
				</div>	
			</div>
		
			
			<div class="form-row">
				<div class="col-md-4 mb-4">
					<label for="email">Email</label>
					<input type="text" name="email" id="email" class="form-control" <?php setValue($_POST['email']); ?> placeholder="johndoe@gmail.com" required <?php disable(); ?> />
				</div>	
				<div class="col-md-4 mb-4">
					<label for="contact">Contact</label>
					<input type="text" name="contract" id="contact" class="form-control" <?php setValue($_POST['contact']); ?> placeholder="0123456789" required <?php disable(); ?> />
				</div>	
			</div>
		
		
			<div class="form-row">
				<div class="col-md-4 mb-4">
					<label for="price" >Price</label>
					<input type="digit" name="price" id="price" class="form-control" placeholder="89.95" pattern="^[1-9][0-9]+[.]?[0-9]{0,2}$" required />
				</div>
				<div class="col-md-4 mb-4">
					<label for="payment-desc">Payment Description</label>
					<input type="text" name="payment-desc" id="payment-desc" class="form-control" placeholder="<?php getMonth(); ?> Bill" required />		
				</div>		
			</div>

			<!--<div class="form-row">
				<div class="col-md-4 mb-4">
					<label for="bill-for">Bill for</label>
					<select class="form-control" id="resident-type">
						<optgroup label="User">
						  <option value="landlord">Landlord</option>
						  <option value="tenant">Tenant</option>
						</optgroup>
					</select>
				</div>	
			</div>-->
			
			<div class="form-row">
				<div class="col-md-4 mb-4">
					<label for="unit_no">Unit No.</label>
					<input type="text" name="unit_no" id="unit_no" class="form-control" <?php setValue($_POST['unit']); ?> placeholder="B-8-1" required <?php disable(); ?> />
				</div>	
			</div>
			<input type="submit" value="Update" />
				
			
			<!--<button action="confirm_bill.php" id="update-button" type="submit" value="Update" name="update"><i class="fas fa-check"></i> Update</button>-->				
		</form>
	</div>
	
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.21.1/firebase-app.js"></script>
<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.21.1/firebase-analytics.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.21.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.21.1/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.21.1/firebase-functions.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.23.0/firebase-storage.js"></script>
<script src="firebase.js"></script>
<script src="auth(logged in).js"></script>
<script src="update-bill-resident.js"></script>
</body>
</html>