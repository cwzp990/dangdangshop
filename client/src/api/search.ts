import request from '../utils/axiosUtil'

class SearchAPI {
  static searchAPI: SearchAPI = new SearchAPI()

  // get added hkwid(primary key)
  addSearchHistory(historyKeyword: string) {
    return request.post('/searchmodule/addHistoryKeyword', false, { historyKeyword })
  }

  // update search historyList => get affected rows
  updateSearchHistory(historyKeyword: string) {
    return request.put('/searchmodule/updateHistoryKeyword', false, { historyKeyword })
  }

  // get search keyword list
  getSearchKeywords(keyword: string) {
    return request.get(`/searchmodule/searchKeywords/${keyword}`, false)
  }

  // get history keyword list
  getHistoryKeywords() {
    return request.get('/searchmodule/searchHistoryKeywords', false)
  }

  // get history keyword list order by clickcount desc
  getHistoryKeywordsDesc() {
    return request.get('/searchmodule/searchHistoryKeywordsDesc', false)
  }

  // delete history keywords
  delSearchHistory() {
    return request.delete('/searchmodule/delHistoryKeywords', false)
  }
}

export default SearchAPI.searchAPI
