let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price;
    });
    
    cartTotal.textContent = total.toFixed(2);
}

function sendWhatsAppOrder() {
    const phoneNumber = "7095143164"; // Replace with your WhatsApp number
    let message = "Order Details: \n";

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    cart.forEach(item => {
        message += `${item.name}: ₹${item.price.toFixed(2)}\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `\nTotal: ₹${total.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}

// Function to calculate and display product cards
function setupProductCards() {
    const productList = document.getElementById('product-list');
    
    const imageMap = {
        "Chicken Curry Cut (Skinless)": "chicken_curry_skinless.jpg",
        "Chicken Boneless Breast": "chicken_boneless_breast.jpg",
        "Chicken Steak (Raw)": "chicken_steak_raw.jpg",
        "Chicken Soup Pieces (Frozen)": "chicken_soup_pieces.jpg",
        "Chicken Wings (Frozen - Skin On)": "chicken_wings_frozen.jpg",
        "Whole Chicken (Skin On - Frozen)": "whole_chicken_skin_on.jpg",
        "Chicken Curry Cut with Skin (Frozen)": "chicken_curry_skin_on.jpg",
        "Chicken Leg": "chicken_leg.jpg",
        "Chicken Mince": "chicken_mince.jpg",
        "Chicken Drumsticks (Skinless)": "chicken_drumsticks_skinless.jpg"
    };

    for (const product in prices) {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-md-4';
        productDiv.innerHTML = `
            <div class="card">
                <img src="images/${imageMap[product]}" class="card-img-top" alt="${product}">
                <div class="card-body text-center">
                    <h5 class="card-title">${product}</h5>
                    <p class="card-text">Price per kg: ₹${prices[product].toFixed(2)}</p>
                    <div class="input-group mb-3">
                        <input type="number" id="quantity-${product.replace(/\s+/g, '-').toLowerCase()}" value="1" min="1" class="form-control" oninput="calculatePrice('${product}')">
                        <select id="unit-${product.replace(/\s+/g, '-').toLowerCase()}" class="form-select" onchange="calculatePrice('${product}')">
                            <option value="kg">kg</option>
                            <option value="grams">grams</option>
                        </select>
                    </div>
                    <p>Price: ₹<span id="price-${product.replace(/\s+/g, '-').toLowerCase()}">${prices[product].toFixed(2)}</span></p>
                    <button class="btn btn-success" onclick="addToCart('${product}', prices['${product}'])">Add to Cart</button>
                </div>
            </div>
        `;
        productList.appendChild(productDiv);
    }
}


function calculatePrice(productName) {
    const quantityInput = document.getElementById(`quantity-${productName.replace(/\s+/g, '-').toLowerCase()}`);
    const unitSelect = document.getElementById(`unit-${productName.replace(/\s+/g, '-').toLowerCase()}`);
    const priceDisplay = document.getElementById(`price-${productName.replace(/\s+/g, '-').toLowerCase()}`);

    let quantity = parseFloat(quantityInput.value);
    let pricePerKg = prices[productName];
    
    if (unitSelect.value === 'grams') {
        quantity /= 1000; // Convert grams to kg
    }

    const totalPrice = pricePerKg * quantity;
    priceDisplay.textContent = totalPrice.toFixed(2);
}

// Call the setup function to create product cards
setupProductCards();

