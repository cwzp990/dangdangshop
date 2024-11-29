import request from '@/utils/axiosUtil'

class BookAPI {
  static bookAPI: BookAPI = new BookAPI()
  getBookListByThirdCtgyId(thirdCtgyId: number, sortField: string, sortType: string) {
    return request.get(`/bookmodule/findBooksByThirdctgyId/${thirdCtgyId}/${sortField}/${sortType}`, false)
  }

  getAllBookList(secondCtgyId: number) {
    return request.get(`/bookmodule/findAllBooksBySecondCtgyId/${secondCtgyId}`, false)
  }

  getBooksByAutoCompKeyword(autoCompKeyword: string) {
    return request.get(`/bookmodule/findBooksByAutoCompKeyword/${autoCompKeyword}`, false)
  }

  findPublishersByAutoCompKeyword(autoCompKeyword: string) {
    return request.get(`/bookmodule/findPublishersByAutoCompKeyword/${autoCompKeyword}`, false)
  }

  findBooksByPublisherIds(publisherIds: number[]) {
    return request.post('/bookmodule/findBooksByPublisherIds', false, publisherIds)
  }

  findBooksByISBN(isbn: string) {
    return request.get(`/bookmodule/findBooksByISBN/${isbn}`, false)
  }

  findBooksWithPager(currentPageNo: number) {
    return request.get(`/bookmodule/findBooksByPager/${currentPageNo}`, false)
  }
}

export default BookAPI.bookAPI
