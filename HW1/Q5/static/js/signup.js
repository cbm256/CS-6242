$(function(){
	$('button').click(function(){
		var user = $('#inputUsername').val();
		var pass = $('#inputPassword').val();
		$.ajax({
			url: '/signUpUser',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
				if(response.status=='BAD'){
					var e=['Should be at least 8 characters in length','Should have at least 1 number','Should have at least 1 uppercase character']
					var msg='';
					for(var i=0;i<e.length;i++){
						msg+=e[response.pass-1];
					}

					$('p').text(msg);
				}
				else{
					var user = $('#inputUsername').val();
		var pass = $('#inputPassword').val();
		$('p').text("Congratulations on registering for CSE6242 " + user + " Redirecting you to the course homepage...");
		$('form')[0].reset();
		setTimeout("window.location.href='http://poloclub.gatech.edu/cse6242/2018spring/';",3000);

				}
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});

$(function(){
	$('button').click(function(){
		var user = $('#inputUsername').val();
		var pass = $('#inputPassword').val();
		$('p').text("Congratulations on registering for CSE6242 " + user + " Redirecting you to the course homepage...");
		$('form')[0].reset();
	});
});

$(function() {
    $('button').click(function () {
        setTimeout("window.location.href='http://poloclub.gatech.edu/cse6242/2018spring/';",3000);
    });
});

