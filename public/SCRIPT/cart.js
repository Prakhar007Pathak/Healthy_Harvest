// connect to home and product page to cart:- 
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const product = {
                id: parseInt(button.dataset.productId),
                name: button.dataset.productName,
                price: parseFloat(button.dataset.productPrice),
                image: button.dataset.productImage,
                // Add any other details you have, e.g., originalPrice, color etc.
            };
            localStorage.setItem('pendingProduct', JSON.stringify(product));
            window.location.href = 'cart'; // Redirect to the cart page
        });
    });
});



// cart page script
const cartItemsContainer = document.getElementById('cart-items');
const summaryQuantityEl = document.getElementById('summary-quantity');
const summarySubtotalEl = document.getElementById('summary-subtotal');
const summaryDiscountEl = document.getElementById('summary-discount');
const summaryShippingEl = document.getElementById('summary-shipping');
const summaryTotalEl = document.getElementById('summary-total');

// This function persists (saves) the cart data to localStorage.
function persistCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// This function retrieves the cart data from localStorage.
function getCart() {
    const savedCart = localStorage.getItem('shoppingCart');
    return savedCart ? JSON.parse(savedCart) : [];
}

let cart = getCart();

// This function renders (displays) all products in the cart.
function renderCart() {
    cartItemsContainer.innerHTML = '';
    let totalQuantity = 0;
    let subtotal = 0;
    let totalDiscount = 0;
    const shipping = 435.00;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const discount = (item.originalPrice ? item.originalPrice - item.price : 0) * item.quantity;

        totalQuantity += item.quantity;
        subtotal += itemTotal;
        totalDiscount += discount;

        const row = document.createElement('tr');
        row.innerHTML = `
    <td>
        <div class="product-item">
            <img src="${item.image}" alt="${item.name}">
                <div class="details">
                    <span class="name">${item.name}</span>
                    ${item.color ? `<span class="color">Color: ${item.color}</span>` : ''}
                </div>
        </div>
    </td>
    <td class="price-col">
        <span class="current-price">&#8377;${item.price.toFixed(2)}</span>
        ${item.originalPrice ? `<span class="old-price">&#8377;${item.originalPrice.toFixed(2)}</span>` : ''}
    </td>
    <td class="quantity-col">
        <button class="decrease-btn" data-id="${item.id}">-</button>
        <input type="text" value="${item.quantity}" readonly>
            <button class="increase-btn" data-id="${item.id}">+</button>
    </td>
    <td class="total-col">
        <span class="total-price">&#8377;${itemTotal.toFixed(2)}</span>
    </td>
    <td class="remove-col">
        <button class="remove-btn" data-id="${item.id}">x</button>
    </td>
    `;
        cartItemsContainer.appendChild(row);
    });

    // Update sidebar totals
    updateTotals(totalQuantity, subtotal, totalDiscount, shipping);
}

// This function updates the quantity of an item.
function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            // Remove item if quantity goes below 1
            removeItem(id);
        }
        persistCart(cart);
        renderCart();
    }
}

// This function removes an item from the cart.
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    persistCart(cart);
    renderCart();
}

// This function calculates and displays the total values.
function updateTotals(totalQuantity, subtotal, totalDiscount, shipping) {
    const total = subtotal + shipping;

    summaryQuantityEl.textContent = `${totalQuantity} item(s)`;
    summarySubtotalEl.textContent = subtotal.toFixed(2);
    summaryDiscountEl.textContent = totalDiscount.toFixed(2);
    summaryShippingEl.textContent = shipping.toFixed(2);
    summaryTotalEl.textContent = total.toFixed(2);
}

// This function clears all items from the cart.
function clearCart() {
    cart = [];
    persistCart(cart);
    renderCart();
}

// New function to add a product to the cart
function addProductToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    persistCart(cart);
    renderCart();
}

// Event listeners for quantity and remove buttons
cartItemsContainer.addEventListener('click', (e) => {
    const target = e.target;
    const id = parseInt(target.dataset.id);

    if (target.classList.contains('increase-btn')) {
        updateQuantity(id, 1);
    } else if (target.classList.contains('decrease-btn')) {
        updateQuantity(id, -1);
    } else if (target.classList.contains('remove-btn')) {
        removeItem(id);
    }
});

document.querySelector('.clear-cart-btn').addEventListener('click', clearCart);

// Check for product added from the homepage on page load
window.addEventListener('load', () => {
    const pendingProduct = localStorage.getItem('pendingProduct');
    if (pendingProduct) {
        const product = JSON.parse(pendingProduct);
        addProductToCart(product);
        localStorage.removeItem('pendingProduct');
    }
    renderCart();
});


