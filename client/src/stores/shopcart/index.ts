
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

export interface ShopCartState {
  shopCartList: ShopCartInfo[]
  checkedShopCartList: ShopCartInfo[]
  subCheckedShopCartList: ShopCartInfo[]
}

