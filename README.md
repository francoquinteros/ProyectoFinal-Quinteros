# Proyecto Final - E-commerce (React + Firebase)

Single Page Application (SPA) de e-commerce desarrollada con **React + Vite**.
Cumple con los requisitos del proyecto final: **React Router**, **Context API** para carrito, **Firestore** para productos y órdenes, y **renderizado condicional** para loaders y estados vacíos.

## Funcionalidades
- Catálogo de productos (listado dinámico desde Firestore)
- Filtrado por categorías (`/category/:categoryId`)
- Detalle de producto (`/item/:itemId`)
- `ItemCount` con validaciones (mínimo 1, máximo stock)
- Carrito global con Context (totales, subtotales, eliminar, vaciar)
- Checkout con formulario y generación de orden en Firestore
- Mensajes condicionales: loading, sin stock, carrito vacío
- Muestra el **ID de la orden** generada al finalizar compra

## Requisitos / Estructura de componentes (sugerida por el curso)
- App
  - NavBar
    - CartWidget
  - ItemListContainer (page)
    - ItemList
      - Item
  - ItemDetailContainer (page)
    - ItemDetail
      - ItemCount
  - Cart (page)
    - CartItem
  - CheckoutForm (page)

## Instalación
1. Descargar/Clonar el repo.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear `.env` desde `.env.example` y completar credenciales.
4. Levantar en modo desarrollo:
   ```bash
   npm run dev
   ```

> Importante: **no uses Live Server** (127.0.0.1:5500). Este proyecto corre con **Vite**, y te va a mostrar una URL tipo `http://localhost:5173`.

## Firebase / Firestore
### Colecciones esperadas
- `products` (productos)
  - Campos recomendados:
    - `title` (string)
    - `description` (string)
    - `price` (number)
    - `stock` (number)
    - `category` (string) ejemplo: `"teclados"`, `"mouses"`, `"auriculares"`
    - `image` (string URL opcional)

- `orders` (órdenes)
  - Se genera automáticamente al confirmar compra.
  - Guarda: comprador, items, total, fecha (serverTimestamp).

### Ejemplo documento products
```json
{
  "title": "Teclado Mecánico",
  "description": "Switches rojos, RGB, español.",
  "price": 45000,
  "stock": 8,
  "category": "teclados",
  "image": "https://..."
}
```

## Deploy (opcional)
Podés deployar en Vercel o Netlify.

## Autor
Quinteros
