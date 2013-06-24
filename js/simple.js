$(document).ready(function() {
    $("h2 span").click(function() {
        var all = $(this).parent().nextUntil("h2");
        if ($(this).text() == "o") {
           all.fadeTo("slow",0.0);
           all.each(function(index) {
               $(this).css("top", -1 * index +"em");
               $(this).css("display","none");
           });
           $(this).text("-");
        } else if ($(this).text() == "-") {
           all.fadeTo("fast",1.0);
           all.show("fast");
           $(this).text("o");
        } 
    });

    $("#sidebar span").click(function() {
        if ($(this).text() == "more") {
            $(this).hide();
            $(".b").css({"opacity":"1.0"}).show();
        } else {
            $(".b").css({"opacity":"0.0"}).hide();
            $(".a").show();
        }
    });

      
    // google analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
           (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
           m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
           })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

     ga('create', 'UA-41300363-1', 'cdosborn.com');
     ga('send', 'pageview');
});


