import { createContext, useMemo, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // [{id,title,price,stock,category,image,quantity}]

  const isInCart = (id) => cart.some((p) => p.id === id);

  const addItem = (item, quantity) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);

  const totalUnits = useMemo(
    () => cart.reduce((acc, p) => acc + p.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((acc, p) => acc + p.quantity * Number(p.price || 0), 0),
    [cart]
  );

  const value = {
    cart,
    addItem,
    removeItem,
    clearCart,
    totalUnits,
    totalPrice,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
