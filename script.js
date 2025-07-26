// Header functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    const overlay = document.getElementById('overlay');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileSidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileSidebar.classList.contains('active') ? 'hidden' : '';
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners for mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeMobileMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu when clicking on menu items
    const sidebarLinks = document.querySelectorAll('.sidebar-list a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Notification close functionality
    const notificationClose = document.querySelector('.notification-close');
    const topNotification = document.querySelector('.top-notification');
    
    if (notificationClose && topNotification) {
        notificationClose.addEventListener('click', function() {
            topNotification.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                topNotification.style.display = 'none';
            }, 300);
        });
    }
    
    // Search functionality
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const searchToggle = document.querySelector('.search-toggle');
    
    // Mobile search toggle
    if (searchToggle) {
        searchToggle.addEventListener('click', function() {
            // Create mobile search overlay
            const searchOverlay = document.createElement('div');
            searchOverlay.className = 'mobile-search-overlay';
            searchOverlay.innerHTML = `
                <div class="mobile-search-content">
                    <div class="mobile-search-header">
                        <h3>جستجو</h3>
                        <button class="mobile-search-close">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                    <form class="mobile-search-form">
                        <input type="text" placeholder="جستجو در محصولات..." class="mobile-search-input">
                        <button type="submit" class="mobile-search-btn">
                            <i class="bi bi-search"></i>
                        </button>
                    </form>
                </div>
            `;
            
            // Add mobile search styles
            const searchStyles = `
                .mobile-search-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    z-index: 3000;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    padding-top: 100px;
                }
                .mobile-search-content {
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                    width: 90%;
                    max-width: 400px;
                }
                .mobile-search-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .mobile-search-header h3 {
                    font-size: 18px;
                    color: #333;
                }
                .mobile-search-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                }
                .mobile-search-form {
                    display: flex;
                    background: #f8f9fa;
                    border-radius: 12px;
                    border: 2px solid transparent;
                }
                .mobile-search-input {
                    flex: 1;
                    border: none;
                    background: transparent;
                    padding: 12px 16px;
                    font-size: 14px;
                    outline: none;
                    border-radius: 12px;
                    font-family: 'Vazirmatn', sans-serif;
                }
                .mobile-search-btn {
                    background: #1367ef;
                    border: none;
                    color: white;
                    padding: 12px 16px;
                    border-radius: 0 12px 12px 0;
                    cursor: pointer;
                }
            `;
            
            // Add styles to head if not exists
            if (!document.querySelector('#mobile-search-styles')) {
                const styleSheet = document.createElement('style');
                styleSheet.id = 'mobile-search-styles';
                styleSheet.textContent = searchStyles;
                document.head.appendChild(styleSheet);
            }
            
            document.body.appendChild(searchOverlay);
            document.body.style.overflow = 'hidden';
            
            // Focus on input
            const mobileSearchInput = searchOverlay.querySelector('.mobile-search-input');
            setTimeout(() => mobileSearchInput.focus(), 100);
            
            // Close functionality
            const mobileSearchClose = searchOverlay.querySelector('.mobile-search-close');
            mobileSearchClose.addEventListener('click', function() {
                document.body.removeChild(searchOverlay);
                document.body.style.overflow = '';
            });
            
            // Close on overlay click
            searchOverlay.addEventListener('click', function(e) {
                if (e.target === searchOverlay) {
                    document.body.removeChild(searchOverlay);
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    // Search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                console.log('جستجو برای:', query);
                // Here you would typically send the search query to your backend
                alert(`جستجو برای: "${query}"`);
            }
        });
    }
    
    // Dropdown hover effects for desktop
    const dropdownItems = document.querySelectorAll('.dropdown');
    dropdownItems.forEach(item => {
        const menu = item.querySelector('.dropdown-menu');
        if (menu) {
            item.addEventListener('mouseenter', function() {
                menu.style.display = 'block';
            });
            
            item.addEventListener('mouseleave', function() {
                menu.style.display = 'none';
            });
        }
    });
    
    // Categories toggle functionality
    const categoriesToggle = document.querySelector('.categories-toggle');
    if (categoriesToggle) {
        categoriesToggle.addEventListener('click', function() {
            // Toggle categories menu
            console.log('Categories menu toggled');
            // You can implement a categories menu here
        });
    }
    
    // Cart functionality
    const cartBtn = document.querySelector('.cart-btn');
    const cartCount = document.querySelector('.cart-count');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('سبد خرید کلیک شد');
            // Here you would typically open cart modal or redirect to cart page
        });
    }
    
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '#!') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Sticky header enhancement
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Add transition to header for smooth hide/show
    header.style.transition = 'transform 0.3s ease';
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape') {
            if (mobileSidebar && mobileSidebar.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
    
    // Initialize cart count animation
    function updateCartCount(count) {
        if (cartCount) {
            cartCount.textContent = count;
            cartCount.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    // Example: Update cart count (you can call this function when items are added)
    // updateCartCount(3);
    
    // Add loading states for buttons
    const actionButtons = document.querySelectorAll('.action-btn, .categories-toggle, .btn-featured');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add subtle loading effect
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 150);
        });
    });
    
    // Enhanced search input with suggestions (placeholder for future implementation)
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const query = this.value.trim();
                if (query.length > 2) {
                    // Here you would typically fetch search suggestions
                    console.log('جستجوی خودکار برای:', query);
                }
            }, 300);
        });
    }
    
    console.log('Header JavaScript loaded successfully! 🎉');
});