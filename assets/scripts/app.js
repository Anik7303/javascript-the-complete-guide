class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
}

class Component {
    constructor(renderedHookId) {
        this.hookId = renderedHookId;
    }

    createRootElement(tag, cssClasses, attributes) {
        const element = document.createElement(tag);
        if (cssClasses) {
            element.className = cssClasses;
        }
        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                element.setAttribute(attr.key, attr.value);
            }
        }
        document.getElementById(this.hookId).append(element);
        return element;
    }
}

class ElementAttribute {
    constructor(attributeKey, attributeValue) {
        this.key = attributeKey;
        this.value = attributeValue;
    }
}

class ProductItem extends Component {
    constructor(renderedHookId, product) {
        super(renderedHookId);
        this.product = product;
        this.render();
    }

    addToCart() {
        App.addProductToCart(this.product);
    }

    render() {
        const prodEl = this.createRootElement('li', 'product-item');
        prodEl.innerHTML = `
                <div>
                    <div class="product-item__image-container" >
                        <img src="${this.product.imageUrl}" alt="${this.product.title}" >
                    </div>
                    <div class="product-item__content" >
                        <h2>${this.product.title}</h2>
                        <h3>\$${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this));
    }
}

class ProductList extends Component {
    products = [
        new Product(
            'A Pillow',
            'https://www.serta.com/sites/ssb/serta.com/uploads/2018/accessories/pillows/Cool%20Comfy%20Queen/CoolComfy1.jpg',
            'A soft pillow',
            9.99
        ),
        new Product(
            'A Carpet',
            'https://cdn.britannica.com/49/74349-050-0CC8A49F/carpet-type-Herat.jpg',
            'A carpet you might like - or not',
            89.99
        ),
    ];

    constructor(renderedHookId) {
        super(renderedHookId);
        this.render();
    }

    render() {
        this.createRootElement('ul', 'product-list', [
            new ElementAttribute('id', 'prod-list'),
        ]);
        for (const prod of this.products) {
            new ProductItem('prod-list', prod);
        }
    }
}

class Cart extends Component {
    items = [];

    constructor(renderedHookId) {
        super(renderedHookId);
        this.render();
    }

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
            2
        )}</h2>`;
    }

    get cartItems() {
        return this.items;
    }

    get totalAmount() {
        return this.items.reduce(
            (prevValue, curItem) => prevValue + curItem.price,
            0
        );
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    orderProducts() {
        console.log(this.items);
    }

    render() {
        const cartEl = this.createRootElement('section', 'cart');
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        const orderButton = document.querySelector('button');
        orderButton.addEventListener('click', this.orderProducts.bind(this));
        this.totalOutput = cartEl.querySelector('h2');
    }
}

class Shop {
    constructor() {
        this.cart = new Cart('app');
        this.render();
    }

    render() {
        new ProductList('app');
    }
}

class App {
    static cart;

    static init() {
        const shop = new Shop();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();
