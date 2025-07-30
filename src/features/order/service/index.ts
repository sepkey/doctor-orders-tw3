import type { Order } from '../type';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getOrders() {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) {
    throw new Error('دریافت نسخه ها با خطا مواجه شد.');
  }
  const data = await res.json();
  return data as Order[];
}

export async function getOrderById(id: string) {
  const res = await fetch(`${API_BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error('دریافت نسخه با خطا مواجه شد.');
  }
  const data = await res.json();
  return data as Order;
}

export async function createOrder(orderData: Partial<Order>) {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    throw new Error('ایجاد نسخه با خطا مواجه شد.');
  }

  return res.json();
}

export async function deleteOrder(id: string) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('حذف نسخه با خطا مواجه شد.');
  }

  return true;
}

export async function updateOrderType(
  id: string,
  orderType: 'duringOrder' | 'outOfOrder'
) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type: orderType }),
  });

  if (!res.ok) {
    throw new Error('به‌روزرسانی نوع نسخه با خطا مواجه شد.');
  }
  return res.json();
}
