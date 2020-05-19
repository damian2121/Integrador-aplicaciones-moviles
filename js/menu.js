$(function(){
  $(".menu-toggle").click(function(){
    if($(".menu-toggle, .prl-menu").hasClass("active"))
      $(".menu-toggle, .prl-menu, .prl-iframe").removeClass("active");
    else
      $(".menu-toggle, .prl-menu, .prl-iframe").addClass("active");
  });
  $(".prl-menu a").click(function(){
    $(".menu-toggle").click();
  })
});