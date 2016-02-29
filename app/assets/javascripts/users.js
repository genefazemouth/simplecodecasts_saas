$(document.ready( function(){
    Stripe.setPublishableKey($(':meta[name = "stripe-key"]').attr('content'));
    //watch for form submission
    $('form-submit-btn').click(function(event){
        //prevent form submitting
        event.preventDefault();
        //disable button
        $('input[type=submit]').prop('disabled',true);
        var error = false;
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val(),
        
        if(!error){
        //get the stripe token
        Stripe.createToken({
            number: ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            exp_year: expYear,
            }, stripeResponseHandler);
        }
        
        return false;
        
    }); //form submission
    
    function stripeResponseHandler(status, response){
        //get a reference to the form
        var f = $("#pro_form");
        
        //get the token from the response
        var token = response.id;
        
        //add the token to the form as a hidden field
        f.append('<input type="hidden" name="user[stripe_card_token]" value= "' + token + '"/>');
        
        //submit the form
        f.get(0).submit();
    }
});