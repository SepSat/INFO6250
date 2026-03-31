export function renderProduct(products) {
    const productContainer = document.getElementById('product-view');
    productContainer.innerHTML = products.map(product => `
        <div class="prodcut">
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name} : $${product.price.toFixed(2)}</p>
            <button class="add-to-cart" productid ="${product.id}">Add To Cart</button>
        </div>            
    `).join('');
}
export function renderCart(carts) {
    const cartContainer = document.getElementById('cart-product')
    if (!Array.isArray(carts) || carts.length === 0) {
        cartContainer.innerHTML = `<p>You are not add cat now. Click the 'Add To Cart' to choose your cat!</p>`;
    } else {
        let totalPrice = 0;
        cartContainer.innerHTML = carts.map(item => {
            if (item && item.product) {
                const itemTotalPrice = item.product.price * item.quantity;
                totalPrice += itemTotalPrice;
                return `
                    <div class="cart-item">
                        <p>${item.product.name}</p>
                        <img src=${item.product.image} alt=${item.product.name}>
                        <p>Single price: $${item.product.price.toFixed(2)}</p>
                        <p>Quantity: <input type="number" value="${item.quantity}" class="update-quantity" productid="${item.product.id}"></p>
                        <p>Total price: $${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                `;
            } else {
                return `<p>Product data is missing.</p>`;
            }
        }).join('');
        cartContainer.innerHTML += `
            <p><strong>Total Price: $${totalPrice.toFixed(2)}</strong></p>
        
        `
    }
}
export function renderCartButton(toggleCartbutton, carts) {
    if (!Array.isArray(carts)) {
        carts = [];
    }
    const cartButton = document.getElementById('show-hide-cart')
    const totalItm = carts.reduce((total, item) => total + item.quantity, 0);
    let totalView;
    if (totalItm === 0){
        totalView = ``;
    }else{
        totalView = ` (${totalItm})`;
    }
    if (!toggleCartbutton) {
        cartButton.textContent = `View Cart${totalView}`;
    } else {
        cartButton.textContent = `Hide Cart${totalView}`;
    }
}
