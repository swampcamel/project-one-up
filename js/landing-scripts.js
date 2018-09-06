$(document).ready(function() {
  $("#logo").addClass("slide-in-blurred-tr");

    $("#logo").click(function() {
      $("#logo").addClass("slide-out-bl");
      $("#banner").show().addClass("slide-in-top");
      $("#play-button").show().addClass("fade-in-fwd")
    });

    $("#play-button").click(function() {
      $("#banner").addClass("fade-out");
      $("#banner-blank").show();
      $("#names-input").show();
      $("#play-button").hide();
      $("#confirm-button").show();
    })

    $("#confirm-button").click(function() {
      $("form").submit(event);
      event.preventDefault();
      alert("Store These Values");
      // $(".game-page").show();
    })
})


// Back-End

// Set up Local Storage on button-click.
