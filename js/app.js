

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

        const menuShow = (event) => {
            menu.on("mouseenter", function(){
                let target = event.currentTarget;

                $(target).find(".ko_title").stop().animate({"top" : "50px"}, 400);
                $(target).find(".en_title").stop().animate({"top" : "95px"}, 400);
                $(target).find(".desc").stop().animate({"top" : "125px", "opacity" : "1"}, 500);
                $(target).find(".icon").stop().animate({"bottom" : "30px", "opacity" : "1"}, 300);
            });
        }


        const menuHide = (event) => {
            menu.on("mouseleave", function(){
                let target = event.currentTarget;
    
                $(target).find(".ko_title").stop().animate({"top" : "100px"});
                $(target).find(".en_title").stop().animate({"top" : "145px"});
                $(target).find(".desc").stop().animate({"top" : "200px", "opacity" : "0"});
                $(target).find(".icon").stop().animate({"bottom" : "100px", "opacity" : "0"});
            });
        }
       

       

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
        });
        const getSandwich = () => {
            return fetch("http://localhost:3000/subway/sandwich",{ 
            "method" : "GET",
            "headers" : {
                "Content-Type" : "application.json"
            }
            }).then(res => res).then(res => res.json())
        }
    
    
        const templateSandwichLabel = (label) => {
            if(label){
                return `<div class="label">${label}</div>`;
            }else{
                return ``;
            }
        }
    
    
        const templateSandwich = (sandwich) => {
    
            const {type, label, img, ko_title, en_title, kcal, summary, view_id} = sandwich;
            return `
            <li class="${type}">
            <a href="#">
                ${templateSandwichLabel(label)}
                <div class="label">${label}</div>
                <div class="img">
                    <img src="${img}" alt="${ko_title}">
                </div>
                <strong class="${img}">${ko_title}</strong>
                <span class="en_title">${en_title}</span>
                <span class="kcal">${kcal}</span>
                <p class="desc">${summary}</p>
                <div class="icon" data-id="${view_id}"></div>
            </a>
        </li>
            `
        }
        
        // sandwiches.then((data) => {
            
        // })
        const listSandwich = async () => {
            const sandwiches = await getSandwich();
            const menu = document.getElementById("menu");
            const menuWrap = menu.querySelector("ul");
            for(const sandwich of sandwiches) {
                const node = $(templateSandwich(sandwich))[0];
                $(node).on("mouseenter", menuShow);
                $(node).on("mouseleave", menuHide);
                menuWrap.append(node);
            }
        }
        listSandwich();
});