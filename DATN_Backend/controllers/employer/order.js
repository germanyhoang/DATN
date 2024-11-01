import Order from "../../models/employer/order"
import moment from "moment/moment"
import crypto from 'crypto' 
import querystring from 'qs';
export const createOrder = async (req, res) => {
    try {
        const order = await new Order(req.body).save()
        res.status(200).json({
            order
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }).exec()
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được."
        })
    }
}

export const getOrdersByUId = async (req, res) => {
    const filter = { user_id: req.params.userId }
    try {
        const orders = await Order.find(filter).sort({ createdAt: -1 }).exec()
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được."
        })
    }
}

export const getOrder = async (req, res) => {
    const condition = { _id: req.params.id }
    try {
        const order = await Order.findOne(condition).populate('package_id').exec();
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy."
        })
    }
}

export const updateOrderStatus = async (req, res) => {
    const condition = { _id: req.params.id }
    try {
        const order = await Order.findOneAndUpdate(condition,{order_status : true},{new : true}).populate('package_id');
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy."
        })
    }
}
export const removeOrder = async (req, res) => {
    const condition = { _id: req.params.id }
    try {
        const order = await Order.findOneAndDelete(condition)
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({
            message: "Không xóa được."
        })
    }
}

export const checkoutOrder = async (req,res) => {
    try {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
    
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss')
    
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    
    let tmnCode = '39CNFFU6'
    let secretKey = 'VUAZJHEMFEHUGGBVQWMDVJSCUTJLJLGG'
    let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    let returnUrl = 'http://localhost:5173/home/vnpay-checkout';
    let orderId = req.body.orderId;
    let amount = req.body.amount; 
    let locale = 'vn';
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId + moment(date).format('YYYYMMDDHHmmss') ;
    vnp_Params['vnp_OrderInfo'] = orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
   

    vnp_Params = sortObject(vnp_Params);
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);    
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.json({
       vnpUrl
    })
    } catch (error) {
        console.log(error);
    }
}
export const queryCheckout = (req,res) => {
    try {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();

    let crypto = require("crypto");
    let vnp_TmnCode = '39CNFFU6'
    let secretKey = 'VUAZJHEMFEHUGGBVQWMDVJSCUTJLJLGG'
    let vnp_Api = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";
    
    let vnp_TxnRef = req.body.orderId;
    let vnp_TransactionDate = moment(date).format('YYYYMMDDHHmmss');
    
    let vnp_RequestId = moment(date).format('HHmmss');
    let vnp_Version = '2.1.0';
    let vnp_Command = 'querydr';
    let vnp_OrderInfo = 'Truy van GD ma:' + vnp_TxnRef;
    
    let vnp_IpAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    let data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TxnRef + "|" + vnp_TransactionDate + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;

    let hmac = crypto.createHmac("sha512", secretKey);
    let vnp_SecureHash = hmac.update(Buffer.from(data, 'utf-8')).digest("hex");
    
    let dataObj = {
        'vnp_RequestId': vnp_RequestId,
        'vnp_Version': vnp_Version,
        'vnp_Command': vnp_Command,
        'vnp_TmnCode': vnp_TmnCode,
        'vnp_TxnRef': vnp_TxnRef,
        'vnp_OrderInfo': vnp_OrderInfo,
        'vnp_TransactionDate': vnp_TransactionDate,
        'vnp_CreateDate': vnp_CreateDate,
        'vnp_IpAddr': vnp_IpAddr,
        'vnp_SecureHash': vnp_SecureHash
    };
    // /merchant_webapi/api/transaction

    } catch (error) {
        console.log(error);
    }

}
function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

export const getOrderUserId = async (req, res) => {
    // lấy id sản phẩm được truyền lên
    const condition = { user_id : req.params.id};
    try {
        const orders = await Order.find(condition);
        res.json(orders)
    } catch (error) {
        res.status(400).json({
            message: "Không thể nhận được đơn đặt hàng"
        })
    }
}