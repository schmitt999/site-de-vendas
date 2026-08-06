// Array para armazenar os itens do carrinho
let cart = [];

// Função para adicionar produtos ao carrinho
function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  updateCartUI();
  showToast(`"${productName}" adicionado ao carrinho!`);
}

// Atualiza a interface do carrinho (quantidade e valor total)
function updateCartUI() {
  const cartCountEl = document.getElementById('cart-count');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartTotalPrice = document.getElementById('cart-total-price');

  // Atualiza contador
  cartCountEl.innerText = cart.length;

  // Limpa lista de itens
  cartItemsList.innerHTML = '';

  let total = 0;

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<li>Seu carrinho está vazio.</li>';
  } else {
    cart.forEach((item, index) => {
      total += item.price;
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.name}</span>
        <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span>
      `;
      cartItemsList.appendChild(li);
    });
  }

  cartTotalPrice.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Abrir e Fechar Modal do Carrinho
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');

cartBtn.addEventListener('click', () => {
  cartModal.style.display = 'flex';
});

closeCart.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = 'none';
  }
});

// Exibir Notificação (Toast)
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.className = "toast show";
  setTimeout(() => { 
    toast.className = toast.className.replace("toast show", "toast"); 
  }, 3000);
}

// Filtro de Busca de Produtos em Tempo Real
function filterProducts() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const title = card.querySelector('.product-title').innerText.toLowerCase();
    if (title.includes(query)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Finalizar Compra
function checkout() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Obrigado pela compra! Seu pedido foi processado com sucesso.");
  cart = [];
  updateCartUI();
  cartModal.style.display = 'none';
}