import { defineStore } from 'pinia'
import storage from 'store'
import { initialCtgyState } from './state'
import type { FirstCtgy, SecondCtgy, ThirdCtgy } from './state'
import ctgyAPI from '../../api/ctgy'

function isEmptyObject(obj: object) {
  return Object.keys(obj).length === 0
}

export const useCtgyStore = defineStore('ctgy-store', {
  state: () => initialCtgyState,
  getters: {
    getFirstCtgyList: state => state.firstCtgyList,
    getSecThrdCtgyList: state => state.secondCtgyList,
    getThirdCtgy: (state): ThirdCtgy => {
      return isEmptyObject(state.thirdCtgy) ? storage.get('thirdctgy') : state.thirdCtgy
    },
    getFirstCtgy: (state): FirstCtgy => {
      return isEmptyObject(state.firstCtgy) ? storage.get('firstctgy') : state.firstCtgy
    },
    getSecondCtgy: (state): SecondCtgy => {
      return isEmptyObject(state.secondCtgy) ? storage.get('secondctgy') : state.secondCtgy
    },
    getThirdCtgyList: (state): ThirdCtgy[] => {
      return isEmptyObject(state.thirdCtgyList) ? storage.get('thirdctgylist') : state.thirdCtgyList
    },
    getSubThirdCtgyList: (state): ThirdCtgy[] => {
      return isEmptyObject(state.subThirdCtgyList) ? storage.get('subthirdctgylist') : state.subThirdCtgyList
    },
  },
  actions: {
    storeThirdCtgy(thirdCtgy: ThirdCtgy) {
      storage.set('thirdctgy', thirdCtgy)
      this.thirdCtgy = thirdCtgy
    },
    storeFirstCtgy(firstCtgy: FirstCtgy) {
      storage.set('firstctgy', firstCtgy)
      this.firstCtgy = firstCtgy
    },
    storeSecondCtgy(secondCtgy: SecondCtgy) {
      storage.set('secondctgy', secondCtgy)
      this.secondCtgy = secondCtgy
    },
    storeThirdCtgyList(thirdCtgyList: ThirdCtgy[]) {
      storage.set('thirdctgylist', thirdCtgyList)
      this.thirdCtgyList = thirdCtgyList
    },
    storeSubThirdCtgyList(subThirdCtgyList: ThirdCtgy[]) {
      storage.set('subthirdctgylist', subThirdCtgyList)
      this.subThirdCtgyList = subThirdCtgyList
    },
    async findFirstCtgyList() {
      const ret = await ctgyAPI.getFirstCtgyList()
      this.firstCtgyList = ret.data
    },
    async findSecThrdCtgyList(firstCtgyId: number) {
      const ret = await ctgyAPI.getSecThrdCtgyList(firstCtgyId)
      ret.data = ret.data.map((secondctgy: SecondCtgy) => {
        secondctgy.isSpreadCtgys = false
        secondctgy.subThirdCtgys = secondctgy.thirdctgys.slice(0, 5)
        return secondctgy
      })
      this.secondCtgyList = ret.data
    },
  },
})
