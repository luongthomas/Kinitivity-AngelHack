//Image Credit - https://medium.com/

//https://github.com/andreasstorm

$(window).scroll ->
  oVal = ($(window).scrollTop() / 240)
  $(".blur").css "opacity", oVal