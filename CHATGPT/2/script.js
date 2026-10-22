/* =================================
   NOVA CLOTHING STORE
================================= */


/* =================================
   PRODUCTS
================================= */

const products = [

    {
        id: 1,
        name: "Shadow Oversized Tee",
        category: "streetwear",
        price: 49,
        tag: "NEW",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=85",
        description: "Heavyweight oversized cotton tee with a futuristic streetwear silhouette."
    },

    {
        id: 2,
        name: "Urban Black Jacket",
        category: "men",
        price: 129,
        tag: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85",
        description: "Premium structured jacket designed for modern urban environments."
    },

    {
        id: 3,
        name: "Future Denim",
        category: "women",
        price: 89,
        tag: "NEW",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=85",
        description: "Contemporary denim with a relaxed futuristic fit."
    },

    {
        id: 4,
        name: "Minimal Hoodie",
        category: "streetwear",
        price: 79,
        tag: "LIMITED",
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85",
        description: "Soft heavyweight hoodie built for everyday comfort."
    },

    {
        id: 5,
        name: "Neo Essential Shirt",
        category: "men",
        price: 69,
        tag: "NEW",
        image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=85",
        description: "Clean modern shirt featuring premium lightweight fabric."
    },

    {
        id: 6,
        name: "Chrome Street Pants",
        category: "streetwear",
        price: 99,
        tag: "HOT",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85",
        description: "Wide-leg street pants designed with a futuristic aesthetic."
    },

    {
        id: 7,
        name: "Essential Women's Coat",
        category: "women",
        price: 149,
        tag: "PREMIUM",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=85",
        description: "Elegant oversized coat combining structure and comfort."
    },

    {
        id: 8,
        name: "NOVA Tech Vest",
        category: "men",
        price: 119,
        tag: "LIMITED",
        image: "https://images.unsplash.com/photo-1551484659-9c3e7b3c1f04?auto=format&fit=crop&w=700&q=85",
        description: "Utility-inspired technical vest for next-generation streetwear."
    }

];


/* =================================
   STATE
================================= */

let cart =
    JSON.parse(localStorage.getItem("novaCart")) || [];

let wishlist =
    JSON.parse(localStorage.getItem("novaWishlist")) || [];

let currentProduct = null;


/* =================================
   DOM
================================= */

const productGrid =
    document.getElementById("productGrid");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.getElementById("cartCount");

const wishlistCount =
    document.getElementById("wishlistCount");

const productModal =
    document.getElementById("productModal");

const toast =
    document.getElementById("toast");


/* =================================
   SAVE
================================= */

function saveData() {

    localStorage.setItem(
        "novaCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "novaWishlist",
        JSON.stringify(wishlist)
    );

}


/* =================================
   RENDER PRODUCTS
================================= */

function renderProducts(filter = "all") {

    const filteredProducts =
        filter === "all"
            ? products
            : products.filter(
                product => product.category === filter
            );

    productGrid.innerHTML =
        filteredProducts.map(product => {

            const isLiked =
                wishlist.includes(product.id);

            return `

                <article class="product-card">

                    <div class="product-image">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            loading="lazy"
                        >

                        <span class="product-tag">
                            ${product.tag}
                        </span>

                        <button
                            class="product-wishlist ${isLiked ? "active" : ""}"
                            onclick="toggleWishlist(${product.id})"
                        >

                            <i class="${isLiked
                                ? "fa-solid"
                                : "fa-regular"} fa-heart"></i>

                        </button>

                    </div>

                    <div class="product-info">

                        <div class="product-category">
                            ${product.category}
                        </div>

                        <h3 class="product-name">
                            ${product.name}
                        </h3>

                        <div class="product-price">
                            $${product.price.toFixed(2)}
                        </div>

                        <div class="product-actions">

                            <button
                                class="quick-view"
                                onclick="openProduct(${product.id})"
                            >
                                QUICK VIEW
                            </button>

                            <button
                                class="add-btn"
                                onclick="addToCart(${product.id})"
                            >
                                ADD TO BAG
                            </button>

                        </div>

                    </div>

                </article>

            `;

        }).join("");

}


/* =================================
   FILTER
================================= */

document.querySelectorAll(".filter")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".filter")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            renderProducts(
                button.dataset.filter
            );

            document
                .getElementById("shop")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


/* =================================
   CATEGORY FILTER
================================= */

function filterCategory(category) {

    document
        .querySelectorAll(".filter")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === category
            );

        });

    renderProducts(category);

    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =================================
   CART
================================= */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) return;

    const existing =
        cart.find(
            item => item.id === productId
        );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveData();

    renderCart();

    showToast(
        `${product.name} added to your bag`
    );

}


/* =================================
   REMOVE CART
================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );

    saveData();

    renderCart();

}


/* =================================
   QUANTITY
================================= */

function changeQuantity(productId, amount) {

    const item =
        cart.find(
            product => product.id === productId
        );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }

    saveData();

    renderCart();

}


/* =================================
   RENDER CART
================================= */

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your bag is empty.
            </div>
        `;

    } else {

        cartItems.innerHTML =
            cart.map(item => `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div class="cart-item-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            $${item.price.toFixed(2)}
                        </p>

                        <div class="qty">

                            <button
                                onclick="changeQuantity(${item.id}, -1)"
                            >
                                -
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeQuantity(${item.id}, 1)"
                            >
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${item.id})"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            `).join("");

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );

    const count =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    cartTotal.textContent =
        `$${total.toFixed(2)}`;

    cartCount.textContent = count;

    wishlistCount.textContent =
        wishlist.length;

}


/* =================================
   OPEN CART
================================= */

function openCart() {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.classList.add("no-scroll");

}


/* =================================
   CLOSE CART
================================= */

function closeCart() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


/* =================================
   CART EVENTS
================================= */

document
    .getElementById("cartBtn")
    .addEventListener(
        "click",
        openCart
    );

document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );

cartOverlay.addEventListener(
    "click",
    closeCart
);


/* =================================
   WISHLIST
================================= */

function toggleWishlist(productId) {

    if (wishlist.includes(productId)) {

        wishlist =
            wishlist.filter(
                id => id !== productId
            );

        showToast("Removed from wishlist");

    } else {

        wishlist.push(productId);

        showToast("Added to wishlist");

    }

    saveData();

    renderProducts();

    renderCart();

}


/* =================================
   WISHLIST BUTTON
================================= */

document
    .getElementById("wishlistBtn")
    .addEventListener(
        "click",
        () => {

            const liked =
                products.filter(
                    product =>
                        wishlist.includes(product.id)
                );

            if (liked.length === 0) {

                showToast(
                    "Your wishlist is empty"
                );

                return;

            }

            productGrid.innerHTML =
                liked.map(product => {

                    return `

                        <article class="product-card">

                            <div class="product-image">

                                <img
                                    src="${product.image}"
                                    alt="${product.name}"
                                >

                                <button
                                    class="product-wishlist active"
                                    onclick="toggleWishlist(${product.id})"
                                >
                                    <i class="fa-solid fa-heart"></i>
                                </button>

                            </div>

                            <div class="product-info">

                                <div class="product-category">
                                    ${product.category}
                                </div>

                                <h3 class="product-name">
                                    ${product.name}
                                </h3>

                                <div class="product-price">
                                    $${product.price.toFixed(2)}
                                </div>

                                <div class="product-actions">

                                    <button
                                        class="quick-view"
                                        onclick="openProduct(${product.id})"
                                    >
                                        QUICK VIEW
                                    </button>

                                    <button
                                        class="add-btn"
                                        onclick="addToCart(${product.id})"
                                    >
                                        ADD TO BAG
                                    </button>

                                </div>

                            </div>

                        </article>

                    `;

                }).join("");

            document
                .getElementById("shop")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* =================================
   PRODUCT MODAL
================================= */

function openProduct(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) return;

    currentProduct = product;

    document.getElementById("modalImage")
        .src = product.image;

    document.getElementById("modalName")
        .textContent = product.name;

    document.getElementById("modalCategory")
        .textContent = product.category;

    document.getElementById("modalPrice")
        .textContent =
        `$${product.price.toFixed(2)}`;

    document.getElementById("modalDescription")
        .textContent =
        product.description;

    productModal.classList.add("active");

    document.body.classList.add("no-scroll");

}


/* =================================
   CLOSE MODAL
================================= */

document
    .getElementById("modalClose")
    .addEventListener(
        "click",
        closeModal
    );

productModal.addEventListener(
    "click",
    event => {

        if (event.target === productModal) {

            closeModal();

        }

    }
);

function closeModal() {

    productModal.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


/* =================================
   MODAL ADD
================================= */

document
    .getElementById("modalAdd")
    .addEventListener(
        "click",
        () => {

            if (!currentProduct) return;

            addToCart(currentProduct.id);

            closeModal();

            openCart();

        }
    );


/* =================================
   SIZE SELECTOR
================================= */

document
    .querySelectorAll(".sizes button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".sizes button")
                    .forEach(btn =>
                        btn.classList.remove("selected")
                    );

                button.classList.add("selected");

            }
        );

    });


/* =================================
   SEARCH
================================= */

const searchPanel =
    document.getElementById("searchPanel");

const searchInput =
    document.getElementById("searchInput");

document
    .getElementById("searchBtn")
    .addEventListener(
        "click",
        () => {

            searchPanel.classList.add("active");

            searchInput.focus();

        }
    );

document
    .getElementById("closeSearch")
    .addEventListener(
        "click",
        () => {

            searchPanel.classList.remove(
                "active"
            );

            searchInput.value = "";

            renderProducts();

        }
    );


searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();

        const results =
            products.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(query)

                ||

                product.category
                    .toLowerCase()
                    .includes(query)

            );

        productGrid.innerHTML =
            results.map(product => {

                return `

                    <article class="product-card">

                        <div class="product-image">

                            <img
                                src="${product.image}"
                                alt="${product.name}"
                            >

                        </div>

                        <div class="product-info">

                            <div class="product-category">
                                ${product.category}
                            </div>

                            <h3 class="product-name">
                                ${product.name}
                            </h3>

                            <div class="product-price">
                                $${product.price.toFixed(2)}
                            </div>

                            <div class="product-actions">

                                <button
                                    class="quick-view"
                                    onclick="openProduct(${product.id})"
                                >
                                    QUICK VIEW
                                </button>

                                <button
                                    class="add-btn"
                                    onclick="addToCart(${product.id})"
                                >
                                    ADD TO BAG
                                </button>

                            </div>

                        </div>

                    </article>

                `;

            }).join("");

    }
);


/* =================================
   MOBILE MENU
================================= */

document
    .getElementById("menuBtn")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("nav")
                .classList.toggle("active");

        }
    );


document
    .querySelectorAll(".nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                document
                    .getElementById("nav")
                    .classList.remove("active");

            }
        );

    });


/* =================================
   TOAST
================================= */

function showToast(message) {

    toast.querySelector("span")
        .textContent = message;

    toast.classList.add("active");

    setTimeout(() => {

        toast.classList.remove("active");

    }, 2500);

}


/* =================================
   NEWSLETTER
================================= */

document
    .getElementById("newsletterForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const email =
                document.getElementById("email").value;

            if (!email) return;

            showToast(
                "Welcome to NOVA!"
            );

            event.target.reset();

        }
    );


/* =================================
   CHECKOUT
================================= */

document
    .getElementById("checkoutBtn")
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showToast(
                    "Your bag is empty"
                );

                return;

            }

            showToast(
                "Checkout system coming soon"
            );

        }
    );


/* =================================
   COUNTDOWN
================================= */

const saleDate =
    new Date();

saleDate.setDate(
    saleDate.getDate() + 7
);


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        saleDate.getTime() - now;

    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (distance %
                (1000 * 60))
            /
            1000
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");

}

setInterval(
    updateCountdown,
    1000
);

updateCountdown();


/* =================================
   LOADER
================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            document
                .getElementById("loader")
                .classList.add("hide");

        }, 800);

    }
);


/* =================================
   INITIALIZE
================================= */

renderProducts();

renderCart();