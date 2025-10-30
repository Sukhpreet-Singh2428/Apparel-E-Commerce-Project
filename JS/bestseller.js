console.log("✅ filter.js loaded successfully");

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM ready");

  // Select all filter links and product items
  const filterLinks = document.querySelectorAll(".tags a");
  const productItems = document.querySelectorAll(".row .item");

  // Price and discount ranges
  const priceRanges = {
    "Under ₹500": { min: 0, max: 500 },
    "₹500 - ₹1000": { min: 500, max: 1000 },
    "₹1000 - ₹2000": { min: 1000, max: 2000 },
    "₹2000 - ₹5000": { min: 2000, max: 5000 },
    "Over ₹5000": { min: 5000, max: Infinity }
  };

  const discountRanges = {
    "10% - 30%": { min: 10, max: 30 },
    "30% - 50%": { min: 30, max: 50 },
    "50% - 70%": { min: 50, max: 70 },
    "Over 70%": { min: 70, max: 100 }
  };

  // Filter state
  let activeFilter = { type: null, value: null };

  // Add click listener to all filter links
  filterLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const filterType = link.closest("li").querySelector("a").textContent.trim();
      const filterValue = link.textContent.replace("▼", "").trim();

      console.log(`Filter clicked: ${filterType} -> ${filterValue}`);

      applyFilter(filterValue);
      highlightActiveFilter(link);
    });
  });

  // Apply filter logic
  function applyFilter(value) {
    let visibleCount = 0;

    productItems.forEach(item => {
      const name = item.querySelector(".product-name").textContent.toLowerCase();
      const detail = item.querySelector(".product-detail").textContent.toLowerCase();
      const price = parseInt(item.querySelector(".product-price").textContent.replace("₹", "").replace(",", ""));
      const discountMatch = item.querySelector(".product-detail").textContent.match(/(\d+)% Off/);
      const discount = discountMatch ? parseInt(discountMatch[1]) : 0;

      let show = false;

      // Price filter
      if (priceRanges[value]) {
        const range = priceRanges[value];
        show = price >= range.min && price <= range.max;
      }

      // Discount filter
      else if (discountRanges[value]) {
        const range = discountRanges[value];
        show = discount >= range.min && discount <= range.max;
      }

      // Color filter
      else if (["black", "white", "red", "blue", "green", "yellow", "brown", "beige", "multicolor"].includes(value.toLowerCase())) {
        show = name.includes(value.toLowerCase());
      }

      // Category filter (e.g., Shoes, T-Shirts, Jeans)
      else {
        show = name.includes(value.toLowerCase()) || detail.includes(value.toLowerCase());
      }

      item.style.display = show ? "flex" : "none";
      if (show) visibleCount++;
    });

    showNoProductsMessage(visibleCount === 0);
  }

  // Show message if no product matches
  function showNoProductsMessage(noProducts) {
    let msg = document.querySelector(".no-products-message");
    if (noProducts && !msg) {
      msg = document.createElement("div");
      msg.className = "no-products-message";
      msg.style.cssText = `
        text-align: center;
        font-family: "Audiowide", sans-serif;
        font-size: 1rem;
        color: #888;
        padding: 2rem;
      `;
      msg.textContent = "No products match your selected filters.";
      document.querySelector(".content").appendChild(msg);
    } else if (!noProducts && msg) {
      msg.remove();
    }
  }

  // Highlight active filter
  function highlightActiveFilter(activeLink) {
    filterLinks.forEach(link => {
      link.style.color = "";
      link.style.fontWeight = "";
    });
    activeLink.style.color = "#ff00ff";
    activeLink.style.fontWeight = "bold";
  }
});
