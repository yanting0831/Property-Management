function createGraph(){
	var ctx = document.getElementById('myChart').getContext('2d');
	var min = "2021/03";
	var max = "2022/02"
	
	/* Get All Booking Details */
	db.collection("booking").get().then((querySnapshot) => {
		let list = [];
		let date_list = [];
		querySnapshot.forEach((doc) => {
			let facility = doc.data().facility;
			let date = doc.data().date;
			date = date.split("-");
			let month = "";
			
			switch(date[1]){
				case "January":
				case "1":
				case "01":
					month = "01";
					break;
				case "Febuary":
				case "2":
				case "02":
					month = "02";
					break;
				case "March":
				case "3":
				case "03":
					month = "03";
					break;
				case "April":
				case "4":
				case "04":
					month = "04";
					break;
				case "May":
				case "5":
				case "05":
					month = "05";
					break;
				case "June":
				case "6":
				case "06":
					month = "06";
					break;
				case "July":
				case "7":
				case "07":
					month = "07";
					break;
				case "August":
				case "8":
				case "08":
					month = "08";
					break;
				case "September":
				case "9":
				case "09":
					month = "09";
					break;
				case "October":
				case "10":
					month = "10";
					break;
				case "November":
				case "11":
					month = "11";
					break;
				case "December":
				case "12":
					month = "12";
					break;
			}
			
			var keyname = date[2] + "/" + month;
			
			/* Push Date */
			function pushDate(){
				if(!date_list.includes(keyname))
					date_list.push(keyname);
			}
			
			/* Min Max Date Filter */
			if(min != "" || max != ""){
				let min_date = min.split("/");
				let min_month = min_date[1];
				let min_year = min_date[0];
				let max_date = max.split("/");
				let max_month = max_date[1];
				let max_year = max_date[0];
				
				/* Both input not empty */
				if(min != "" && max != ""){
					if(max_year > date[2] && min_year < date[2]){
						pushDate();
					}
					else if((max_year == date[2] && max_month >= month) || (min_year == date[2] && min_month <= month)){
						pushDate();
					}
				}
				/* Only Max input empty */
				if(max == ""){
					if(min_year <= date[2]){
						if(min_month <= month)
							pushDate();
					}
				}
				/* Only Min input empty */
				else if(min == ""){
					if(max_year >= date[2]){
						if(max_month >= month)
							pushDate();
					}
				}
			}
			else{
				pushDate();
			}
			
			if(keyname in list && facility in list[keyname])
				list[keyname][facility] += 1;
			else{
				if(!(keyname in list))
					list[keyname] = [];
				list[keyname][facility] = 1;
			}	
		});
		
		date_list.sort();
		
		console.log(date_list);
		
		return [date_list,list];
	}).then((list) => {
		var data = list[1];
		
		/* TODO: Get All Facilities */
		let facilities = ["BBQ Pit","AV Room","Sauna","Sky Lounge","Gym"];
		
		for (var key in data) {
			let facility_data = data[key];
			
			/* Set 0 if no data for certain facilities */
			for (var i = 0; i < facilities.length; i++) {
				if(!(facilities[i] in facility_data))
					facility_data[facilities[i]] = 0;
			}
		
			data[key] = facility_data;
		}
		
		return [facilities,data,list[0]];
	}).then((data) => {
		let facilities = data[0];
		let sorted_data = data[1];
		let date_list = data[2];
		let dataset = [];
		let label = [];
		
		for(var j in date_list){
			for (var key in sorted_data) {
				let date = key;
				let facility_data = sorted_data[key];
				
				/* Push oldest data first */
				if(date == date_list[j]){
					if(!label.includes(key))
						label.push(key);
					
					/* Get Values from all facilities */
					for (var i = 0; i < facilities.length; i++) {
						if(!(facilities[i] in dataset))
							dataset[facilities[i]] = [];
						dataset[facilities[i]].push(facility_data[facilities[i]]);
					}
				}
			}
		}
		
		for(var i = 0; i < label.length; i++){
			let year = label[i].split("/");
			let month = "";
			let label_name = "";
			switch(year[1]){
				case "01":
					month = "January";
					break;
				case "02":
					month = "Febuary";
					break;
				case "03":
					month = "March";
					break;
				case "04":
					month = "April";
					break;
				case "05":
					month = "May";
					break;
				case "06":
					month = "June";
					break;
				case "07":
					month = "July";
					break;
				case "08":
					month = "August";
					break;
				case "09":
					month = "September";
					break;
				case "10":
					month = "October";
					break;
				case "11":
					month = "November";
					break;
				case "12":
					month = "December";
					break;
			}
			
			label_name = month + " " + year[0];
			
			label[i] = label_name;
		}
		
		/* Put Data into Graph */
		var bar_data = [];
		var color_list = ["rgba(255, 0, 0, 0.5)","rgba(0, 255, 0, 0.5)","rgba(0, 0, 255, 0.5)","rgba(255, 255, 0, 0.5)","rgba(255, 0, 255, 0.5)","rgba(0, 255, 255, 0.5)","rgba(128, 128, 128, 0.5)"];
		var bordercolor_list = ["rgba(255, 0, 0, 1)","rgba(0, 255, 0, 1)","rgba(0, 0, 255, 1)","rgba(255, 255, 0, 1)","rgba(255, 0, 255, 1)","rgba(0, 255, 255, 1)","rgba(128, 128, 128, 1)"];
		var count = 0;
		
		for (var key in dataset) {
			var facility_name = key;
			var data = dataset[key];
			bar_data.push({ label: facility_name, data: data, backgroundColor: color_list[count], borderColor: bordercolor_list[count] });
			count++;
		}
		
		var datasets = {
			datasets: bar_data,
			labels: label,
		};
		
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: datasets,
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
		
	}).catch((err) => {
		console.log(err);
	});
}

$(document).ready(() => {
	createGraph();
});