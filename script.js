const wrap = document.createElement("div")
wrap.className="wrap";

//Input box creation
const inputName = document.createElement("input")
inputName.setAttribute("type","text")
inputName.setAttribute("class","inputSearch")
inputName.setAttribute("placeholder","Enter the Anime Name");

//button creation
const btn = document.createElement("button")
btn.setAttribute("class","searchButton")
btn.setAttribute("onclick","getData()")
const icon = document.createElement("i")
icon.setAttribute("class","fa fa-search")
btn.append(icon)
//adding input and button
wrap.append(inputName,btn)
document.body.append(wrap)
//display div
var relatedAnimeData = document.createElement("div");
relatedAnimeData.className="relatedAnimeData";
document.body.append(relatedAnimeData)

//async function to get the data from Anime API
async function getData(){
  try{
    var animeName = document.querySelector("input").value
    console.log(animeName)
    
    const  relatedAnimeData1 = document.querySelector(".relatedAnimeData")
    relatedAnimeData1.innerHTML="";
    const allAnimesData = await fetch("https://api.jikan.moe/v3/search/anime?q="+animeName);
    const animesData = await allAnimesData.json()

    const animesDataResult = animesData.results;
     
    animesDataResult.forEach((anime) => {
      const animeCard = document.createElement("div");
      animeCard.className="animeCard";
      const animePoster = document.createElement("img");
      animePoster.setAttribute("src" , anime.image_url);
      console.log(anime.image_url)
      const animeInfo = document.createElement("div");
      animeInfo.className="animeInfo";
      animeInfo.innerHTML = `
                <p>Title: <span>${anime.title}</span></p>
                <p>Start Date: <span>${Date(anime.start_date).split("+")[0]}</span></p>
                <p>End Date: <span>${Date(anime.end_date).split("+")[0]}</span></p>
                <p>Type: <span>${anime.type}</span></p>
                <p>IMDB Rating: <span>${anime.score}</span></p>
             `;
      animeCard.append(animePoster,animeInfo)
      relatedAnimeData.append(animeCard)
      })
    document.body.append(relatedAnimeData)
  }
  catch(error){
    console.log("No Anime matched with search")
    window.alert("No Anime matched with search")
    inputName.innerHTML="";
  }
}
