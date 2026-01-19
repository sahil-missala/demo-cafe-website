const menu = [
  { id: 1, name: "Cappuccino", price: 120 },
  { id: 2, name: "Latte", price: 140 },
  { id: 3, name: "Cold Coffee", price: 160 },
  { id: 4, name: "Espresso", price: 90 },
  { id: 5, name: "Chocolate Muffin", price: 80 },
  { id: 6, name: "Croissant", price: 100 }
];

let cart = [];

const menuDiv = document.getElementById("menu");
const cartDiv = document.getElementById("cart-items");
const totalSpan = document.getElementById("total");

/* Render Menu */
function renderMenu() {
  menuDiv.innerHTML = "";
  menu.forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-card bg-white p-4 rounded-2xl shadow";

    div.innerHTML = `
      <h3 class="text-lg font-semibold">${item.name}</h3>
      <p class="opacity-70">₹${item.price}</p>
      <button onclick="addToCart(${item.id})"
        class="mt-3 bg-[#6f4e37] text-white px-4 py-1 rounded-lg text-sm">
        Add to Cart
      </button>
    `;

    menuDiv.appendChild(div);
  });
}

/* Add to cart */
function addToCart(id) {
  const item = menu.find(i => i.id === id);
  const existing = cart.find(i => i.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  renderCart();
}

/* Remove item */
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

/* Change quantity */
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  item.qty += delta;

  if (item.qty <= 0) {
    removeItem(id);
  }

  renderCart();
}

/* Render Cart */
function renderCart() {
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "flex justify-between items-center bg-[#f7efe5] p-2 rounded-lg";

    div.innerHTML = `
      <div>
        <p class="font-medium">${item.name}</p>
        <p class="text-sm opacity-70">₹${item.price} × ${item.qty}</p>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="changeQty(${item.id}, -1)" class="px-2 bg-white rounded">−</button>
        <button onclick="changeQty(${item.id}, 1)" class="px-2 bg-white rounded">+</button>
        <button onclick="removeItem(${item.id})" class="text-red-600">✕</button>
      </div>
    `;

    cartDiv.appendChild(div);
  });

  totalSpan.textContent = total;
}

renderMenu();
