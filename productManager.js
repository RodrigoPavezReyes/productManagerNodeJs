const { error } = require("console");
const fs = require (`fs`)

class ProductManager  {

    constructor(path){
        this.path = path
        this.products = []
        this.loadProducts()
    }

    loadProducts(){

        try {
            if(fs.existsSync(this.path)){
            const data = fs.readFileSync(this.path,`utf-8`);
            this.products = JSON.parse(data);

            }else{
                this.saveProducts();
            }
        
        } catch (error) {
            console.error("Error al cargar los productos", error)
            this.products = []
        }
    }

    saveProducts(){
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))

    }

    addProduct(product){
        try {
            const newProduct = {
                id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock
            }
    
            this.products.push(newProduct);
    
            this.saveProducts();
    
            console.log(`Producto agregado con exito`, newProduct)
        } catch (error) {
            console.error(`Error al agregar producto`, error)
            
        }

    }

    getProducts(){
        return this.products;
    }

    getProductsByID(id){
            const product = this.products.find(product => product.id === id)

            !product && console.error("Producto no encontrado", error)

            return product
    }

    updateProduct(id, updateFields){
        const productIndex = this.products.findIndex(product => product.id === id);

        productIndex=== -1 && console.log("no se encuentra el producto",error);

        const product = this.products [productIndex]

        this.products[productIndex] = { ...product, ...updateFields, id: product.id}

        this.saveProducts();
    }

    deleteProduct(id){

        const productIndex = this.products.findIndex(product =>product.id === id);

        productIndex=== -1 && console.log("no se encuentra el producto",error);

        this.products.splice(productIndex,1);

        this.saveProducts();


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