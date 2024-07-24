
let bookmarkName =document.querySelector("#bookmarkName")
let bookmarkURL =document.querySelector("#bookmarkURL")
let submitBtn =document.querySelector("#submitBtn")
let tableContent =document.querySelector("#tableContent")
let boxInfo =document.querySelector(".box-info")
let closeBtn =document.querySelector("#closeBtn")


let bookList;


if(localStorage.getItem("bookList")){
    bookList=JSON.parse(localStorage.getItem("bookList"))
    displaybook(bookList)
}else{
    bookList=[]
}


function addBook(){
   if(validateBookName() && validateURL()){
    let book={
        name:bookmarkName.value,
        url:bookmarkURL.value
    }
    
    bookList.push(book)
    setToLocalStorage()
    displaybook(bookList)
    console.log(bookList)
   }else{
    boxInfo.classList.remove("d-none")
   }
}


function displaybook(bookList){
    let cartoona=""
    for (let i = 0; i < bookList.length; i++) {
        cartoona +=`<tr>
                <td>${i+1}</td>
                <td>${bookList[i].name}</td>              
                <td>
                  <a href="${bookList[i].url}" target="_blank" class="btn btn-visit" data-index="0">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </a>
                </td>
                <td>
                  <button onClick="deleteBook(${i})" class="btn btn-danger pe-2" data-index="0">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>`
    }

    tableContent.innerHTML=cartoona;
}

function deleteBook(index){
   bookList.splice(index,1)
   setToLocalStorage()
   displaybook(bookList)
 }
 


function setToLocalStorage(){
    localStorage.setItem("bookList",JSON.stringify(bookList))
}



bookmarkName.addEventListener("input",function(){
    validateBookName()
})
bookmarkURL.addEventListener("input",function(){
    validateURL()
})
submitBtn.addEventListener("click",function(){
    addBook()
})



function validateBookName(){
    let booknameRegex=/[a-zA-Z0-9]{3,}/;
    if(booknameRegex.test(bookmarkName.value)){
        bookmarkName.classList.remove("is-invalid")
        bookmarkName.classList.add("is-valid")
        return true;

    }else{
        bookmarkName.classList.remove("is-valid")
        bookmarkName.classList.add("is-invalid")
        return false;
    }
}


function validateURL(){
    let urlRegex=/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

    if(urlRegex.test(bookmarkURL.value)){
        bookmarkURL.classList.remove("is-invalid")
        bookmarkURL.classList.add("is-valid")
        return true

    }else{
        bookmarkURL.classList.remove("is-valid")
        bookmarkURL.classList.add("is-invalid")
        return false
    }
  

}

closeBtn.addEventListener("click",function(){
    boxInfo.classList.add("d-none")
})
