const model = require("./model");
const viewer = require("./viewer");

export function listenCart() {
    //show or hide cart
    document.getElementById('show-hide-cart').addEventListener('click', () => {
        model.clickCartView();
        const cartVisible = model.getCartView();
        viewer.renderCartButton(cartVisible, model.getCart());

        const cartView = document.getElementById('cart-view');

        if (cartVisible) {
            cartView.style.display = 'block';
            const carts = model.getCart();
            viewer.renderCart(carts);
        } else {
            cartView.style.display = 'none';
        }

    });
    //add to cart
    document.getElementById('product-view').addEventListener('click', (event) => {
        if (event.target.classList.contains("add-to-cart")) {
            const productID = parseInt(event.target.getAttribute('productid'));
            model.addToCart(productID);
            const cartVisible = model.getCartView();
            viewer.renderCartButton(model.getCartView(), model.getCart());
            const carts = model.getCart();
            if (cartVisible) {
                viewer.renderCart(carts);
            }
        }
    });
    //clear cart
    document.getElementById('cart-view').addEventListener('click', (event) => {
        if (event.target.id === "clear-cart") {
            model.clearCart();
            model.clickCartView();
            const cartVisible = model.getCartView();
            viewer.renderCartButton(cartVisible, model.getCart());
            const cartView = document.getElementById('cart-view');
            cartView.style.display = 'none';
        }
    });
    //update quantity
    document.getElementById('cart-view').addEventListener('input', (event) => {
        if (event.target.classList.contains("update-quantity")) {
            const productID = parseInt(event.target.getAttribute('productid'));
            const productQuantity = parseInt(event.target.value);
            model.changeNum(productID, productQuantity);
            const cartVisible = model.getCartView();
            const carts = model.getCart();
            if (cartVisible) {
                viewer.renderCart(carts);
            }
        }
    })
}

