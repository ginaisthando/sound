'use client';

import { useState, useCallback, useEffect } from 'react';
import { SoundPack } from '@/lib/utils';

interface CartItem extends SoundPack {
  quantity: number;
}

interface UseCartReturn {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (pack: SoundPack) => void;
  removeItem: (packId: string) => void;
  updateQuantity: (packId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (packId: string) => boolean;
}

const CART_STORAGE_KEY = 'soundbite-cart';

export function useCart(): UseCartReturn {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const addItem = useCallback((pack: SoundPack) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === pack.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        return currentItems.map(item =>
          item.id === pack.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        return [...currentItems, { ...pack, quantity: 1 }];
      }
    });
  }, []);

  const removeItem = useCallback((packId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== packId));
  }, []);

  const updateQuantity = useCallback((packId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(packId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === packId
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback((packId: string) => {
    return items.some(item => item.id === packId);
  }, [items]);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return {
    items,
    itemCount,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
  };
}
