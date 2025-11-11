// // Mobile menu toggle
// const hamburger = document.getElementById('hamburger');
// const mobileMenu = document.getElementById('mobileMenu');

// hamburger.addEventListener('click', () => {
//     mobileMenu.classList.toggle('active');
//     hamburger.classList.toggle('active');
// });

// // Filter toggle
// const filterToggle = document.getElementById('filterToggle');
// const sidebar = document.getElementById('sidebar');

// filterToggle.addEventListener('click', () => {
//     sidebar.classList.toggle('active');
//     filterToggle.textContent = sidebar.classList.contains('active') ? 'Hide Filters' : 'Show Filters';
// });

const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');

        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Category filtering
        const categoryBtns = document.querySelectorAll('.category-btn');
        const accessoryCards = document.querySelectorAll('.accessory-card');
        const categorySections = document.querySelectorAll('.category-section');

        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const category = btn.getAttribute('data-category');
                
                if (category === 'all') {
                    // Show all categories
                    categorySections.forEach(section => {
                        section.style.display = 'block';
                    });
                    accessoryCards.forEach(card => {
                        card.style.display = 'flex';
                    });
                } else {
                    // Hide all categories first
                    categorySections.forEach(section => {
                        section.style.display = 'none';
                    });
                    // Show only the selected category
                    document.getElementById(category).style.display = 'block';
                    
                    // Show only cards from selected category
                    accessoryCards.forEach(card => {
                        if (card.getAttribute('data-category') === category) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });

        // Filter functionality
        const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
        
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });

        function applyFilters() {
            const selectedFilters = Array.from(filterCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            
            accessoryCards.forEach(card => {
                const cardTags = card.getAttribute('data-tags').split(',');
                const cardPrice = parseInt(card.getAttribute('data-price'));
                
                let shouldShow = true;
                
                if (selectedFilters.length > 0) {
                    shouldShow = selectedFilters.every(filter => {
                        if (filter === 'under-5000') {
                            return cardPrice < 5000;
                        }
                        return cardTags.includes(filter);
                    });
                }
                
                card.style.display = shouldShow ? 'flex' : 'none';
            });
        }

//         // Sort functionality
//         const sortDropdown = document.querySelector('.sort-dropdown');
        
//         sortDropdown.addEventListener('change', () => {
//             const sortValue = sortDropdown.value;
//             const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
//             let cardsToSort = [];
            
//             if (activeCategory === 'all') {
//                 cardsToSort = Array.from(accessoryCards);
//             } else {
//                 cardsToSort = Array.from(accessoryCards).filter(card => 
//                     card.getAttribute('data-category') === activeCategory
//                 );
//             }
            
//             cardsToSort.sort((a, b) => {
//                 const priceA = parseInt(a.getAttribute('data-price'));
//                 const priceB = parseInt(b.getAttribute('data-price'));
                
//                 switch (sortValue) {
//                     case 'low-high':
//                         return priceA - priceB;
//                     case 'high-low':
//                         return priceB - priceA;
//                     case 'newest':
//                         // For demo, we'll consider items with 'new-arrival' tag as newest
//                         const tagsA = a.getAttribute('data-tags');
//                         const tagsB = b.getAttribute('data-tags');
//                         if (tagsA.includes('new-arrival') && !tagsB.includes('new-arrival')) return -1;
//                         if (!tagsA.includes('new-arrival') && tagsB.includes('new-arrival')) return 1;
//                         return 0;
//                     default: // popular
//                         return 0;
//                 }
//             });
            
//             // Reorder the cards in their respective containers
//             const containers = document.querySelectorAll('.products-grid');
//             containers.forEach(container => {
//                 const containerCards = Array.from(container.children);
//                 cardsToSort.forEach(card => {
//                     if (containerCards.includes(card.parentNode)) {
//                         container.appendChild(card.parentNode);
//                     }
//                 });
//             });
//         });

// document.addEventListener("DOMContentLoaded", () => {
//     const CART_URL = "http://localhost:3000/cart";
    
//     // Add to cart functionality
//     const addToCartBtns = document.querySelectorAll('.accessory-card button');
    
//     addToCartBtns.forEach(btn => {
//         btn.addEventListener('click', async (e) => {
//             e.preventDefault();
//             const card = btn.closest('.accessory-card');
//             const productName = card.querySelector('.product-name').textContent;
//             const productPrice = card.querySelector('.product-price').textContent;
//             const productImage = card.querySelector('.pic img').src;
            
//             // Extract price number from text (e.g., "₹4,500 in pre-order")
//             const priceMatch = productPrice.match(/₹([\d,]+)/);
//             const price = priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : 0;
            
//             // Generate unique product ID
//             const productId = productName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();
            
//             try {
//                 // Add item to cart
//                 await fetch(CART_URL, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         id: productId,
//                         name: productName,
//                         price: `₹${price}`,
//                         image: productImage,
//                         quantity: 1
//                     })
//                 });
                
//                 // Show success feedback
//                 btn.textContent = 'ADDED ✓';
//                 btn.style.background = '#27ae60';
                
//                 setTimeout(() => {
//                     btn.textContent = 'ADD TO CART';
//                     btn.style.background = '#3498db';
//                 }, 2000);
                
//             } catch (error) {
//                 console.error('Error adding to cart:', error);
//                 alert('Failed to add item to cart. Please try again.');
//             }
//         });
//     });
// });