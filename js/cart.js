let cart = JSON.parse(localStorage.getItem("cart")) || [];


function addToCart(id, name, price, img) {
    let item = cart.find(item => item.id == id);
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


function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}


function updateCartCount() {
    let count = cart.reduce((sum, item) => sum + item.qty, 0);
    let el = document.querySelector(".cart-count");
    if (el) el.textContent = count;
}


updateCartCount();