import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  subtotal: 0,
  itemCount: 0
});

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("mm_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("mm_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (menuItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.menu_item_id === menuItem.id);
      if (existing) {
        return prev.map(i => 
          i.menu_item_id === menuItem.id 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
      }
      return [...prev, { 
        menu_item_id: menuItem.id, 
        name: menuItem.name, 
        price: menuItem.price, 
        quantity: 1 
      }];
    });
  };

  const removeItem = (menuItemId) => {
    setItems(prev => prev.filter(i => i.menu_item_id !== menuItemId));
  };

  const updateQuantity = (menuItemId, quantity) => {
    if (quantity <= 0) {
      removeItem(menuItemId);
      return;
    }
    setItems(prev => prev.map(i => 
      i.menu_item_id === menuItemId ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}