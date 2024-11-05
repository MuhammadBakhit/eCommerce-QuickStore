const apiUrl = 'https://fakestoreapi.com/products';
let productsData = [];

fetch(apiUrl)
    .then(response => response.json())
    .then(products => {
        productsData = products; 
        displayProducts(productsData); 
    })
    .catch(error => console.log('Error fetching products:', error));

const newImages = [
    "https://res.cloudinary.com/dbjc13fxq/image/upload/v1728039581/image1.1_dznswf.jpg",
    "https://res.cloudinary.com/dbjc13fxq/image/upload/v1728039716/image1.11_xlamqj.jpg",
    "https://res.cloudinary.com/dbjc13fxq/image/upload/v1728039582/image3_atcdfs.jpg",
    "https://res.cloudinary.com/dbjc13fxq/image/upload/v1728039581/image4_eovciw.jpg",
    "https://res.cloudinary.com/dbjc13fxq/image/upload/v1728039581/image5_jusmoc.jpg",
    "https://res.cloudinary.com/dbjc13fxq/image/upload/v1728115414/image8.8_flgq3w.jpg",
    "https://res.cloudinary.com/dbjc13fxq/image/upload/v1728115414/image9_qpwjsf.jpg"
];

const newImage = [
    "https://res.cloudinary.com/dbjc13fxq/image/upload/v1728039581/image_vmbnfv.jpg",
    "https://res.cloudinary.com/dbjc13fxq/image/upload/v1728039581/image1_fljqrj.jpg",
    "https://res.cloudinary.com/dbjc13fxq/image/upload/v1728039581/image3_2_zry0gt.jpg",
    "https://res.cloudinary.com/dbjc13fxq/image/upload/v1728040005/image4.4_ukuo6z.jpg",
    "https://res.cloudinary.com/dbjc13fxq/image/upload/v1728039582/image7_whsjmq.jpg",
    "https://res.cloudinary.com/dbjc13fxq/image/upload/v1728115414/image9.9_bjivdi.jpg",
    "https://res.cloudinary.com/dbjc13fxq/image/upload/v1728115414/image8_rbwb5d.jpg"
];

const customCategories = {
    "men's clothing": 'New',
    "electronics": 'Best Seller',
    "jewelery": 'Specials'
};

function displayProducts(products) {
    let productsContainer = '';

    products.forEach((product, i) => {
        const imageUrl = newImages[i % newImages.length]; 
        const image = newImage[i % newImage.length];
        const category = customCategories[product.category] || 'Other'; 

        productsContainer += `
        <div class="card col-sm-6 col-md-4 col-lg-2">
            <div class="box">
                <img src="${imageUrl}" class="card-img-top" alt="${product.title}">
                <img src="${image}" class="card-img-top hover-image" alt="${products[i].title}">
            </div>
            <div class="hart">
                <a href=""><i class="fa-regular fa-heart"></i></a>
            </div>
            <div class="card-body data">
                <p class="card-text">${category}</p> 
                <h5 class="card-title">${product.title.substring(0, 15)}...</h5>
                <div class="stars">
                    <a href=""><i class="fa-solid fa-star"></i></a>
                    <a href=""><i class="fa-solid fa-star"></i></a>
                    <a href=""><i class="fa-solid fa-star"></i></a>
                    <a href=""><i class="fa-solid fa-star"></i></a>
                    <a href=""><i class="fa-regular fa-star"></i></a>
                </div>
                <p class="card-text par">${product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                <button class="btnn" onclick="addToCart('${products[i].id}')">Add to Cart</button>
                <div class="details">
                    <i class="fa-regular fa-eye"></i>
                    <a class="view" onclick="showProductDetails(${product.id})">View Details</a>
                </div>
            </div>
        </div>
        `;
    });

    document.getElementById("products").innerHTML = productsContainer;
}

// Show product details in modal
function showProductDetails(productId) {
    const product = productsData.find(p => p.id === productId);
    const imageUrl = newImages[(productId - 1) % newImages.length];

    if (product) {
        // Set values in the modal
        document.getElementById('modalProductImage').src = imageUrl; 
        document.getElementById('modalProductTitle').innerText = product.title;
        document.getElementById('modalProductCategory').innerText = product.category;
        document.getElementById('modalProductPrice').innerText = product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        document.getElementById('modalProductDescription').innerText = product.description;

        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('productDetailsModal'));
        modal.show();
    }
}


// Filter products based on category
function filterProducts(category) {
    let filteredProducts = productsData;
    
    if (category !== 'all') {
        filteredProducts = productsData.filter(product => {
            return customCategories[product.category] === category;
        });
    }
    
    displayProducts(filteredProducts); // Display filtered products
}

// Add event listeners to category buttons
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category'); // Get the desired category
        
        // Update button state (active)
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        filterProducts(category); // Filter products on click
    });
});

function addToCart(productId) {
    console.log("Product ID:", productId);

    const selectedProduct = productsData.find(product => product.id == productId);
    if (!selectedProduct) {
        console.error("Product not found:", productId);
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(item => item.id === selectedProduct.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        selectedProduct.quantity = 1; 
        cart.push(selectedProduct);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Updated Cart:", cart); 

    updateCartCount(); 
    showFlyingMessage(`${selectedProduct.title} has been added to the cart!`);
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.length > 0 ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

    const cartCountElement = document.querySelector('.nav-cart span'); 
    cartCountElement.textContent = count > 0 ? count : '0';
}

// Call this function when the page loads to set the initial count
window.onload = function() {
    updateCartCount(); 
};

// Remove product from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex === -1) {
        console.log("Product not found in cart:", productId);
        return;
    }

    if (cart[productIndex].quantity > 1) {
        cart[productIndex].quantity -= 1;
    } else {
        cart.splice(productIndex, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart count
    updateCartCount();

    displayCartItems();
}




// Function to show the flying message
function showFlyingMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'fly-message';
    messageElement.textContent = message;
    
    document.body.appendChild(messageElement);

    // Remove the message after 3 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}
