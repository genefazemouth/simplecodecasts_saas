/*global Stripe*/
$(document).ready(function() {
  
  var key = $('meta[name="stripe-key"]').attr('content');
  Stripe.setPublishableKey(key);
  
  
  // Watch for a form submission:
  $("#form-submit-btn").click(function(event) {
    
    event.preventDefault();
    $('input[type=submit]').prop('disabled', true);
    var error = false;
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();

    if (!error) {
      // Get the Stripe token:
      Stripe.card.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    return false;
  }); // form submission
  
  function stripeResponseHandler(status, response) {
    // Get a reference to the form:
    var f = $("#pro_form");
    
    if(response.error){
       // Show the errors on the form
      alert(response.error.message);
      
    } else {
        // Get the token from the response:
        var token = response.id;
        // Add the token to the form:
        f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
    
        // Submit the form to server:
        f.get(0).submit(); 
    }
  }
  
});


