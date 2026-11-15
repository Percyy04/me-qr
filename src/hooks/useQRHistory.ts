import { useState, useEffect } from 'react';
import { QRHistoryItem, QRDesign, QRType } from '../types/qr.types';

const STORAGE_KEY = 'me_qr_local_history_v1';
const MAX_ITEMS = 20;

export function useQRHistory() {
  const [history, setHistory] = useState<QRHistoryItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [history]);

  const addHistoryItem = (
    type: QRType,
    title: string,
    payload: string,
    thumbnail: string,
    design: QRDesign
  ) => {
    const newItem: QRHistoryItem = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      type,
      title: title || payload.slice(0, 30),
      payload,
      timestamp: Date.now(),
      thumbnail,
      design,
    };

    setHistory((prev) => [newItem, ...prev.filter((i) => i.payload !== payload)].slice(0, MAX_ITEMS));
  };

  const removeHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((i) => i.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addHistoryItem,
    removeHistoryItem,
    clearHistory,
  };
}

