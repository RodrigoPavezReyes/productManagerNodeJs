const express = require('express');
const ProductManager = require('./productManager.js');

const app = express();
const PORT = 8080;

const productManager = new ProductManager("./products.json");

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ENDPOINTS

app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        let productosLimitados = await productManager.getProducts();

        if (!isNaN(limit) && limit > 0) {
            productosLimitados = productosLimitados.slice(0, limit);
        }

        res.json(productosLimitados);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productParams = parseInt(req.params.pid);
        const arrayProductos = await productManager.getProducts();

        if (isNaN(productParams) || productParams > arrayProductos.length) {
            return res.status(400).json({ error: "ID fuera de los parámetros" });
        }

        const productoFind = arrayProductos.find(prod => prod.id === productParams);
        if (productoFind) {
            res.json(productoFind);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
