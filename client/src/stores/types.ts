export interface UserInfo {
    userid: number
    username: string
    password: string
    address?: string
    valid: number
    age?: number
    birth?: string
    token?: string
  }
  
export interface ShopCartInfo {
    shopcartid?: number
    bookisbn: string
    bookname: string
    bookpicname: string
    bookprice: number
    userid: number
    purchasenum: number
    checked: boolean
  }

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