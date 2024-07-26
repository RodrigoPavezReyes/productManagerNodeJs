const express = require (`express`)
const ProductManager = require ("./productManager.js")

const app = express()
const PORT = 8080

const productManager = new ProductManager("./products.json")

//MIDDLEWARS

app.use(express.json())
app.use(express.urlencoded({extended:true}))


//ENDPOINTS

app.get(`/products`, (req,res)=>{

    let limit = parseInt(req.query.limit) //limite de consultas de products.json
    let productosLimitados = productManager.getProducts()

    if(!isNaN(limit)&& limit >0){
        limitedProducts = productosLimitados.slice(0,limit)
        res.json(limitedProducts)
    /* }else{
        res.json(productsManager.getProducts()) */
    }
})

app.get(`/products/:pid`, (req,res)=>{

    const productParams = parseInt(req.params.pid)
    const arrayProductos = productManager.getProducts()

    if(isNaN(productParams) || productParams>arrayProductos.lenght){
        res.json({error: "Fuera de los parametros"})
    }else{

        const productoFind = arrayProductos.find(prod => prod.id === productParams)
        if(productoFind!=undefined){
            res.json(productoFind)
        }

    }
})

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))