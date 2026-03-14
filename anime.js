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

// Кнопка Back to top
const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const baner = document.getElementById("baner");
const banerImg = document.getElementById("baner-img");

const maxMove = 20; // максимальне відхилення в px

baner.addEventListener("mousemove", (e) => {
    const rect = baner.getBoundingClientRect();
    const x = e.clientX - rect.left; // позиція курсора відносно банера
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // розрахунок відхилення пропорційно до maxMove
    const moveX = ((x - centerX) / centerX) * maxMove;
    const moveY = ((y - centerY) / centerY) * maxMove;

    banerImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

baner.addEventListener("mouseleave", () => {
    // плавно повертаємо картинку назад
    banerImg.style.transform = `translate(0px, 0px)`;
});

const searchInput = document.getElementById("search-input");
const catalog = document.querySelector(".catalog");
const products = Array.from(catalog.querySelectorAll(".product"));

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    products.forEach(product => {
        const title = product.querySelector(".product-title").textContent.toLowerCase();
        if (title.includes(query)) {
            product.style.display = "flex"; // показуємо
        } else {
            product.style.display = "none"; // ховаємо
        }
    });
});

function toggleTheme(){

    document.body.classList.toggle("dark-theme")

}
function toggleTheme(){

    document.body.classList.toggle("dark-theme")

    if(document.body.classList.contains("dark-theme")){
        localStorage.setItem("theme","dark")
    }else{
        localStorage.setItem("theme","light")
    }

}

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-theme")
}





