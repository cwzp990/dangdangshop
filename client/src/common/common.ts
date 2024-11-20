import { ref } from 'vue'

export const activeIndex = ref<number>(0)

export function setActiveIndex(index: number) {
  activeIndex.value = index
}
