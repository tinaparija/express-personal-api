console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  $.ajax({
    method:"GET",
    url: "/api/profile",
    success: function(data) {
    	$(".image-container").html(`<img src="${data.my_friends}" id="friends-image">`); 
    }, 
    error: handleError
  });

  $.ajax({
    method:"GET",
    url: "/api/cities",
    success: handleSuccess,
    error: handleError
  });

  $('form').on('submit', function(e) {
  	e.preventDefault();
  	$.ajax({
  		method: "POST",
  		url: "/api/cities",
  		data: $('form').serialize(),
  		success: renderCity,
  		error: handleError
  	})
  	$('input').val('');
  });

  function handleSuccess(cities){
    cities.forEach(function(city) {
      renderCity(city);
    });
  }

  function handleError(error) {
    console.log("there has been an error: ", error);
  }

  function renderCity(city) {
    var cityDisplay = 
      `<section>
      	<p class ="cityname">${city.name}</p>
      	<p>${city.description}</p>
      </section>`;

    $('#cityTarget').append(cityDisplay);
  }; 
}); 
