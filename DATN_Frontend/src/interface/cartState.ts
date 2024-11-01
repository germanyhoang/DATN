import IAdPackage from "./admin/package";

interface CartState {
    key: string,
    product: IAdPackage,
    orderCount: number
}

export default CartState