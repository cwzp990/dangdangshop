import { defineStore } from 'pinia'
import storage from '@/utils/storageUtil'
import BookAPI from '@/api/book'

export interface BookInfo {
  ISBN: string
  bookname: string
  author: string
  publishid: number
  publishername: string
  monthsalecount: number
  bookpicname: string
  purchasenum: number
  secondctgyId: number
  thirdctgyId: number
  originalprice: number
  discount: number
  discountprice: number
}
export type Publihser = Pick<BookInfo, 'publishid' | 'publishername'>

export enum Operate {
  INIT = 0,
  THIRDCTGYID = 1,
  AUTOCOMPKEYWORD = 2,
}

export interface CurrentPageData {
  currentPageNo: number
  currentPageDataList: BookInfo[]
  totalPageNum: number
}

export interface BookState {
  bookList: BookInfo[]
  operate?: Operate
  publishers: Publihser[]
  bookDetail: BookInfo
  bookISBN: string
  currentPageData: CurrentPageData
  headerRef: HTMLElement | undefined
  headerOpacity: { opacity: number }
  headerHeight: number
}

// const searchStore = useSearchStore()

function toFixed(num: number, digit: number) {
  return Number(num.toFixed(digit))
}
function isEmptyObj(obj: any) {
  return Object.keys(obj).length === 0
}

export const useBookStore = defineStore('book-store', {
  state: (): BookState => ({
    bookList: [],
    operate: Operate.INIT,
    publishers: [],
    bookDetail: {} as BookInfo,
    bookISBN: '',

    currentPageData: {
      currentPageNo: 0,
      currentPageDataList: [],
      totalPageNum: 0,
    },

    headerRef: undefined,
    headerOpacity: {
      opacity: 1,
    },
    headerHeight: 0,
  }),
  getters: {
    getAutoCompKeyword: () => {
    //   return searchStore.getAutoCompKeyword // books view is driven by related search keyword
    },

    getBookList: (state): BookInfo[] => {
      return state.bookList.length > 0 ? state.bookList : storage.get('bookList')
    },

    getOperate: (state): Operate => {
      return state.operate || storage.get('operate')
    },

    getBookDetail: (state): BookInfo => {
      return isEmptyObj(state.bookDetail) ? storage.get('bookDetail') : state.bookDetail
    },
    getBookISBN: (state): string => {
      return state.bookISBN || storage.get('bookISBN')
    },
    isLastPage: (state): boolean => {
      return state.currentPageData.currentPageNo === state.currentPageData.totalPageNum
    },
    getCurrentPageDataList: (state): BookInfo[] => {
      return state.currentPageData.currentPageDataList
    },
  },
  actions: {
    storeBookISBN(isbn: string) {
      this.bookISBN = isbn
      storage.set('bookISBN', isbn)
    },
    storeOperate(operate: Operate) {
      this.operate = operate
      storage.set('operate', this.operate)
    },
    async findBookList(thirdCtgyId: number, sortField: string, sortType: string) {
      const bookList = await BookAPI.getBookListByThirdCtgyId(thirdCtgyId, sortField, sortType)
      bookList.data = bookList.data.map((book: BookInfo) => {
        book.discountprice = toFixed(book.discountprice, 2)
        return book
      })
      this.bookList = bookList.data
      storage.set('bookList', bookList.data)
    },
    async findBookListBySecondCtgyId(secondCtgyId: number) {
      const bookList = await BookAPI.getAllBookList(secondCtgyId)
      this.bookList = bookList.data
      storage.set('bookList', bookList.data)
    },
    async findBookListByAutoCompKeyword(autoCompKeyword: string) {
      const bookList = await BookAPI.getBooksByAutoCompKeyword(autoCompKeyword)
      this.bookList = bookList.data
      storage.set('bookList', bookList.data)
    },
    async findPublishersByAutoCompKeyword(autoCompKeyword: string) {
      const publishers = await BookAPI.findPublishersByAutoCompKeyword(autoCompKeyword)
      this.publishers = publishers.data
    },
    async findBooksByPublisherIds(publishIds: number[]) {
      const bookList = await BookAPI.findBooksByPublisherIds(publishIds)
      this.bookList = bookList.data
      storage.set('bookList', bookList.data)
    },
    async findBooksByISBN() {
      const bookDetail = await BookAPI.findBooksByISBN(this.getBookISBN)
      this.bookDetail = bookDetail.data
      storage.set('bookDetail', this.bookDetail)
    },
    async findBooksWithPager() {
      if (
        !this.currentPageData.currentPageNo // initial request
          || this.currentPageData.currentPageNo < this.currentPageData.totalPageNum
      ) {
        this.currentPageData.currentPageNo += 1
        const currentPageData = await BookAPI.findBooksWithPager(this.currentPageData.currentPageNo)
        if (this.currentPageData.currentPageDataList.length === 0) {
          this.currentPageData = currentPageData.data // directly overwrite
        }
        else { // append
          const { currentPageNo, totalPageNum } = currentPageData.data
          this.currentPageData.currentPageDataList.push(...currentPageData.data.currentPageDataList)
          Object.assign(this.currentPageData, { currentPageNo, totalPageNum })
        }
      }
    },
  },
})
