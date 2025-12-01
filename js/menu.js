const menuItems = [
    {
        id: 1,
        name: "Klasszikus Margherita",
        description: "San Marzano paradicsomszósz, friss bivalymozzarella, bazsalikom, extra szűz olívaolaj.",
        price: 2990,
        image: "assets/images/margherita.png",
        category: "Veggie"
    },
    {
        id: 2,
        name: "Dupla Pepperoni",
        description: "Fűszeres pepperoni, mozzarella, paradicsomszósz, oregánó és egy csipet chilis méz.",
        price: 3490,
        image: "assets/images/pepperoni.png",
        category: "Meat"
    },
    {
        id: 3,
        name: "Szarvasgombás Gomba",
        description: "Erdei gombák, szarvasgombás krémalap, mozzarella, kakukkfű és parmezán forgács.",
        price: 3890,
        image: "assets/images/margherita.png",
        category: "Veggie"
    },
    {
        id: 4,
        name: "Csípős Hawaii",
        description: "Sült ananász, jalapeño, sonka, mozzarella és csípős méz máz.",
        price: 3290,
        image: "assets/images/pepperoni.png",
        category: "Meat"
    },
    {
        id: 5,
        name: "Négysajtos",
        description: "Mozzarella, gorgonzola, parmezán és provolone fokhagymás vajas alappal.",
        price: 3590,
        image: "assets/images/margherita.png",
        category: "Veggie"
    },
    {
        id: 6,
        name: "Húsmádó",
        description: "Pepperoni, kolbász, bacon, sonka, mozzarella és BBQ szósz.",
        price: 4190,
        image: "assets/images/pepperoni.png",
        category: "Meat"
    }
];

let cart = [];

const menuContainer = document.getElementById('menu-container');
const cartCountEl = document.getElementById('cart-count');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');

document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});

function renderMenu(filter = 'All') {
    menuContainer.innerHTML = '';

    const filteredItems = filter === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === filter);

    filteredItems.forEach((item, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 animate-fade-in';
        col.style.animationDelay = `${index * 0.1}s`;

        col.innerHTML = `
            <div class="card h-100">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title">${item.name}</h5>
                        <span class="price-tag">${item.price} Ft</span>
                    </div>
                    <p class="card-text text-muted flex-grow-1">${item.description}</p>
                    <button class="btn btn-primary w-100 mt-3" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus me-2"></i>Kosárba
                    </button>
                </div>
            </div>
        `;

        menuContainer.appendChild(col);
    });
}

function filterMenu(category) {
    renderMenu(category);

    const buttons = document.querySelectorAll('.btn-outline-dark');
    buttons.forEach(btn => {
        if (btn.textContent === (category === 'All' ? 'Összes' : (category === 'Meat' ? 'Húsos' : 'Vegetáriánus'))) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    const existingItem = cart.find(i => i.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCartUI();
}

function removeFromCart(id) {
    const index = cart.findIndex(i => i.id === id);
    if (index > -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<div class="text-center text-muted py-4">A kosár üres.</div>';
        cartTotalEl.textContent = '0 Ft';
        return;
    }

    cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="d-flex align-items-center">
                <img src="${item.image}" class="cart-item-img" alt="${item.name}">
                <div>
                    <h6 class="mb-0 fw-bold">${item.name}</h6>
                    <small class="text-muted">${item.price} Ft x ${item.quantity}</small>
                </div>
            </div>
            <div class="cart-controls d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-outline-secondary" onclick="removeFromCart(${item.id})"><i class="fas fa-minus"></i></button>
                <span class="fw-bold">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-primary" onclick="addToCart(${item.id})"><i class="fas fa-plus"></i></button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalEl.textContent = total + ' Ft';
}

function handleCheckout() {
    if (cart.length === 0) {
        alert("A kosár üres!");
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Köszönjük a rendelést! Végösszeg: ${total} Ft\n\n(Ez egy demó fizetés)`);
    cart = [];
    updateCartUI();

    const modalEl = document.getElementById('cartModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
}

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.handleCheckout = handleCheckout;
window.filterMenu = filterMenu;
