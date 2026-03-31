const viewer = require("./viewer");
const controller = require("./controller");
const model = require("./model");

document.addEventListener('DOMContentLoaded', () => {

    const product = model.getAllProduct();
    viewer.renderProduct(product);
    viewer.renderCartButton(model.getCartView(), model.getCart());
    controller.listenCart();

});

