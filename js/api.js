window.addEventListener("DOMContentLoaded", () => {
    // JSON : 데이터 교환 형식
    
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
            menuWrap.append(node);
        }
    }
    listSandwich();
}); 