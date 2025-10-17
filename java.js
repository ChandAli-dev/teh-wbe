document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------
    // 1. Mobile Menu Toggle Feature
    // -------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-list a');

    // Toggle logic for the button
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Change button icon/text if needed (e.g., from ☰ to X)
        menuToggle.textContent = navMenu.classList.contains('active') ? '✖' : '☰';
    });

    // Close menu when a link is clicked (important for single-page layout)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    });

    // -------------------------------------
    // 2. Add to Cart Functionality
    // -------------------------------------
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountElement = document.getElementById('cart-count');
    let cartItemCount = 0;
    
    /**
     * Updates the cart item count display.
     */
    function updateCartDisplay() {
        cartCountElement.textContent = cartItemCount;
    }

    /**
     * Handles the 'Add to Cart' click event.
     * @param {Event} event - The click event object.
     */
    function handleAddToCart(event) {
        // Find the closest product card ancestor
        const productCard = event.target.closest('.product-card');
        
        // Retrieve product details using data attributes
        const productId = productCard.dataset.productId;
        const productName = productCard.dataset.productName;
        const productPrice = productCard.dataset.productPrice;

        // Basic check and logging
        if (productId && productName) {
            cartItemCount++; // Increment the global counter
            updateCartDisplay(); // Update the visual counter

            // Optional: Provide user feedback
            event.target.textContent = `Added! (${cartItemCount})`;
            event.target.disabled = true;
            
            setTimeout(() => {
                event.target.textContent = 'Add to Cart';
                event.target.disabled = false;
            }, 1000); // Reset button after 1 second

            // Console log for simple 'cart' tracking
            console.log(`Product Added: ID: ${productId}, Name: ${productName}, Price: $${productPrice}. Total Items: ${cartItemCount}`);
        }
    }

    // Attach the event listener to all 'Add to Cart' buttons
    cartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    // Initialize cart display
    updateCartDisplay();

    // -------------------------------------
    // 3. Utility: Set Current Year in Footer
    // -------------------------------------
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});