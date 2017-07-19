$(document).ready(function(){
    $(".Toggle_mobile_btn").click(function(){
        $("body").toggleClass('open');
    });
});

$(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip(); 
    });
      
      jQuery('.menuTitle').click(function(){
       
       jQuery('.mainMenu ul').toggleClass('open-toggle');
      });

    jQuery(document).ready(function(){
      jQuery('.popup_o, .containerTimeline textarea#description').click(function() {
        debugger
           jQuery("body").addClass('open_popup');
       });
       jQuery(document).on('click','.remove_popup, .overlay',function(){
         jQuery("body").removeClass('open_popup');
       });
    });
