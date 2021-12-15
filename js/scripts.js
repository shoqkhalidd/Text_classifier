$(document).ready(function(){
	// after the page ready the below code 
	$("#textForm").submit(function(event) {
		event.preventDefault();
		let statement = $("#usertext").val();
		if(!statement){
			alert( "Please enter the text." );
			return;
		}
		
		jsonData={
			"statement" : statement
		}
		$.ajax({
			type: 'GET',
			url: '/fasttext',
			data: jsonData,
			success: function (success) { 
				let status = success.status;
				let result = success.result;
				let message = success.message;
				if(status === "ERROR"){
					let rows = "<tr><td  colspan='4'>There are some errors.</td></tr>";
					rows += "<tr><td  colspan='4'>" + message + "</td></tr>";
					$('#tableResult > tbody').html(rows);
					return;
				}
				if(result.length == 0){
					$('#tableResult > tbody').html("<tr><td  colspan='4'>There are no labels.</td></tr>");
					return;
				}
				
				let rows = "";
				result.forEach(function (element, index) {
					rows += "<tr><th>" + (index+1) + "</th><td colspan='2'>" + element.text + "</td><td>" + element.label + "</td></tr>";
				});
				$('#tableResult > tbody').html(rows);
			},
			error: function (error) {
				$('#tableResult > tbody').empty();
				let rows = "<tr><td  colspan='4'>There are some errors.</td></tr>";
				rows += "<tr><td  colspan='4'>" + error + "</td></tr>";
				$('#tableResult > tbody').html(rows);
			}
		});
	});
});
