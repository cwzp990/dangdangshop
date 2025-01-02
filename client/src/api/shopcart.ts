import request from '../utils/axiosUtil'
import type { ShopCartInfo } from '../stores/shopcart'

class ShopCartAPI {
  static shopCartAPI: ShopCartAPI = new ShopCartAPI()

  getShopCartList(userid: number) {
    return request.get(`/shopcartmodule/findCurUsrShopCartList/${userid}`, false)
  }

  addBookToShopCart(shopCart: ShopCartInfo) {
    return request.post('/shopcartmodule/addBookToShopCart', false, shopCart)
  }

  updateShopCart(shopCart: ShopCartInfo) {
    return request.put('/shopcartmodule/updateShopCart', false, shopCart)
  }

  deleteShopCart(shopCartId: number) {
    return request.delete(`/shopcartmodule/deleteShopCart/${shopCartId}`, false)
  }
}

export default ShopCartAPI.shopCartAPI
