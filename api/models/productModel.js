// models/task.js
class ProductModel {
    constructor(productId, title, price, quantity, description) {
        this.productId = productId;
        this.title = title;
        this.price = price,
            this.quantity = quantity,
            this.description = description;
    }
}

module.exports = ProductModel;