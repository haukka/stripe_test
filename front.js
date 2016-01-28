$(document).ready(function() {
    Stripe.setPublishableKey("your_key");
    $('#submit').on('click', function() {
	$('#submit').prop('disabled', true);
	$('#submit').button('progress');
	
	var cardNum = $('#card-num').val();
	var cardExp = $('#card-exp').val().split('/');
	var cardCVC = $('#card-cvc').val();
	Stripe.card.createToken({
            number: cardNum,
            exp_month: cardExp[0],
            exp_year: cardExp[1],
            cvc: cardCVC
	}, function(status, response) {
            var token = response.id;
	    $('#form').append($('<input type="hidden" name="stripeToken" />').val(token)); 
	    $('#form').get(0).submit();
	    setTimeout(function() {
		$('#checkout').modal('hide');
	    }, 250);
	    $('#submit').prop('disabled', false);
	});
	return false;
    });
});
