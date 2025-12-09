// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cart functionality with localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

function loadCart() {
    updateCart();
}

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function clearCart() {
    cart = [];
    total = 0;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        addToCart(name, price);
        // Removed alert; updates UI silently
    });
});

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cartItems) {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button class="remove-item" data-index="${index}">Remove</button>`;
            cartItems.appendChild(itemDiv);
        });

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                if (requireLogin()) {
                    const index = parseInt(this.getAttribute('data-index'));
                    removeFromCart(index);
                }
            });
        });
    }

    if (cartTotal) {
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }
}

// Checkout button
const checkoutBtn = document.getElementById('checkout');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (requireLogin()) {
            if (cart.length === 0) {
                // alert removed
                console.log('Cart is empty');
            } else {
                // alert removed
                console.log(`Total: $${total.toFixed(2)} | Payment: Cash or card on delivery`);
            }
        }
    });
}

// Clear cart button
const clearCartBtn = document.getElementById('clear-cart');
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', function() {
        if (requireLogin()) {
            clearCart();
        }
    });
}

// Load cart on page load
loadCart();

// Product hover details
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const name = this.querySelector('h4').textContent;
        const desc = this.querySelector('p').textContent;
        const price = this.querySelector('.price').textContent;

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = `<strong>${name}</strong><br>${desc}<br><em>${price}</em>`;
        this.appendChild(tooltip);
    });

    item.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.tooltip');   
        if (tooltip) {
            tooltip.remove();
        }
    });
});
