import goodStorage from 'good-storage'

export class ImgUtil {
  static imgList: Record<string, string> = {}

  static init() {
    this.imgList = goodStorage.get('imgList', {})
    if (this.isEmpty()) {
      this.loadAllImg()
      goodStorage.set('imgList', this.imgList)
    }
  }

  static isEmpty() {
    return Object.keys(this.imgList).length === 0
  }

  static loadAllImg() {
    const imgMap = import.meta.glob('../assets/imgs/**/*.png', { eager: true })
    let absolutePath = ''
    let imgName = ''
    Object.keys(imgMap).forEach((relativePath) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      absolutePath = (imgMap[relativePath] as any).default
      imgName = absolutePath.substring(absolutePath.lastIndexOf('/') + 1)
      this.imgList[imgName] = absolutePath
    })
  }
}
