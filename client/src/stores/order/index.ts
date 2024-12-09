import { defineStore } from 'pinia'
import { countDownConvert, getFormattedDate } from '@/utils/generalUtil'
import storage, { OPTION } from '@/utils/storageUtil'

import orderAPI from '../../api/order'
import { ShopCartInfo, UserInfo } from '../types'


export interface OrderInfo {
  orderid?: number
  ordertime: string
  customerid: number
  orderstatus: number
  orderDetailList?: OrderDetail[]

  strOrderStatus?: string // switch status
  countDownTime?: string // show order countdown
  orderEndTime?: number
  countDownFn?: NodeJS.Timer // countdown execution fn
}

export interface OrderDetail {
  orderdetailid?: number
  orderid?: number
  bookname: string
  bookpicname: string
  bookprice: number
  purchasenum: number
  shopcartid?: number
}

export interface OrderStoreState {
  orderInfo: OrderInfo
  orderInfoList: OrderInfo[]
  subOrderInfoList: OrderInfo[]

  orderStatus: number
}

function isEmptyObj(obj: any) {
  return Object.keys(obj).length === 0
}

export function orderStatusTrans(orderInfoList: OrderInfo[]) {
  return orderInfoList.map((orderInfo) => {
    switch (orderInfo.orderstatus) {
      case 1:
        orderInfo.strOrderStatus = '等待付款'
        break
      case 2:
        orderInfo.strOrderStatus = '交易成功'
        break
      case 3:
        orderInfo.strOrderStatus = '待评价'
        break
      case -1:
        orderInfo.strOrderStatus = '订单已取消'
        break
    }
    return orderInfo
  })
}

export function getRestTime(orderInfo: OrderInfo) {
  const restTime = orderInfo.orderEndTime! - new Date().getTime()
  const restSec = Math.floor(restTime / 1000)

  return { restTime, restSec } as const
}

export function setCountDownTime(orderInfo: OrderInfo) {
  const { restSec, restTime } = getRestTime(orderInfo)
  if (restSec > 0)
    orderInfo.countDownTime = countDownConvert(restTime)
}
export function setOrderTime(orderInfoList: OrderInfo[]) {
  return orderInfoList.map((orderInfo) => {
    if (orderInfo.orderstatus === 1)
      orderInfo.orderEndTime = new Date(orderInfo.ordertime).getTime() + 1000 * 60 * 1 // end after 1 minutes
    setCountDownTime(orderInfo)
    return orderInfo
  })
}

export const useOrderStore = defineStore('order-store', {
  state: (): OrderStoreState => ({
    orderStatus: 0,

    orderInfo: {} as OrderInfo,
    orderInfoList: [],
    subOrderInfoList: [],
  }),
  getters: {
    getOrderInfo(state: any) {
      return isEmptyObj(state.orderInfo) ? storage.get<OrderInfo>('orderInfo') : state.orderInfo
    },
    getOrderInfoList(state: any) {
      return state.orderInfoList.length ? state.orderInfoList : storage.get<OrderInfo[]>('orderInfoList', OPTION.ARRAY)
    },
  },
  actions: {
    async submitOrder() {
      const customerid = storage.get<UserInfo>('loginUser').userid
      // 1. create a reasonable orderInfo
      const order: OrderInfo = {
        ordertime: getFormattedDate('-'),
        orderstatus: 1, // the status of new added order is generally 1
        customerid,
      }
      // 2. create a reasonable orderDetailList
      const checkedShopCartList = storage.get<ShopCartInfo[]>('checkedShopCartList', OPTION.ARRAY)
      const orderDetailList = checkedShopCartList.map((item) => {
        const { bookname, bookpicname, bookprice, purchasenum, shopcartid } = item
        return {
          bookname,
          bookpicname,
          bookprice,
          purchasenum,
          shopcartid,
        }
      })
      // 3. merge orderInfo and orderDetail
      order.orderDetailList = orderDetailList
      // 4. call orderAPI.submitOrder
      const responseOrderData = await orderAPI.submitOrder(order)
      // 5. preserve the response data to store and client storage
      this.orderInfo = responseOrderData.data
      storage.set('orderInfo', this.orderInfo)
    },

    async findOrderByUserId() {
      const userId = storage.get<UserInfo>('loginUser').userid
      const ordersResponse = await orderAPI.findOrderByUserId(userId)
      this.orderInfoList = setOrderTime(orderStatusTrans(ordersResponse.data))
      storage.set('orderInfoList', this.orderInfoList)
    },

    async updateOrderStatusByOrderId(orderId: number) {
      await orderAPI.updateOrderStatusByOrderId(orderId)
    },
  },
})
