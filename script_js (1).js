// Products data
const products = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, icon: '🎧', description: 'Premium sound quality' },
    { id: 2, name: 'Smart Watch', price: 199.99, icon: '⌚', description: 'Track your fitness goals' },
    { id: 3, name: 'Laptop Stand', price: 49.99, icon: '💻', description: 'Ergonomic design' },
    { id: 4, name: 'USB-C Hub', price: 39.99, icon: '🔌', description: '7-in-1 connectivity' },
    { id: 5, name: 'Wireless Mouse', price: 29.99, icon: '🖱️', description: 'Precision tracking' },
    { id: 6, name: 'Keyboard', price: 89.99, icon: '⌨️', description: 'Mechanical switches' }
];

// Get cart from localStorage or initialize empty cart
function getCart() {
    const cartData = localStorage.getItem('techstore_cart');
    return cartData ? JSON.parse(cartData) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('techstore_cart', JSON.stringify(cart));
}

// Initialize products grid
function initProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-icon">${product.icon}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-desc">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price}</span>
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart(cart);
    updateCartBadge();
    alert(`${product.name} added to cart!`);
}

// Update cart badge
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Update quantity
function updateQuantity(productId, change) {
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        saveCart(cart);
        renderCart();
        updateCartBadge();
    }
}

// Remove from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
    updateCartBadge();
}

// Render cart
function renderCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalDiv = document.getElementById('cartTotal');
    
    if (!cartItemsDiv || !cartTotalDiv) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Add some products to get started!</p>
                <a href="index.html" class="btn">Continue Shopping</a>
            </div>
        `;
        cartTotalDiv.innerHTML = '';
        return;
    }
    
    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-icon">${item.icon}</div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">$${item.price}</p>
                </div>
            </div>
            <div class="quantity-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                <span style="font-size: 1.2rem; font-weight: bold;">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️ Remove</button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalDiv.innerHTML = `
        <div class="cart-total">
            <h2>Total Amount</h2>
            <div class="total-price">$${total.toFixed(2)}</div>
            <button class="btn" style="margin-top: 1rem; padding: 1rem 2rem;">Proceed to Checkout</button>
        </div>
    `;
}

// Handle form submit
function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        window.location.href = 'thankyou.html';
    }
}