import { Router } from "express";
import { addVoucher, editVoucher, getVoucher, getVouchers, removeVoucher, searchVoucher } from "../../controllers/admin/admin_voucher";

const router = Router()

router.get('/vouchers', getVouchers)
router.get('/vouchers/:id', getVoucher)
router.post('/vouchers', addVoucher)
router.put('/vouchers/:id', editVoucher)
router.delete('/vouchers/:id', removeVoucher)
router.post('/search', searchVoucher)

export default router