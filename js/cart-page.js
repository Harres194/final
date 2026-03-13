document.addEventListener("DOMContentLoaded", () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.querySelector(".cart-items");
    let totalEl = document.querySelector(".total");

    function renderCart() {
        container.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            container.innerHTML = "<h3>Кошик порожній</h3>";
            totalEl.textContent = "";
            return;
        }

        cart.forEach(item => {
            total += item.price * item.qty;

            container.innerHTML += `
            <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
                <h3>${item.name}</h3>
                <p>${item.price} грн</p>

                <button onclick="changeQty(${item.id}, -1)">-</button>
                ${item.qty}
                <button onclick="changeQty(${item.id}, 1)">+</button>

                <button onclick="removeItem(${item.id})">Видалити</button>
            </div>
            `;
        });

        totalEl.textContent = "Разом: " + total + " грн";
    }

    window.changeQty = function(id, delta) {
        let item = cart.find(i => i.id === id);
        if (!item) return;

        item.qty += delta;

        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }

        save();
    }

    window.removeItem = function(id) {
        cart = cart.filter(i => i.id !== id);
        save();
    }

    function save() {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    window.openCheckout = function() {
        document.querySelector(".checkout").style.display = "block";
    }

    window.confirmOrder = function() {
        alert("Замовлення оформлено!");
        localStorage.removeItem("cart");
        location.reload();
    }

    renderCart();
});