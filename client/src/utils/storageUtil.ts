import storage from 'store'
import { isPlainObject, isString } from './generalUtil'

type ElOfArr<T extends unknown[]> = T extends (infer U)[] ? U : never

export function getValArrOfObj<T extends any[], K extends keyof ElOfArr<T>>(arr: T, key: K) {
  return arr.map((item: ElOfArr<T>) => item[key])
}

export enum OPTION {
  NONE = -1,
  ACCUMULATE = 0,
  ADDORAPPEND = 1,
  ARRAY = 2,
}

enum Operate {
  INIT = 0,
  THIRDCTGYID = 1,
  AUTOCOMPKEYWORD = 2,
}

class Storage {
  static storage: Storage = new Storage()

  set(key: string, value: string): any
  set(key: string, value: object): any
  set(key: string, value: any[]): any
  set(key: string, value: Operate): any
  set(key: string, value: any[], option: OPTION): any
  set(key: string, value: string, option: OPTION): any
  set(key: string, value: object, option: OPTION, propKey: string, propValue: any): any
  set(key: string, value: any, option: OPTION = OPTION.NONE, propKey = '', propValue?: any) {
    const arr: any[] = storage.get(key, [])
    if (isPlainObject(value) && option === OPTION.ADDORAPPEND) {
      const keyValsOfObj = getValArrOfObj(arr, propKey)
      const index = keyValsOfObj.indexOf(propValue) // the index of propValue in keyArrOfObj is the same as the index of value in arr
      if (propKey && propValue) {
        if (!keyValsOfObj.includes(propValue))
          arr.push(value)
        else
          index !== -1 && arr.splice(index, 1, value)
        storage.set(key, arr)
        return arr
      }
    }
    else if (option === OPTION.ACCUMULATE) {
      Array.isArray(value) && arr.push(...value)
      if (isString(value) && !arr.includes(value))
        arr.push(value)
      storage.set(key, arr)
      return arr
    }
    storage.set(key, value)
    return value
  }

  remove(key: string): any
  remove(key: string, option: OPTION, propKey: string, propValue: any): any
  remove(key: string, option: OPTION = OPTION.NONE, propKey = '', propValue?: any) {
    if (option === OPTION.ADDORAPPEND) { // remove one and reset
      const arr: any[] = storage.get(key, [])
      const keyValsOfObj = getValArrOfObj(arr, propKey)
      const index = keyValsOfObj.indexOf(propValue)
      if (propKey && propValue) {
        index !== -1 && arr.splice(index, 1)
        storage.set(key, arr)
        return arr
      }
    }
    else {
      storage.remove(key) // remove all
    }
  }

  get<T = any>(key: string): T
  get<T = any>(key: string, option: OPTION): T
  get(key: string, option: OPTION = OPTION.NONE) {
    if (option === OPTION.ACCUMULATE || option === OPTION.ARRAY || option === OPTION.ADDORAPPEND)
      return storage.get(key, [])
    else return storage.get(key)
  }
}

export default Storage.storage
