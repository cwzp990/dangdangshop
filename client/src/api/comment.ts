import request from '../utils/axiosUtil'

class CommentAPI {
  static commentAPI: CommentAPI = new CommentAPI()

  findCommentList(isbn: string) {
    return request.get(`/commentmodule/findCommentList/${isbn}`, false)
  }
}

export default CommentAPI.commentAPI
