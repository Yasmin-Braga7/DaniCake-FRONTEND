// src/contexts/CartContext.tsx
import { Produto } from '@/src/interfaces/produtos/request';
import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface CartItem extends Produto {
  quantity: number;
  imagemSource?: any;
}

interface CartContextData {
  cartItems: CartItem[];
  addToCart: (product: Produto, imagemSource: any) => void;
  removeFromCart: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  totalValue: number;
  cartCount: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Produto, imagemSource: any) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);

      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prevItems, { ...product, quantity: 1, imagemSource }];
    });
  };

  const incrementQuantity = (productId: number) => {
    setCartItems((prev) => 
      prev.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)
    );
  };

  const decrementQuantity = (productId: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find(item => item.id === productId);
      
      // Se tiver apenas 1 e diminuir, remove do carrinho (ou você pode travar em 1)
      if (existingItem && existingItem.quantity === 1) {
        return prev.filter(item => item.id !== productId);
      }

      return prev.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalValue = cartItems.reduce((acc, item) => acc + (item.preco * item.quantity), 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      incrementQuantity, 
      decrementQuantity,
      totalValue, 
      cartCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}