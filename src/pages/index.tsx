import { lazy } from 'react';

const OrdersPage = lazy(() => import('./OrdersPage'));
const OrderDetailPage = lazy(() => import('./OrderDetailPage'));
const NotFound = lazy(() => import('./NotFound'));
const Error = lazy(() => import('./Error'));

export { Error, NotFound, OrderDetailPage, OrdersPage };
