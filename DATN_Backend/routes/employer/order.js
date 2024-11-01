import { Router } from 'express'
import {
    createOrder,
    getOrder,
    getOrders,
    getOrdersByUId,
    removeOrder,
    checkoutOrder,
    updateOrderStatus,
    getOrderUserId,
    queryCheckout
} from '../../controllers/employer/order';

const router = new Router();

router.get('/orders/:userId/list', getOrdersByUId)
router.get('/orders/', getOrders)
router.get('/orders/:id/', getOrder)
router.post('/orders', createOrder)
router.delete('/orders/:id', removeOrder)
router.post('/order-checkout',checkoutOrder)
router.put('/order/:id',updateOrderStatus)
router.get('/orders-user/:id',getOrderUserId)
router.get('/checkout-transaction',queryCheckout)
export default router