import { UserInfo } from '../stores/types'
import request from '../utils/axiosUtil'

class UserAPI {
  static userAPI: UserAPI = new UserAPI()

  login(userinfo: UserInfo) {
    return request.post('/usermodule/login', false, userinfo)
  }
}

export default UserAPI.userAPI
