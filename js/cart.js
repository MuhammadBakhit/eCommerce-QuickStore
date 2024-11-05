function displayCartItems() {
    // Get the cart from localStorage or set it as an empty array if not found
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartContainer = '';
    let totalPrice = 0;

    // Check if cart is empty
    if (cart.length === 0) {
        cartContainer = `<p>Your cart is empty.</p>`;
    } else {
        // Loop through the cart items and display them
        cart.forEach(item => {
            cartContainer += `
                <div class="cart-item row mb-4">
                    <div class="col-4">
                        <img src="${item.image}" alt="${item.title}" style="width: 100px;">
                    </div>
                    <div class="col-8">
                        <h5>${item.title}</h5>
                        <p class="total-price">${item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <button class="plass-mains" onclick="increaseQuantity(${item.id})">+</button>
                                <span class="calcolit">${item.quantity}</span>
                                <button class="plass-mains" onclick="decreaseQuantity(${item.id})">-</button>
                            </div>
                            <button onclick="removeFromCart(${item.id})" class="delate btn text-danger-emphasis bg-danger-subtle">Remove</button>
                        </div>
                    </div>
                </div>
            `;

            // Calculate total price
            totalPrice += item.price * item.quantity;
        });
    }

    // Inject the cart items into the DOM
    document.getElementById("cartContainer").innerHTML = cartContainer;
    document.getElementById("total-price").innerText = totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    document.getElementById("total-items").innerText = cart.length;
}


// Increase quantity of a product in the cart
function increaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find(item => item.id === productId);
    
    if (product) {
        product.quantity += 1;
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

// Decrease quantity of a product in the cart
function decreaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find(item => item.id === productId);
    
    if (product && product.quantity > 1) {
        product.quantity -= 1;
    } else {
        // If quantity is 1, remove the product from the cart
        removeFromCart(productId);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

// Remove product from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

// Call this function when the cart page loads
window.onload = function() {
    displayCartItems();
};

// localStorage.removeItem('cart');