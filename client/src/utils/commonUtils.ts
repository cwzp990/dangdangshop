import { ElMessage, ElMessageBox } from 'element-plus'

type MessageType = '' | 'success' | 'warning' | 'info' | 'error'

export default class CompUtil {
  static confirm(
    message: string,
    title: string,
    confirmButtonText: string,
    cancelButtonText: string,
    type: MessageType,
  ) {
    return ElMessageBox.confirm(message, title, {
      confirmButtonText,
      cancelButtonText,
      type,
      distinguishCancelAndClose: true,
      center: true,
    })
  }

  static message = ElMessage
}
