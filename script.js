const input=document.querySelector("input");
const submit=document.querySelector(".submit");
const btns=document.querySelectorAll("button");
const p=document.querySelector("h2");
const img=document.querySelector("img");

let keyword="tokyo";
let unit="imperial";

async function getWeather(keyword,unit,changeImg){
    try{
        const response=await fetch("https://api.openweathermap.org/data/2.5/weather?appid=03471e7ec8e15c4f269555bdbb77481a&q="+keyword+"&units="+unit);
        const data=await response.json();

        const str=keyword.charAt(0).toUpperCase()+keyword.slice(1);
        const symbol=unit==="imperial"?"F":"C";
        p.textContent=str+" temperature: "+data.main.temp+" "+symbol;
        if(changeImg) getImg(keyword);
    }
    catch(e){
        p.textContent="Error: please re-enter.";
        img.src="";
    }
}

async function getImg(keyword){
    try{
        const response = await fetch("https://api.giphy.com/v1/gifs/translate?api_key=ytpfw643S4754fwpWwpwN8RONluD5T8x&s="+keyword);
        const data = await response.json();
        img.src=data.data.images.original.url;
    }
    catch(e){
        img.src="";
    }
}

btns.forEach(btn=>{
    btn.addEventListener("click",function(e){
        if(input.value){
            let changeImg=false;
            keyword=input.value;
            if(e.target.className==="submit") changeImg=true;
            else if(e.target.className==="f") unit="imperial";
            else unit="metric";
            getWeather(keyword,unit,changeImg);
        }
        else{
            p.textContent="Please enter a location.";
            img.src="";
        }
    });
});