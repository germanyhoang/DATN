interface IOrder {
    _id: string,
    order_price: number,
    order_name: string,
    order_status: boolean,
    order_count: number,
    order_code: string,
    user_id: string,
    package_id: string
}

export default IOrder