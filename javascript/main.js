const recentlyViewedSection = document.querySelector(".recently-viewed");
const recentlyViewedList = document.querySelector(".product-row");
const productCards = document.querySelectorAll(".product-card");

// Load stored items
let viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

function showRecentlyViewed() {
  if (viewed.length === 0) return;

  recentlyViewedSection.style.display = "block";
  recentlyViewedList.innerHTML = "";

  viewed.forEach(item => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${item.img}" alt="">
      <p>${item.name}</p>
    `;
    recentlyViewedList.appendChild(div);
  });
}

// Save when product is clicked
productCards.forEach(card => {
  card.addEventListener("click", () => {
    const product = {
      name: card.dataset.name,
      img: card.dataset.img
    };

    // Avoid duplicates
    viewed = viewed.filter(v => v.name !== product.name);
    viewed.unshift(product);

    // Limit to 5 items
    viewed = viewed.slice(0, 5);

    localStorage.setItem("recentlyViewed", JSON.stringify(viewed));
    showRecentlyViewed();
  });
});

showRecentlyViewed();
