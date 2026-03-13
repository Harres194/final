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

            let div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.price} грн</p>
                    <div>
                        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeItem(${item.id})">Видалити</button>
                </div>
            `;
            container.appendChild(div);
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
        // оновлюємо лічильник на хедері
        if (typeof updateCartCount === "function") updateCartCount();
    }

    window.confirmOrder = function() {
        alert("Замовлення оформлено!");
        localStorage.removeItem("cart");
        cart = [];
        renderCart();
        if (typeof updateCartCount === "function") updateCartCount();
    }

    renderCart();
});
// Модальне вікно оформлення
const checkoutModal = document.getElementById("checkoutModal");
const closeModal = document.querySelector(".close");

// Відкрити модалку при кліку на кнопку
document.getElementById("checkout-btn").addEventListener("click", () => {
    checkoutModal.style.display = "block";
});

// Закрити модалку при кліку на хрестик
closeModal.addEventListener("click", () => {
    checkoutModal.style.display = "none";
});

// Закрити модалку при кліку поза вікном
window.addEventListener("click", (e) => {
    if(e.target == checkoutModal){
        checkoutModal.style.display = "none";
    }
});

// Обробка форми
document.getElementById("checkoutForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    alert(`Дякуємо, ${name}! Ваше замовлення прийнято.\n\nАдреса: ${address}\nТелефон: ${phone}`);

    checkoutModal.style.display = "none";
    this.reset();

    // Очистити кошик після замовлення
    localStorage.removeItem("cart");
    location.reload();
});
document.addEventListener("DOMContentLoaded", () => {

    // Завантаження кошика з localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.querySelector(".cart-items");
    let totalEl = document.querySelector(".total");

    // Промокоди
    const promoCodes = {
        "SALE10": 10,
        "DISCOUNT20": 20
    };
    let currentDiscount = 0;

    // Елементи промокоду
    const promoInput = document.getElementById("promo-input");
    const applyPromoBtn = document.getElementById("apply-promo");
    const promoMessage = document.getElementById("promo-message");

    // Застосувати промокод
    applyPromoBtn.addEventListener("click", () => {
        const code = promoInput.value.trim().toUpperCase();
        if (promoCodes[code]) {
            currentDiscount = promoCodes[code];
            promoMessage.textContent = `Знижка ${currentDiscount}% застосована!`;
            promoMessage.style.color = "green";
        } else {
            currentDiscount = 0;
            promoMessage.textContent = "Невірний код!";
            promoMessage.style.color = "red";
        }
        renderCart();
    });

    // Відображення кошика
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
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.price} грн</p>
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    ${item.qty}
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                </div>
                <button onclick="removeItem(${item.id})">Видалити</button>
            </div>
            `;
        });

        // Застосування знижки
        let discountedTotal = total;
        if(currentDiscount > 0){
            discountedTotal = total - (total * currentDiscount / 100);
        }
        totalEl.textContent = `Разом: ${discountedTotal.toFixed(2)} грн`;
    }

    // Змінити кількість товару
    window.changeQty = function(id, delta) {
        let item = cart.find(i => i.id === id);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
        save();
    }

    // Видалити товар
    window.removeItem = function(id) {
        cart = cart.filter(i => i.id !== id);
        save();
    }

    // Зберегти та оновити
    function save() {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    // Відкрити оформлення
    window.openCheckout = function() {
        document.querySelector(".checkout").style.display = "block";
    }

    // Підтвердити замовлення
    window.confirmOrder = function() {
        alert("Замовлення оформлено!");
        localStorage.removeItem("cart");
        location.reload();
    }

    // Перший рендер кошика
    renderCart();
});