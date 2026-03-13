let index = 0
let slides = document.querySelectorAll(".slide")

function showSlide(){
    slides.forEach(slide => slide.classList.remove("active"))
    slides[index].classList.add("active")
}

function next(){
    index++
    if(index >= slides.length) index = 0
    showSlide()
}

function prev(){
    index--
    if(index < 0) index = slides.length - 1
    showSlide()
}

// автоматичний рух
setInterval(next, 3000)

showSlide()




