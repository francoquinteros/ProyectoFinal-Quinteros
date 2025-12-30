// src/firebase/firestore.js
import { serverTimestamp } from "firebase/firestore";

/**
 * MODO SIN BILLING:
 * - Si no se puede habilitar Firestore, usamos mock data local.
 * - La app sigue cumpliendo Router, Context, ItemCount, checkout y orden.
 */

const MOCK_PRODUCTS = [
  {
    id: "p1",
    title: "Teclado Mecánico",
    description: "Switch rojo, RGB, layout español.",
    price: 45000,
    stock: 8,
    category: "teclados",
    image: "",
  },
  {
    id: "p2",
    title: "Mouse Gamer",
    description: "16000 DPI, 6 botones programables.",
    price: 25000,
    stock: 12,
    category: "mouses",
    image: "",
  },
  {
    id: "p3",
    title: "Auriculares",
    description: "Sonido envolvente, micrófono.",
    price: 30000,
    stock: 0,
    category: "auriculares",
    image: "",
  },
];

export async function getProducts(categoryId) {
  // simulamos demora
  await new Promise((r) => setTimeout(r, 400));
  return categoryId
    ? MOCK_PRODUCTS.filter((p) => p.category === categoryId)
    : MOCK_PRODUCTS;
}

export async function getProductById(itemId) {
  await new Promise((r) => setTimeout(r, 250));
  return MOCK_PRODUCTS.find((p) => p.id === itemId) || null;
}

export async function createOrder({ buyer, items, total }) {
  await new Promise((r) => setTimeout(r, 400));
  // generamos un id "tipo Firestore"
  const fakeId = `MOCK-${Math.random().toString(16).slice(2, 10).toUpperCase()}`;
  // (opcional) podrías guardar en localStorage:
  const order = { buyer, items, total, createdAt: serverTimestamp(), id: fakeId };
  localStorage.setItem("lastOrder", JSON.stringify(order));
  return fakeId;
}

