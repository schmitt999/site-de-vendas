let cart = [];

// Adiciona produto ao carrinho
function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
  showToast(`"${name}" adicionado ao carrinho!`);
}

// Atualiza o carrinho na tela
function updateCartUI() {
  document.getElementById('cart-count').innerText = cart.length;
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');

  cartList.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartList.innerHTML = '<li>O carrinho está vazio.</li>';
  } else {
    cart.forEach(item => {
      total += item.price;
      const li = document.createElement('li');
      li.innerHTML = `<span>${item.name}</span> <strong>R$ ${item.price.toFixed(2)}</strong>`;
      cartList.appendChild(li);
    });
  }

  cartTotal.innerText = `R$ ${total.toFixed(2)}`;
}

// Modal do Carrinho
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');

cartBtn.onclick = () => cartModal.style.display = 'flex';
closeCart.onclick = () => cartModal.style.display = 'none';
window.onclick = (e) => { if (e.target === cartModal) cartModal.style.display = 'none'; };

// Notificação rápida
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.className = "toast show";
  setTimeout(() => { toast.className = toast.className.replace("toast show", "toast"); }, 2800);
}

// ================= SISTEMA DE BUSCA EM TEMPO REAL =================
function filterProducts() {
  // Pega o texto digitado e transforma em letras minúsculas
  const query = document.getElementById('search-input').value.toLowerCase().trim();
  
  // Seleciona todos os cards de produtos do site
  const products = document.querySelectorAll('.searchable-product');

  products.forEach(product => {
    // Busca pelo nome dentro do elemento .product-name
    const nameElement = product.querySelector('.product-name');
    
    if (nameElement) {
      const nameText = nameElement.innerText.toLowerCase();
      
      // Se o nome contiver o texto pesquisado, mostra o produto. Se não, esconde.
      if (nameText.includes(query)) {
        product.style.display = 'flex';
      } else {
        product.style.display = 'none';
      }
    }
  });
}

// Finalizar Pedido
function checkout() {
  if (cart.length === 0) return alert('Seu carrinho está vazio!');
  alert('Compra realizada com sucesso!');
  cart = [];
  updateCartUI();
  cartModal.style.display = 'none';
}