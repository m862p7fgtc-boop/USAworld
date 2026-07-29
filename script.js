// ================================
// PRODUITS DE DEMONSTRATION
// ================================

const products = [
  {
    id: 1,
    name: "Produit Premium",
    description: "Présentation du produit",
    price: 29.99,
    category: "popular",
    icon: "✦"
  },
  {
    id: 2,
    name: "Produit Gold",
    description: "Une sélection USWORLD",
    price: 49.99,
    category: "popular",
    icon: "◆"
  },
  {
    id: 3,
    name: "Nouveauté",
    description: "Découvrez notre nouveauté",
    price: 19.99,
    category: "new",
    icon: "✧"
  },
  {
    id: 4,
    name: "Produit Classic",
    description: "Un produit incontournable",
    price: 24.99,
    category: "new",
    icon: "◈"
  }
];


// ================================
// PANIER
// ================================

let cart = [];

function addToCart(id) {
  const product = products.find(p => p.id === id);

  if (!product) return;

  cart.push(product);

  updateCart();

  alert(`${product.name} a été ajouté au panier.`);
}


function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}


function updateCart() {
  const count = document.getElementById("cart-count");
  const items = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");

  count.textContent = cart.length;

  if (cart.length === 0) {
    items.innerHTML = `
      <div class="info-card">
        <p>Votre panier est vide.</p>
      </div>
    `;

    total.textContent = "$0.00";
    return;
  }

  let totalPrice = 0;

  items.innerHTML = cart.map((product, index) => {
    totalPrice += product.price;

    return `
      <div class="cart-item">
        <div>
          <strong>${product.name}</strong>
          <p>$${product.price.toFixed(2)}</p>
        </div>

        <button
          class="remove-button"
          onclick="removeFromCart(${index})"
        >
          Supprimer
        </button>
      </div>
    `;
  }).join("");

  total.textContent = `$${totalPrice.toFixed(2)}`;
}


// ================================
// AFFICHAGE PRODUITS
// ================================

function renderProducts(list, targetId) {
  const container = document.getElementById(targetId);

  container.innerHTML = list.map(product => `
    <article class="product">

      <div class="product-image">
        ${product.icon}
      </div>

      <div class="product-content">

        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <div class="product-bottom">

          <span class="price">
            $${product.price.toFixed(2)}
          </span>

          <button
            class="add-button"
            onclick="addToCart(${product.id})"
          >
            +
          </button>

        </div>

      </div>

    </article>
  `).join("");
}


// ================================
// FILTRES
// ================================

function filterProducts(category) {

  if (category === "all") {
    renderProducts(products, "product-list");
    return;
  }

  const filtered = products.filter(
    product => product.category === category
  );

  renderProducts(filtered, "product-list");
}


// ================================
// NAVIGATION
// ================================

function showPage(pageId) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const page = document.getElementById(pageId);

  if (page) {
    page.classList.add("active");
  }

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.remove("active");
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ================================
// CONTACT
// ================================

function sendContact() {

  const name = document.getElementById("contact-name").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  if (!name || !message) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  alert("Message préparé. La connexion Telegram pourra être ajoutée ici.");

  document.getElementById("contact-name").value = "";
  document.getElementById("contact-message").value = "";
}


// ================================
// COMMANDE
// ================================

function checkout() {

  if (cart.length === 0) {
    alert("Votre panier est vide.");
    return;
  }

  alert(
    "Le système de commande pourra être connecté à ton backend/Vercel ici."
  );
}


// ================================
// INITIALISATION
// ================================

renderProducts(products, "product-list");
renderProducts(products, "shop-products");
updateCart();
async function envoyerTelegram(message) {
  const response = await fetch("/api/telegram", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: message
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erreur lors de l'envoi");
  }

  return data;
}

async function sendContact() {
  const message = document.getElementById("contact-message").value;

  if (!message.trim()) {
    alert("Écris un message avant d'envoyer.");
    return;
  }

  try {
    await envoyerTelegram(message);
    alert("Message envoyé !");
    document.getElementById("contact-message").value = "";
  } catch (error) {
    console.error(error);
    alert("Impossible d'envoyer le message.");
  }
}
