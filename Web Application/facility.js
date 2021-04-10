/* Random Generate Colours */
function colorize(opaque) {
  return (ctx) => {
    var v = ctx.parsed.y;
    var c = v < -50 ? '#D60000'
      : v < 0 ? '#F46300'
      : v < 50 ? '#0358B6'
      : '#44DE28';

    return opaque ? c : Utils.transparentize(c, 1 - Math.abs(v / 150));
  };
}
console.log(Chart.defaults);
function createGraph(){
	var ctx = document.getElementById('myChart').getContext('2d');
	
	/* Get All Booking Details */
	db.collection("booking").get().then((querySnapshot) => {
		let list = [];
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
			
			if(keyname in list && facility in list[keyname])
				list[keyname][facility] += 1;
			else{
				if(!(keyname in list))
					list[keyname] = [];
				list[keyname][facility] = 1;
			}	
		});
		list.sort();
		
		return list;
	}).then((data) => {
		/* TODO: Get All Facilities */
		let facilities = ["BBQ Pit","AV Room","Sauna","Sky Lounge","Gym"];
		
		for (const [key, value] of Object.entries(data)) {
			let facility_data = value;
			
			/* Set 0 if no data for certain facilities */
			for (var i = 0; i < facilities.length; i++) {
				if(!(facilities[i] in facility_data))
					facility_data[facilities[i]] = 0;
			}
		
			data[key] = facility_data;
		}
		
		return [facilities,data];
	}).then((data) => {
		let facilities = data[0];
		let dataset = [];
		let label = [];
		
		for (const [key, value] of Object.entries(data[1])) {
			let date = key;
			let facility_data = value;
			
			if(!label.includes(key))
				label.push(key);
			
			/* Get Values from all facilities */
			for (var i = 0; i < facilities.length; i++) {
				if(!(facilities[i] in dataset))
					dataset[facilities[i]] = [];
				dataset[facilities[i]].push(facility_data[facilities[i]]);
			}
		}
		
		label.sort();
		
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
		var count = 0;
		
		for (const [key, value] of Object.entries(dataset)) {
			var facility_name = key;
			var data = value;
			bar_data.push({ label: facility_name, data: data, backgroundColor: color_list[count] });
			count++;
		}
		
		console.log(bar_data);
		
		var datasets = {
			datasets: bar_data,
			labels: label,
		};
		
		console.log(datasets);
		
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
		
		console.log(myChart);
	}).catch((err) => {
		console.log(err);
	});
}

$(document).ready(() => {
	createGraph();
});