let cart = [];
let wishlist = [];


/* SEARCH */

function openSearch() {

    document.getElementById("searchBox").style.display = "block";

    document.getElementById("searchInput").focus();

}


function closeSearch() {

    document.getElementById("searchBox").style.display = "none";

}


/* ADD TO CART */

function addToCart(name, price) {

    const existing = cart.find(
        item => item.name === name
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    openCart();

}


/* UPDATE CART */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    cartItems.innerHTML = "";

    let total = 0;
    let quantity = 0;


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        quantity += item.quantity;


        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <p>
                    $${item.price.toFixed(2)}
                    × ${item.quantity}
                </p>

            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${index})"
            >
                Remove
            </button>

        `;


        cartItems.appendChild(div);

    });


    cartCount.innerText = quantity;

    cartTotal.innerText =
        "$" + total.toFixed(2);

}


/* REMOVE CART */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* OPEN CART */

function openCart() {

    document.getElementById(
        "cartOverlay"
    ).style.display = "block";

}


/* CLOSE CART */

function closeCart() {

    document.getElementById(
        "cartOverlay"
    ).style.display = "none";

}


/* WISHLIST */

function addWishlist(button) {

    button.innerText = "♥";

    button.style.color = "red";

    wishlist.push(true);

    document.getElementById(
        "wishlistCount"
    ).innerText = wishlist.length;

}


/* WISHLIST */

function toggleWishlist() {

    if (wishlist.length === 0) {

        alert("Your wishlist is empty.");

    } else {

        alert(
            "You have " +
            wishlist.length +
            " item(s) in your wishlist."
        );

    }

}


/* FILTER CATEGORY */

function filterCategory(category) {

    const products =
        document.querySelectorAll(
            ".product-card"
        );


    products.forEach(product => {

        if (
            category === "All" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });


    document.getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* SEARCH PRODUCTS */

function searchProducts() {

    const search =
        document.getElementById(
            "searchInput"
        ).value.toLowerCase();


    const products =
        document.querySelectorAll(
            ".product-card"
        );


    products.forEach(product => {

        const name =
            product
                .querySelector("h3")
                .innerText
                .toLowerCase();


        if (name.includes(search)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}