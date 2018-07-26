

fixFooter();

var userLang = navigator.language || navigator.userLanguage;
console.log(userLang);
if (userLang != "ru-RU" && userLang != "ru" && userLang != "RU") {
    $('.en').show();
    $('.ru').hide();
}



$(document).ready(function(){

  $('#sender').click(function(){

    var name = $('.name').val();
    var email = $('.email').val();
    var text = $('.text').val();

    // alert(name + email + text);
    $.post("https://wplatform.wintex.pro/contacts",
        {
            name: name,
            email: email,
            text: text,
        },
        function(data, status){
          if( status=='success' ){
            alert('Данные успешно отправлены!')
          }else{
            alert('В процессе отправки произошла ошибка')
          }
        });
  });


});

function fixFooter() {
	const footer = $("footer");
  const docHeight = $("body").height();
	const footerHeight = footer.height();
	const windowHeight = $(window).height();

	if(windowHeight > docHeight) {
		footer.addClass("fixed");
		$("body").height(windowHeight+footerHeight);
	} else {
		footer.removeClass("fixed");
        $("body").height(windowHeight-footerHeight);
	}
}

window.onresize = function(event) {
    fixFooter();
};


//var datat = [50,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0];



