const input=document.querySelector("input");
const submit=document.querySelector(".submit");
const f=document.querySelector(".f");
const c=document.querySelector(".c");
const p=document.querySelector("h2");
const img=document.querySelector("img");

let keyword="tokyo";
let unit="imperial";

async function getWeather(keyword,unit){
    try{
        const response=await fetch("http://api.openweathermap.org/data/2.5/weather?appid=03471e7ec8e15c4f269555bdbb77481a&q="+keyword+"&units="+unit);
        const data=await response.json();

        const str=keyword.charAt(0).toUpperCase()+keyword.slice(1);
        const symbol=unit==="imperial"?"F":"C";
        p.textContent=str+" temperature: "+data.main.temp+" "+symbol;
        getImg(keyword);
    }
    catch(e){
        p.textContent=e;
    }
}

async function getImg(keyword){
    try{
        const response = await fetch("https://api.giphy.com/v1/gifs/translate?api_key=ytpfw643S4754fwpWwpwN8RONluD5T8x&s="+keyword);
        const data = await response.json();
        img.src=data.data.images.original.url;
    }
    catch(e){
        
    }
}

submit.addEventListener("click",()=>{
    if(!input.value) p.textContent="Please enter a location";
    else{
        keyword=input.value;
        getWeather(keyword,unit);
    }
});

f.addEventListener("click",()=>{
    if(!input.value) p.textContent="Please enter a location";
    else{
        unit="imperial";
        getWeather(keyword,unit);
    }
});

c.addEventListener("click",()=>{
    if(!input.value) p.textContent="Please enter a location";
    else{
        unit="metric";
        getWeather(keyword,unit);
    }
});