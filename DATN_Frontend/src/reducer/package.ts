import actionTypes from "../app/actions/actionTypes";
import CartState from "../interface/cartState";
const initState: { data: CartState[] } = {
    data: []
}

const cartReducer = (state = initState.data, action: any) => {
    const nusQuantity = (pack: any) => {
        return { ...pack, orderCount: pack.orderCount += 1 };
    };

    const minusQuantity = (pack: any) => {
        return { ...pack, orderCount: pack.orderCount -= 1 };
    };

    switch (action.type) {
        case actionTypes.SET_CART:
            const product = state.find((pack: any) => pack.product._id == action.pack._id)
            if (product) {
                nusQuantity(product)
                return [
                    ...state
                ]
            } else {
                return [
                    ...state,
                    {
                        key: action.pack._id,
                        product: action.pack,
                        orderCount: 1,
                    }
                ]
            }

        case actionTypes.NUS_PRODUCT_CART:
            const pack = state.find((pack: any) => pack.product._id == action.id)
            if (pack) {
                nusQuantity(pack)
                return [
                    ...state
                ]
            }

        case actionTypes.MINUS_PRODUCT_CART:
            const pack2 = state.find((pack: any) => pack.product._id == action.id)
            if (pack2) {
                minusQuantity(pack2)
                return [
                    ...state
                ]
            }

        case actionTypes.REMOVE_PRODUCT_CART:
            return state.filter((item: any) => item.product._id !== action.id)

        default:
            return state;
    }
}

export default cartReducer