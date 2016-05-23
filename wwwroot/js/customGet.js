$(document).ready(function () {
	
  $('#get-data-all').click(function () {

    var showData = $('#show-data');

    $.getJSON('http://localhost:4000/notebookall', function (data,status) {

			if (status == 'success'){
				console.log(data);
				
				var sortCriteria = "datefinished";
				var sortOrder = true;
				var filterCriteria = "datefinished";
				
				// sort data
				var sort_by = function(field, reverse, primer){
					 var key = function (x) {return primer ? primer(x[field]) : x[field]};

					 return function (a,b) {
						var A = key(a), B = key(b);
						return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];                  
					 }
				}
				data.sort(sort_by(sortCriteria,sortOrder,parseInt));

				// filter data
				var dataFiltered = $.grep(data, function(element, index){
						return element[filterCriteria] != "";
						//return element.datefinished != "";
				});
				
				
				var items = dataFiltered.map(function (item) {
					
					var datecreateOut = item.datecreate;
					datecreateOut = moment(datecreateOut,"YYYYMMDDHHmmss").format("YYYY-MM-DD-HH-mm-ss");
					var datetargetOut = item.datetarget;
					datetargetOut = moment(datetargetOut,"YYYYMMDDHHmmss").format("dddd-WW");
					
					return item.noteid + ' | ' + item.guid + ' | ' + item.title + ' | ' + item.importance  + ' | ' + datecreateOut  + ' | ' + item.datefinished  + ' | ' + datetargetOut;
					//return item.noteid + ' | ' + item.guid + ' | ' + item.title + ' | ' + item.importance  + ' | ' + item.datecreate  + ' | ' + item.datefinished  + ' | ' + item.datetarget;
				});

				showData.empty();

				if (items.length) {
					var content = '<li>' + items.join('</li><li>') + '</li>';
					var list = $('<ul />').html(content);
					showData.append(list);
				}
			}
    });

    showData.text('Loading the JSON file.');

  });
	
	$('#get-data-note').click(function () {

    var showData = $('#show-data');

    $.getJSON('http://localhost:4000/notebook?noteid=3', function (data,status) {
			
			if (status == 'success'){
				console.log(data);

				var items = data.map(function (item) {
					return item.noteid + ' | ' + item.guid + ' | ' + item.title + ' | ' + item.importance  + ' | ' + item.datecreate  + ' | ' + item.datefinished  + ' | ' + item.datetarget;
				});

				showData.empty();

				if (items.length) {
					var content = '<li>' + items.join('</li><li>') + '</li>';
					var list = $('<ul />').html(content);
					showData.append(list);
				}
			}
    });
    showData.text('Loading the JSON file.');

  });	
	
});



