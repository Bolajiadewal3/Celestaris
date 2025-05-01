
$( document ).ready(function() {
    console.log( "ready!" );
    console.log(import.meta.env.BASE_URL);

    const baseUrl = import.meta.env.BASE_URL;


    $("body").mousedown(function() {
        $(this).css("cursor", `url(${baseUrl}Cursors/arrowhead-hover.svg), auto`);    });

    $("body").mouseup(function() {
        $(this).css("cursor", `url(${baseUrl}Cursors/arrowhead-mousedown.svg), auto`);
    });


   // $("#banner").attr("height", "100vh");
    //$("#banner").attr("width", "100%");

    //$("#banner").css("background-color", "black");
    //$("#titleImage").css("background-color", "blue");


    var buttonWidths = {};
    var buttonWidths2 = {};
    var fontsLoaded = false;


    document.fonts.ready.then(function () {




            $("#buttons").css("opacity", "0");
            $(".download").css("opacity", "0");

                $("i").each(function() {
                    $(this).css("font-size", "45px");
                    $(this).css("margin-left", "2px");
                    $(this).css("margin-right", "2px");

                    console.log("TRIES I")
                });

                console.log("INCREASED SIZE")



                $(".afterHover").each(function() {
                    $(this).css("gap", "20px");
                    $(this)[0].offsetWidth;
                    console.log("TRIES II")
                });

                console.log("INCREASED GAP")



                console.log("TRYING TO GET WIDTHS")


            setTimeout(function() {

               

                    $(".buttonBefore").each(function(){ 
                        $(this).css("overflow", "visible");
                        $(this).find(".beforeHover").css("display", "inline");
                        //$(this).find(".differentHover").css("display", "inline");
                        $(this).find(".afterHover").css("display", "none");

                        $(this)[0].offsetWidth;
                        console.log($(this)[0].offsetWidth);
                        var buttonId = $(this).attr("id");
                        buttonWidths[buttonId] = $(this).width();
                        console.log("TRIES III")


                    });



                    $(".buttonBefore").each(function(){ 
                        $(this).css("overflow", "visible");
                        $(this).find(".beforeHover").css("display", "none");
                        //$(this).find(".differentHover").css("display", "inline");
                        $(this).find(".afterHover").css("display", "inline-flex");

                        $(this)[0].offsetWidth;
                        console.log($(this)[0].offsetWidth);
                        var buttonId2 = $(this).attr("id");
                        buttonWidths2[buttonId2] = $(this).width();
                        console.log("TRIES IV")


                        if(buttonWidths2[buttonId2] <= 10) {buttonWidths2[buttonId2] = 70;}
                    });



                    $(".buttonBefore").each(function(){ 
                        $(this).css("overflow", "hidden");
                        $(this).find(".beforeHover").css("display", "inline");
                        //$(this).find(".differentHover").css("display", "inline");
                        $(this).find(".afterHover").css("display", "none");

                        $(this)[0].offsetWidth;
                        console.log("TRIES V")

                    });






                    console.log("FONTS LOADED");
                    fontsLoaded = true;


                    console.log("RUNNING");


                    console.log(buttonWidths)
                    console.log("AND")
                    console.log(buttonWidths2)


                    var currentButtonBeforeWdith;

                    $(".buttonBefore").mouseenter(function(){
                        var currentButtonWidth2 = buttonWidths2[$(this).attr("id")];
                        //var currentAfterHoverWidth = afterHoverWidths[$(this).find(".afterHover").attr("id")];

                        if($(this).has(".differentHover").length > 0) {
                            $(this).css("width", "auto");
                            return;
                        }



                        $(this).find(".beforeHover").css("color", "white");
                    // $(this).css("align-items", "center");

            

                        console.log("Getting to: " + currentButtonWidth2);
                        $(this).stop().animate({width: currentButtonWidth2});


                        $(this).find(".afterHover").css("display", "inline-flex");
                        $(this).find(".beforeHover").css("display", "none");
                    });




                    $(".buttonBefore").mouseleave(function(){
                        var currentButtonWidth = buttonWidths[$(this).attr("id")];
                        $(this).find(".afterHover").css("display", "none");

                        if($(this).has(".differentHover").length > 0) {
                            $(this).css("width", "auto");
                            return;
                        }


                        console.log("Getting to: " + currentButtonWidth);

                        $(this).stop().animate({width: currentButtonWidth});

                        $(this).find(".beforeHover").css("color", "black");
                        $(this).find(".beforeHover").css("display", "inline");

                    });






                    $("#buttons").animate({opacity: 1}, 1000);

                    //$(".buttons").css("opacity", "0");


                    $(".download").animate({opacity: 1}, 1000);

        }, 1000);





        $(".download").mouseenter(function() {
            $(this).find("p").css("display", "inline")
            $(this).find("p").css("opacity", "0")
            $(this).find("p").stop().animate({opacity: 1}, 500)
        });

        $(".download").mouseleave(function() {
            $(this).find("p").stop().animate({opacity: 0}, 500)
            $(this).find("p").css("opacity", "0")
        });






        var headings = $('h2, h3');
        var numHeadings = headings.length;
        var zIndices = {}

        var scrollBarLength = 75*numHeadings;
        var scrollBarHeight = 50;

        $(".spokes").css("width", scrollBarLength)

        var check = $('h3');
        var checkNum = check.length;

        headings.each(function(index) {
            var headingText = $(this).text();

            var step = scrollBarLength / numHeadings;

            var spoke = $('<div class="spoke"></div>');

            $('.spokes').append(spoke);
            spoke.css("left", (step*index));
            //spoke.css("right", scrollBarLength-((step*index)/2));
            //spoke.css("background-color", '#'+(Math.random()*0xFFFFFF<<0).toString(16))
            spoke.css("background-color", "white")
            spoke.css("width", step);
            spoke.css("height", scrollBarHeight);
            spoke.css("z-index", 50-index)


            console.log("check num = " + checkNum);
            console.log("classes = " + $(this));
            console.log("h2? = " + $(this).is('h2'));

            if(checkNum > 0 && $(this).is('h2')) { 
                //console.log(spoke.text())
                spoke.css("text-decoration", "underline"); 
            }


            if(checkNum > 0 && $(this).is('h3')) { 
                //console.log(spoke.text())
                spoke.css("font-size", "0.4em"); 
            }


            //spoke.html("")
            spoke.text(headingText)

            zIndices[spoke.attr("id")] = spoke.css("z-index")
            

        });









        $(".spoke").mouseenter(function() {
            $(this).css("z-index", 60)
            $(this).css("border", "1px solid var(--mainColour)")

            $(this).css("transform", "scale(1.4)")
            //$(this).css("background-color", "#ffd3ac")

            $(this).stop().animate({
                "background-color": "#d7d2cb",
                "border-radius": "10%"
            }, 500);

        });

        $(".spoke").mouseleave(function() {
            $(this).css("border", "none")

            $(this).css("transform", "scale(1.0)")
            $(this).css("z-index", zIndices[$(this).attr("id")])
            //$(this).css("background-color", "#d2d2d2")

            $(this).stop().animate({
                "background-color": "white",
                "border-radius": "0%"
            }, 500);


        });




        $(".scroll-circle").mouseenter(function() {
            $(this).find(".scrollPercentage").stop().animate({opacity: 0, "font-size": "0.3em"}, 400, function() {$(this).hide()})

            $(this).parent().parent().css("overflow", "visible");

            $(this).stop().animate(
                {
                    width: scrollBarLength,
                    "border-radius": "0%",
                    height: scrollBarHeight,
                    //"font-size": "1.3em"
                }, 1000, function() {
                    $(".spokes").css("display", "inline-flex");
                }
            );
        });


        $(".scroll-circle").mouseleave(function() {
            $(".spokes").css("display", "none");

            $(this).parent().parent().css("overflow", "hidden");


            $(this).stop().animate(
                {
                    width: "70px",
                    "border-radius": "50%",
                    height: "70px",
                    //"font-size": "0.7em"
                }, 1000, function() {
                    $(this).find(".scrollPercentage").show();
                    $(this).find(".scrollPercentage").stop().animate({opacity: 100, "font-size": "2em"}, 400)
                }
            );
        });



        var counter = 0;

        $("#page").scroll(function() {
            //console.log("SCROLLING")
            counter = counter+1;

            var scrollTop = $(this).scrollTop();
            

            //var docHeight = $(this).height() - scrollTop;


            var artHeight = $("#articleHolder").height(); 
            //var windowHeight = $(window).height();

            var scrollPercent = (scrollTop / artHeight) * 100;

            if(counter > 20) {
                console.log("SCROLL ON PAGE: " + scrollTop)
                counter = 0;
            }
            //console.log("DOCUMENT HEIGHT: " + $(document).height())
            //console.log("ARTICLE HEIGHT: " + artHeight)

            //console.log("WINDOW HEIGHT: " + $(window).height())
            //console.log("PERCENTAGE: " + scrollPercent)


                $('.scrollPercentage').text(Math.round(scrollPercent) + '%');
          });
        
          console.log("HERE IN EXECUTION")



          $(".spoke").click(function() {
            console.log("TRYING TO MOVE")
            var textToFind = $(this).text().trim();
            //console.log($(this).text().trim())
    
    
    
            var headingToScrollTo = headings.filter(function() {
               //console.log($(this).text())
                return $(this).text().trim() === textToFind;
              });
    
              //console.log(headingToScrollTo)
              //console.log($(headingToScrollTo))
              console.log($(headingToScrollTo).offset())
              console.log($(headingToScrollTo).offset().top)
    
              
                $("#page").stop().animate({
                    //scrollTop: $(headingToScrollTo).offset().top
                    scrollTop: $('#page').scrollTop() + $(headingToScrollTo).offset().top - 50
                });
    
                //$(headingToScrollTo).scrollIntoView()
    
    
        });


        $(".sectionFigure").each(function() {
            if($(this).find("img").width() > (0.6 * $(this).width()) ) {
                console.log($(this).find(".overlay").text());

                $(this).find(".overlay").css("z-index", "42");
                $(this).find(".overlay").css("width", "40%");
                $(this).find(".overlay").css("height", "25%");

            }

        });


        $(".sectionFigure").mouseenter(function() {
            //$(this).parent().find(".overlay").stop().animate({opacity: 1}, 1000);

            $(this).find(".overlay").stop().animate({opacity: 1}, 1000);
            $(this).find("img").stop().animate({left: "24%"}, 1000);
            $(this).find("img").css("filter", "grayscale(.9)")

        });

        $(".sectionFigure").mouseleave(function() {
            $(this).find(".overlay").stop().animate({opacity: 0}, 1000);
            $(this).find("img").stop().animate({left: "50%"}, 1000);
            $(this).find("img").css("filter", "grayscale(0)")


        });



        $(".fa-github").click(function() { window.location.href = "https://github.com/Bolajiadewal3"; });
        //$("fa-brands fa-discord").click(function() { window.location.href = "https://www.example.com"; });
        $(".fa-youtube").click(function() { window.location.href = "https://www.youtube.com/channel/UC4o8iPQxXBJWUjtG3ffv3Dw"; });
        $(".fa-instagram").click(function() { window.location.href = "https://www.instagram.com/bolaji.ad"; });
        $(".fa-soundcloud").click(function() { window.location.href = "https://soundcloud.com/mobolaji-adewale"; });
        $(".fa-spotify").click(function() { window.location.href = "https://www.example.com"; });




         


});



$(window).on('load', function(){
    console.log("LOADED")
    

  });

     

});