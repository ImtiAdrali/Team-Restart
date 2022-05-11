// document.getElementById("title").addEventListener("change", (e) => {
//     console.log(e.target.value);
// })


const inputField = document.getElementById("discription");
let countLetters = document.getElementById("count");
console.log(countLetters.textContent);
inputField.addEventListener("input", (e) => {
    
    const {value} = e.target;
    
    countLetters.textContent = value.length;
})

function visitHome() {
    window.location.href = "/";
   
}