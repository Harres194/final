let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ДОДАТИ ТОВАР
function addToCart(id, name, price, img) {
    let item = cart.find(p => p.id === id);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            img,
            qty: 1
        });
    }

    saveCart();
}

// ЗБЕРЕГТИ
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// ЛІЧИЛЬНИК
function updateCartCount() {
    let count = cart.reduce((sum, item) => sum + item.qty, 0);
    let el = document.querySelector(".cart-count");
    if (el) el.textContent = count;
}

updateCartCount();