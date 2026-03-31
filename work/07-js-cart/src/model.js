const { data } = require("./data");
//add a new porduct in cart
export function addToCart(productID) {
    const product = data.products.find(pItem => pItem.id === String(productID));
    const cartItem = data.carts.find(cItem => cItem.product && cItem.product.id === String(productID));
    if (!cartItem) {
        data.carts.push({ product, quantity: 1 });
    } else {
        cartItem.quantity += 1;
    }
}

//change quantity of product or delete this product(set quantity as "0")
export function changeNum(productID, productNumber){
    const cartItem = data.carts.find(cItem => cItem.product && cItem.product.id === String(productID));
    if(productNumber === 0){
        data.carts = data.carts.filter(cItem => cItem.product.id !== String(productID));

    }else{
        cartItem.quantity = productNumber;
    }
}
//for check out - clear the cart
export function clearCart(){
    data.carts = [];
}
//for show or hide cart view
export function clickCartView(){
    data.cartstate = !data.cartstate;
}

export function getCartView(){
    return data.cartstate;
}
export function getAllProduct(){
    return data.products;
}

export function getCart(){
    return data.carts || [];
}