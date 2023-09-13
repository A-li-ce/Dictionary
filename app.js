const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.querySelector(".result");
const sound = document.querySelector("#sound");
const inpWord = document.querySelector("#inp-word");
const btn = document.querySelector("#search-btn");
const spBtn = document.querySelector("#speaker");

btn.addEventListener('click', ()=>{
    let inpVal = inpWord.value;
    // console.log(inpVal);
    fetch(`${url} ${inpVal}`)
    .then(Response => Response.json())
    .then(data => {
        console.log(data);
        if(result === null){
            console.log("null value");
        }else{
            result.innerHTML = `
            <div class="word">
            <h3>${inpVal}</h3>
            <button onclick ="playSound()">
            <i class="fa-solid fa-volume-high"></i>
            </button>
            </div>
            
            <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetic}/</p>
            </div>
            
            <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
            </p>
            
            <p class="word-example">
            ${data[0].meanings[0].definitions[0].example || " "}
            </p>          
            `
            sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
            console.log(sound);
            
            
        }
        
    })
    .catch(()=>{
        result.innerHTML = `<br> <br>
        <h3>Couldn't Find The Word!</h3>`;
    })
});

function playSound(){
    sound.play();
}