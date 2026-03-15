function getFavorites(){
return JSON.parse(localStorage.getItem("favorites")) || []
}

function saveFavorites(favorites){
localStorage.setItem("favorites",JSON.stringify(favorites))
updateFavoritesCount()
}

function addToFavorites(id,name,price,img){

let favorites = getFavorites()

let exists = favorites.find(item => item.id === id)

if(!exists){

favorites.push({
id:id,
name:name,
price:price,
img:img
})

saveFavorites(favorites)

alert("❤️ Додано в улюблене")

}else{

alert("Товар вже у списку")

}

}

function removeFavorite(id){

let favorites = getFavorites()

favorites = favorites.filter(item => item.id !== id)

saveFavorites(favorites)

location.reload()

}

function updateFavoritesCount(){

let favorites = getFavorites()

let count = document.querySelector(".favorites-count")

if(count){
count.textContent = favorites.length
}

}

updateFavoritesCount()