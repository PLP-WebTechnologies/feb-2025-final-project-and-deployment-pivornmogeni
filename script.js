const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 3,
        name: "Cotton T-Shirt",
        price: 24.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 4,
        name: "Denim Jeans",
        price: 59.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 5,
        name: "Coffee Maker",
        price: 89.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 6,
        name: "Blender",
        price: 49.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 7,
        name: "Running Shoes",
        price: 79.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 8,
        name: "Laptop",
        price: 899.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cart-btn').forEach(btn => {
        btn.textContent = `Cart (${count})`;
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Display products
function displayProducts(productsToDisplay, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Filter products by category
function filterProducts() {
    const filter = document.getElementById('category-filter');
    if (!filter) return;

    filter.addEventListener('change', (e) => {
        const category = e.target.value;
        let filteredProducts = products;

        if (category !== 'all') {
            filteredProducts = products.filter(product => product.category === category);
        }

        displayProducts(filteredProducts, '.products-grid');
    });
}

// Contact form submission
function handleContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = form.elements['name'].value;
        const email = form.elements['email'].value;
        const message = form.elements['message'].value;

        // In a real app, you would send this data to a server
        console.log('Form submitted:', { name, email, message });
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Display featured products on home page
    if (document.querySelector('.featured-products .products-grid')) {
        const featuredProducts = products.slice(0, 4);
        displayProducts(featuredProducts, '.featured-products .products-grid');
    }

    // Display all products on products page
    if (document.querySelector('.products .products-grid')) {
        displayProducts(products, '.products .products-grid');
        filterProducts();
    }

    // Handle contact form
    handleContactForm();
});