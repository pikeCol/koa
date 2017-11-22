    var wow = new WOW();
    wow.init();
      var  hascs = false;
    $('.about').hover(function(){
      $('.submenu').stop().slideDown()
      hascs = $(this).find('.parent').hasClass('choose')
      $(this).find('.parent').addClass('choose')
      $(this).find('.line').show().addClass('slideInDown')
    }, function() {
      if (!hascs) {
        $(this).find('.parent').removeClass('choose')
      }
      $('.submenu').stop().slideUp()
    })



    $('.navs li').hover(function(){
      if ( $(this).find('a').hasClass('choose') ) {
        return
      }
      $(this).find('.line').show().addClass('slideInDown')
    }, function(){
      if ( $(this).find('a').hasClass('choose') ) {
        return
      }
      $(this).find('.line').hide().removeClass('slideInDown')
    })


// pulse
    // $('.culturitem .culmask').hover(function(){
    //   $(this).find('img').css({
    //     transform:'scale3d(1.3, 1.3, 1.3)',
    //     transition: 'all 2s'
    //   })
     
    // }, function() {
    //   $(this).find('img').css({
    //     transform:'scale3d(1, 1, 1)',
    //     transition: 'all 1s'
    //   })
      
    // })