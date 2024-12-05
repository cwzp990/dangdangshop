import { OrderInfo } from '../stores/types'
import request from '../utils/axiosUtil'

class OrderAPI {
  static orderAPI: OrderAPI = new OrderAPI()

  submitOrder(orderInfo: OrderInfo) {
    return request.post('/ordermodule/submitorder', false, orderInfo)
  }

  findOrderByUserId(userId: number) {
    return request.get(`/ordermodule/findorderbyuserid/${userId}`, false)
  }

  updateOrderStatusByOrderId(orderId: number) {
    return request.put('/ordermodule/updateorderstatusbyorderid', false, { orderId })
  }
}

export default OrderAPI.orderAPI
