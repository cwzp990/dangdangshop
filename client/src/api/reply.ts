import request from '@/utils/axiosUtil'
import type { Reply } from '@/stores/comment'

class ReplyAPI {
  static replyAPI: ReplyAPI = new ReplyAPI()

  addReply(reply: Reply) {
    return request.post('/replymodule/addReply', false, reply)
  }
}

export default ReplyAPI.replyAPI
