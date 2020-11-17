$(document).ready(function(){

    // 마우스 올렸을 때
    $(".gnb > ul > li").on("mouseenter", function(){
        $(".snb").css({"display" : "inline-block"});
        $("header").stop().animate({
            "height" : "405px"
        });
        $(".snb").animate({"opacity" : "1"});
    });
    // 마우스 내렸을 때
    $(".gnb > ul > li").on("mouseleave", function(){
        $("header").stop().animate({"height" : "175px"}, 300);
        $(".snb").stop().animate({"opacity" : "0"}, 300, function(){
            $(".snb").css({"display" : "none"});
        });
    })  
        // 배너

        let banner = $(".main > .banner");

        banner.find("h2").animate({"opacity" : "1", "top" : "0"}, 700);
        banner.find("p").animate({"opacity" : "1", "top" : "0"}, 700);
        banner.find(".img").animate({"opacity" : "1", "top" : "0"}, 700);
        


        // 서브헤더

        let subHeader= $(".main > .sub-header");
        let subTop = subHeader.find("top");
        let subHeaderTop = subHeader.offset().top;

        $(window).on("scroll", function(){
            let scroll = window.scrollTop();

            if(scroll > subHeaderTop){
                subHeader.addClass("fixed");

            }else{
                subHeader.removeClass("fixed");
            }
        });

        // 화면 맨위로 이동
        subTop.on("click", function(){
            $("html, body").stop().animate({
                scrollTop : 0
            }, 1000)
        });

        // 메뉴설명 보기

        let menu = $("#menu ul > li")

        menu.on("mouseenter", function(event){
                let target = event.currentTarget;

                $(target).find(".ko_title").stop().animate({"top" : "50px"}, 400);
                $(target).find(".en_title").stop().animate({"top" : "95px"}, 400);
                $(target).find(".desc").stop().animate({"top" : "125px", "opacity" : "1"}, 500);
                $(target).find(".icon").stop().animate({"bottom" : "30px", "opacity" : "1"}, 300);
            });

        menu.on("mouseleave", function(event){
            let target = event.currentTarget;

            $(target).find(".ko_title").stop().animate({"top" : "100px"});
            $(target).find(".en_title").stop().animate({"top" : "145px"});
            $(target).find(".desc").stop().animate({"top" : "200px", "opacity" : "0"});
            $(target).find(".icon").stop().animate({"bottom" : "100px", "opacity" : "0"});
        });

        let menuTab = $("#menu-tab ul > li");

        menuTab.on("click", function(event){
            let target = event.currentTarget;

            let menuName = $(target).data("menu");

            menuTab.removeClass("active");
            $(target).addClass("active");

            $(menu).stop().animate({"opacity" : "0"}, 400, function(){
                $(menu).css({"display" : "none"});
                if(menuName === "all"){
                    $(menu).stop().css({"display" : "block"}).animate({"opacity" : "1"});
                } else{
                    $(`.${menuName}`).stop().css({"display" : "block"}).animate({"opacity" : "1"});
                }
            });
        })
})