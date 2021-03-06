// JavaScript Document

document.getElementById('cancel').addEventListener ('click',(e) => {
	
	preview_invoice(false);
});

document.getElementById('generate_inv').addEventListener ('click',(e) => {
	e.preventDefault();
	var prices = document.getElementById('prices').getElementsByTagName('input');
	var descriptions = document.getElementById('descriptions').getElementsByTagName('input');
	
	//check inputs
	console.log(prices[0].value);
	console.log(descriptions[0].value);
	
	if(prices.length == descriptions.length && (prices.length != 0 || descriptions.length != 0)){
	   	//display preview
		preview_invoice(true);
	}else{
		alert("incorrect number");
	}
		
});



function preview_invoice(show){
	var prices = document.getElementById('prices').getElementsByTagName('input');
	var descriptions = document.getElementById('descriptions').getElementsByTagName('input');
	
	var inv = document.getElementById('inv_box');
	var items = document.getElementsByClassName('item');
	var total_amount = document.getElementById('total_amount');
	var confirm_bill = document.getElementById('confirm_bill');
	
	var sidebar = document.getElementById('sidebar_opac');
	var form = document.getElementById('form_opac');
	
	
	var total = 0;
	
	/*<div style="position:absolute;left:48.19px;top:334.52px" class="cls_009"><span class="cls_009">Test</span></div>
	<div style="position:absolute;left:242.46px;top:334.52px" class="cls_010"><span class="cls_010">1</span></div>
	<div style="position:absolute;left:303.67px;top:334.52px" class="cls_010"><span class="cls_010">$0.00</span></div>
	<div style="position:absolute;left:368.22px;top:334.52px" class="cls_010"><span class="cls_010">$0.00</span></div>
	<div style="position:absolute;left:441.66px;top:334.52px" class="cls_010"><span class="cls_010">$0.00</span></div>
	<div style="position:absolute;left:506.21px;top:334.52px" class="cls_010"><span class="cls_010">$0.00</span></div>*/
	
	if(show){
		//updateui
		inv.style.display = "block";
		sidebar.style.opacity = "0.5";
		form.style.opacity = "0.5";
		
		
		//count total amount
		for (i = 0; i < descriptions.length; i++) {
		  	total = total + parseFloat(prices[i].value);
			inv.innerHTML += '<div style="position:absolute;left:48.19px;top:334.52px" class="cls_009"><span class="cls_009">'+descriptions[i].value+'</span></div><div style="position:absolute;left:242.46px;top:334.52px" class="cls_010"><span class="cls_010">1</span></div><div style="position:absolute;left:303.67px;top:334.52px" class="cls_010"><span class="cls_010">$0.00</span></div><div style="position:absolute;left:368.22px;top:334.52px" class="cls_010"><span class="cls_010">'+prices[i].value+'</span></div><div style="position:absolute;left:441.66px;top:334.52px" class="cls_010"><span class="cls_010">$0.00</span></div><div style="position:absolute;left:506.21px;top:334.52px" class="cls_010"><span class="cls_010">$0.00</span></div>';
			
			confirm_bill.innerHTML += '<input type="hidden" id="ip'+i+'" name="ip'+i+'" value="'+prices[i].value+'">';
			confirm_bill.innerHTML += '<input type="hidden" id="item'+i+'" name="item'+i+'" value="'+descriptions[i].value+'">';
		}
		
		inv.innerHTML += '<div style="position:absolute;left:423.27px;top:406.80px" class="cls_009"><span class="cls_009">Total</span></div><div style="position:absolute;left:502.88px;top:406.80px" class="cls_009"><span class="cls_009">'+total+'</span></div><div style="position:absolute;left:45.35px;top:807.05px" class="cls_010"><span class="cls_010">Dryx Residence</span></div><div style="position:absolute;left:499.21px;top:807.05px" class="cls_010"><span class="cls_010">Page 1 of 1</span></div>';
		
		confirm_bill.innerHTML += '<input type="hidden" id="total_p" name="total_p" value="'+total+'">';
		
	}else{
		inv.style.display = "none";
		sidebar.style.opacity = "1";
		form.style.opacity = "1";
	}
	
}
