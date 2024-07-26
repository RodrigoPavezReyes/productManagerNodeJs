const fs = require('fs').promises; 

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    async loadProducts() {
        try {
            if (await fs.access(this.path).then(() => true).catch(() => false)) {
                const data = await fs.readFile(this.path, 'utf-8');
                this.products = JSON.parse(data);
            } else {
                await this.saveProducts();
            }
        } catch (error) {
            console.error("Error al cargar los productos", error);
            this.products = [];
        }
    }

    async saveProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error("Error al guardar los productos", error);
        }
    }

    async addProduct(product) {
        try {
            const newProduct = {
                id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock
            };

            this.products.push(newProduct);
            await this.saveProducts();

            console.log(`Producto agregado con éxito`, newProduct);
        } catch (error) {
            console.error(`Error al agregar producto`, error);
        }
    }

    async getProducts() {
        return this.products;
    }

    async getProductsByID(id) {
        return this.products.find(product => product.id === id);
    }

    async updateProduct(id, updateFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) return;

        const product = this.products[productIndex];
        this.products[productIndex] = { ...product, ...updateFields, id: product.id };
        await this.saveProducts();
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) return;

        this.products.splice(productIndex, 1);
        await this.saveProducts();
    }
}

module.exports = ProductManager;


/*     // Ejemplo de uso
const manager = new ProductManager('products.json');

 // Imprimir los productos actuales (vacío al inicio)
console.log(manager.getProducts());  

// Agregar un nuevo producto
manager.addProduct({
    title: "Notebook",
    description: "Apple",
    price: 1700,
    thumbnail: "Sin imagen",
    code: "a5",
    stock: 8
});


//Imprimir los productos después de agregar uno (debería mostrar el producto agregado)
console.log(manager.getProducts())


Obtener un producto por su ID
const product = manager.getProductsByID(1);
console.log(product)


Actualizar el producto
manager.updateProduct(1, { price: 250 });
console.log(manager.getProductsByID(1))

Eliminar el producto
manager.deleteProduct(1);
console.log(manager.getProducts())   */