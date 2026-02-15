document.addEventListener("DOMContentLoaded",()=>{
        let cart = JSON.parse(localStorage.getItem("cart")) || []
        let container = document.querySelector(".cart-items")
        let totalEl = document.querySelector(".total")

        function readerCart(){
            container.innerHTML = ''
            let total = 0

            if (cart.lenght == 0){
                container.innerHTML = "<h3>Кошик порожній :( </h3>"
                totalEl.textContent = "" 
            }
            cart.array.forEach(element => {
                total += element.price + element.qty

                container.innerHTML += `<div>
                <h3>$(item.name)</h3>
                <p>$(item.price)</p>

                <button onclick=changeOty($(item.id), -1)>-</button>
                <span>$(items.qty)</span>
                <buttomn onclick=changeCity($(item,id), 1)>+</button>
                <button onclick=removeItem($(item,id))>Видалити</button>
                <div>
                `
            });
            totalEl.textContent = "Разом: " + total + "грн,"
        }
})

