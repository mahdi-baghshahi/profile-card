// TechStore JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    initMobileMenu();
    
    // Search functionality
    initSearch();
    
    // Product filters
    initFilters();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Newsletter subscription
    initNewsletter();
    
    // User actions (wishlist, cart)
    initUserActions();
    
    // Animation on scroll
    initScrollAnimations();
    
    // Product card interactions
    initProductCards();
    
    // Code snippet highlighting
    initCodeHighlighting();
});

// Mobile menu functionality
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-btn')) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="bi bi-list"></i>';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-primary);
            cursor: pointer;
            padding: 0.5rem;
        `;
        
        // Add to navbar
        navbar.appendChild(mobileMenuBtn);
        
        // Toggle functionality
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-open');
            const icon = this.querySelector('i');
            icon.className = navMenu.classList.contains('mobile-open') ? 'bi bi-x' : 'bi bi-list';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target)) {
                navMenu.classList.remove('mobile-open');
                mobileMenuBtn.querySelector('i').className = 'bi bi-list';
            }
        });
    }
}

// Search functionality
function initSearch() {
    const searchInputs = document.querySelectorAll('.search-box input');
    
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    performSearch(query);
                }
            }
        });
        
        input.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 2) {
                showSearchSuggestions(query);
            } else {
                hideSearchSuggestions();
            }
        });
    });
}

function performSearch(query) {
    console.log('Searching for:', query);
    // In a real application, this would make an API call
    // For demo purposes, we'll filter visible products
    const products = document.querySelectorAll('.product-card');
    let found = 0;
    
    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const category = product.querySelector('.product-category').textContent.toLowerCase();
        
        if (title.includes(query.toLowerCase()) || category.includes(query.toLowerCase())) {
            product.style.display = 'block';
            found++;
        } else {
            product.style.display = 'none';
        }
    });
    
    showSearchResults(found, query);
}

function showSearchResults(count, query) {
    // Remove existing search result message
    const existingMessage = document.querySelector('.search-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Add new search result message
    const productsSection = document.querySelector('.products-section .container');
    if (productsSection) {
        const message = document.createElement('div');
        message.className = 'search-results-message';
        message.style.cssText = `
            background: var(--bg-tertiary);
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            text-align: center;
        `;
        message.innerHTML = `
            <p>Found ${count} result${count !== 1 ? 's' : ''} for "${query}"</p>
            <button onclick="clearSearch()" style="
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                margin-left: 1rem;
                cursor: pointer;
            ">Clear Search</button>
        `;
        
        productsSection.insertBefore(message, productsSection.querySelector('.products-grid'));
    }
}

function clearSearch() {
    // Reset all product visibility
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        product.style.display = 'block';
    });
    
    // Clear search inputs
    const searchInputs = document.querySelectorAll('.search-box input');
    searchInputs.forEach(input => input.value = '');
    
    // Remove search results message
    const message = document.querySelector('.search-results-message');
    if (message) message.remove();
}

// Filter functionality
function initFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            applyFilters();
        });
    });
}

function applyFilters() {
    const filters = {};
    const filterSelects = document.querySelectorAll('.filter-select');
    
    filterSelects.forEach(select => {
        const label = select.previousElementSibling.textContent.replace(':', '').toLowerCase();
        const value = select.value;
        if (value && !value.startsWith('All')) {
            filters[label] = value.toLowerCase();
        }
    });
    
    const products = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    products.forEach(product => {
        let shouldShow = true;
        
        // Apply category filter
        if (filters.category || filters.technology || filters.type) {
            const category = product.querySelector('.product-category').textContent.toLowerCase();
            const filterValue = filters.category || filters.technology || filters.type;
            if (!category.includes(filterValue)) {
                shouldShow = false;
            }
        }
        
        // Apply level filter
        if (filters.level) {
            // This would need product level data in HTML
            // For demo, we'll use a simple check
            const title = product.querySelector('h3').textContent.toLowerCase();
            if (filters.level === 'beginner' && !title.includes('fundamental') && !title.includes('basic')) {
                shouldShow = false;
            }
        }
        
        if (shouldShow) {
            product.style.display = 'block';
            visibleCount++;
        } else {
            product.style.display = 'none';
        }
    });
    
    console.log(`Filtered to ${visibleCount} products`);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Newsletter subscription
function initNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        const button = form.querySelector('button');
        const input = form.querySelector('input');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const email = input.value.trim();
            
            if (validateEmail(email)) {
                subscribeToNewsletter(email);
            } else {
                showMessage('Please enter a valid email address', 'error');
            }
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                button.click();
            }
        });
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function subscribeToNewsletter(email) {
    // Simulate API call
    console.log('Subscribing email:', email);
    
    // Show loading state
    const button = document.querySelector('.newsletter-form button');
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        document.querySelector('.newsletter-form input').value = '';
        showMessage('Successfully subscribed to newsletter!', 'success');
    }, 1500);
}

// User actions (wishlist, cart)
function initUserActions() {
    const wishlistBtns = document.querySelectorAll('.bi-heart');
    const cartBtns = document.querySelectorAll('.bi-cart3');
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('bi-heart');
            this.classList.toggle('bi-heart-fill');
            
            const action = this.classList.contains('bi-heart-fill') ? 'added to' : 'removed from';
            showMessage(`Product ${action} wishlist`, 'info');
        });
    });
    
    cartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            addToCart();
        });
    });
    
    // Add to cart buttons on product cards
    const enrollBtns = document.querySelectorAll('.btn-primary');
    enrollBtns.forEach(btn => {
        if (btn.textContent.includes('Enroll') || btn.textContent.includes('Add to Cart')) {
            btn.addEventListener('click', function() {
                addToCart();
            });
        }
    });
}

function addToCart() {
    showMessage('Product added to cart!', 'success');
    
    // Animate cart icon
    const cartIcon = document.querySelector('.bi-cart3');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
    }
}

// Animation on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-card, .category-card, .framework-card, .tech-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Product card interactions
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add hover effect for product images
        const productImage = card.querySelector('.product-image');
        if (productImage) {
            productImage.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            productImage.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
        
        // Add click handler for product cards
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a button
            if (!e.target.closest('button') && !e.target.closest('.btn')) {
                showProductDetails(this);
            }
        });
    });
}

function showProductDetails(productCard) {
    const title = productCard.querySelector('h3').textContent;
    const category = productCard.querySelector('.product-category').textContent;
    const price = productCard.querySelector('.current-price').textContent;
    
    showMessage(`Viewing details for: ${title}`, 'info');
    // In a real app, this would navigate to a product detail page
}

// Code snippet highlighting
function initCodeHighlighting() {
    const codeSnippets = document.querySelectorAll('.code-snippet');
    
    codeSnippets.forEach(snippet => {
        const copyBtn = snippet.querySelector('.bi-files');
        const runBtn = snippet.querySelector('.bi-play');
        
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                const codeContent = snippet.querySelector('.code-content').textContent;
                copyToClipboard(codeContent);
            });
        }
        
        if (runBtn) {
            runBtn.addEventListener('click', function() {
                showMessage('Code execution simulation - check console', 'info');
                console.log('Executing code snippet...');
            });
        }
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showMessage('Code copied to clipboard!', 'success');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showMessage('Code copied to clipboard!', 'success');
    }
}

// Utility function to show messages
function showMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = document.querySelector('.toast-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    
    // Style based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#toast-animations')) {
        const style = document.createElement('style');
        style.id = 'toast-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Load more functionality
function loadMoreProducts() {
    const loadMoreBtn = document.querySelector('.load-more-section button');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate loading more products
            setTimeout(() => {
                this.textContent = 'Load More Products';
                this.disabled = false;
                showMessage('More products loaded!', 'success');
            }, 1500);
        });
    }
}

// Initialize load more functionality when DOM is ready
document.addEventListener('DOMContentLoaded', loadMoreProducts);

// Add some interactive features for the hero floating cards
document.addEventListener('DOMContentLoaded', function() {
    const floatingCards = document.querySelectorAll('.card');
    
    floatingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'translateY(-15px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });
});

// Console welcome message
console.log(`
🚀 Welcome to TechStore!
📚 Your programming education marketplace
💻 Built with modern web technologies

Features:
- Responsive design
- Interactive search and filters
- Smooth animations
- Shopping cart simulation
- Newsletter subscription

Explore C Programming and JavaScript resources!
`);