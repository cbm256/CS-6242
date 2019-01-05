$(function(){
	$('button').click(function(){
		var user = $('#pred_date').val();
		$.ajax({
			url: '/get_pred',
			data: { 
              date: $('#datepicker').val(), 
              time: $('#timepicker').val()
            },
			type: 'POST',
			success: function(response){
    			var responseObj= JSON.parse(response);    			
    			var status=responseObj.status;
    			var passError=responseObj.pass;
    			if(status=="OK"){
        			init();
    			}
                if(status==='BAD')
                {
                    console.log("Oops something went wrong. Pleae debug!");
                }
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});