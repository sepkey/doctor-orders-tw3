import { lazy } from 'react';

const OrdersPage = lazy(() => import('./orders-page'));
const OrderDetailPage = lazy(() => import('./order-detail-page'));
const NotFound = lazy(() => import('./not-found'));
const Error = lazy(() => import('./error'));

export { Error, NotFound, OrderDetailPage, OrdersPage };
