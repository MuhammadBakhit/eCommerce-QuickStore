let slideshowInterval = 0;

function moveSlide(step) {
  const slides = document.querySelectorAll('.slide');
  slides[slideshowInterval].classList.remove('active');

  slideshowInterval += step;

  if (slideshowInterval >= slides.length) {
    slideshowInterval = 0;
  } else if (slideshowInterval < 0) {
    slideshowInterval = slides.length - 1;
  }

  slides[slideshowInterval].classList.add('active');
}

function autoSlide() {
  moveSlide(1);
}

setInterval(autoSlide, 4000);


// Scroll page 

window.addEventListener('scroll', reveal);

//reveal
function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add("active");
        }
    }
}

// Scroll page 

//  Silder For  Trending Categories From Swiper
var swiperTrending = new Swiper(".mySwipertrending", {
    watchSlidesProgress: true,
    slidesPerView: 7,

    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
        320:{
            slidesPerView: 3,
            spaceBetween: 10
            },
        450: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        700: {
            slidesPerView: 5,
            spaceBetween: 30
        },
        1000: {
            slidesPerView: 7,
            spaceBetween: 30
        }
    }

});

/// Our Trending Products ///

let products = [];
let currentIndex = 0;
let displayLimit = 5;

// API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        products = data.slice(0, 7); 
        displayProducts(currentIndex, displayLimit);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}


function displayProducts(index, limit) {
    let productContainer = '';
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


    for (let i = index; i < index + limit && i < products.length; i++) {
        const imageUrl = newImages[i % newImages.length];
        const image = newImage[i % newImage.length];
        productContainer += `
        <div class="card col-sm-6 col-md-4 col-lg-2">
            <div class="box">
                <img src="${imageUrl}" class="card-img-top" alt="${products[i].title}">
                <img src="${image}" class="card-img-top hover-image" alt="${products[i].title}">
            </div>
            <div class="hart">
                <a href=""><i class="fa-regular fa-heart"></i></a>
            </div>
            <div class="card-body data">
                <p class="card-text">Smart Watch</p>
                <h5 class="card-title">${products[i].title.substring(0, 15)}...</h5>
                <div class="stars">
                    <a href=""><i class="fa-solid fa-star"></i></a>
                    <a href=""><i class="fa-solid fa-star"></i></a>
                    <a href=""><i class="fa-solid fa-star"></i></a>
                    <a href=""><i class="fa-solid fa-star"></i></a>
                    <a href=""><i class="fa-regular fa-star"></i></a>
                </div>
                <p class="card-text par">${products[i].price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                <button class="btnn" onclick="addToCart('${products[i].id}')">Add to Cart</button>
                <div class="details">
                    <i class="fa-regular fa-eye"></i>
                    <a class="view" onclick="showProductDetails(${products[i].id})">View Details</a>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("products").innerHTML = productContainer;
}


function slideLeft() {
    if (currentIndex > 0) {
        currentIndex -= 1;
    } else {
        currentIndex = products.length - displayLimit;
    }
    displayProducts(currentIndex, displayLimit);
}

function slideRight() {
    if (currentIndex < products.length - displayLimit) {
        currentIndex += 1;
    } else {
        currentIndex = 0;
    }
    displayProducts(currentIndex, displayLimit);
}


fetchProducts();

function addToCart(productId) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        alert('Please log in to add items to the cart.');
        return;
    }

    const selectedProduct = products.find(product => product.id == productId);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(item => item.id === selectedProduct.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        selectedProduct.quantity = 1;
        cart.push(selectedProduct);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showFlyingMessage(`${selectedProduct.title} has been added to the cart!`);
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.length > 0 ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

    const cartCountElement = document.querySelector('.nav-cart span');
    cartCountElement.textContent = count > 0 ? count : '0';
}


document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        addToCart(productId);
    });
});



// Remove product from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity -= 1;
        } else {
            cart.splice(productIndex, 1);
        }
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

/// Our Trending Products ///


window.onload = function() {
    const token = localStorage.getItem("token");
    const loginIcon = document.getElementById("loginIcon");
    const logoutButton = document.getElementById("logoutButton");

    if (token) {
        loginIcon.style.display = "none";
        logoutButton.style.display = "block";
    } else {
        loginIcon.style.display = "block"; 
        logoutButton.style.display = "none"; 
    }


    
    updateCartCount();
};
