import { ref, computed, watch, readonly } from 'vue'
import type { ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import Utils from '@/Utils/Utils';


//#region 类型定义
export type HistoryKey = 'today' | 'yesterday' | 'thisWeek' | 'more'; // 合法的键名类型
export type HistoryItem = {
  title: string;
  boolean: ComputedRef<any> | any;
  list: any[]; // 根据实际情况替换 any
};
export type ChatContentItem = {
  role: string;
  reasoning?: string;
  content?: string;
};
//#endregion

export const UseHistoryStore = defineStore('History', () => {
  //#region 侧边栏数据
  const historyList = ref<Record<HistoryKey, HistoryItem>>({
    today: {
      title: '今天',
      boolean: computed((): boolean => historyList.value.today.list.length > 0),
      list: []
    },
    yesterday: {
      title: '昨天',
      boolean: computed((): boolean => historyList.value.yesterday.list.length > 0),
      list: []
    },
    thisWeek: {
      title: '本周',
      boolean: computed((): boolean => historyList.value.thisWeek.list.length > 0),
      list: [],
    },
    more: {
      title: '更多',
      boolean: computed((): boolean => historyList.value.more.list.length > 0),
      list: []
    }
  })
  // 索引
  const historyIndex = ref('')
  // 交流状态
  const isChat = ref(false)
  //#endregion

  //#region 读取侧边栏数据函数
  const getHistoryList = () => {
    return historyList.value
  }
  const getHistoryIndex = () => {
    return historyIndex.value
  }
  //#endregion

  //#region 修改侧边栏数据函数
  /**
   * 调用该函数修改侧边栏数据
   * @param type 修改类型
   *  - add: 为today中首位添加数据 |  发送框创建新的聊天
   *  - newCount: 为数据中对应索引的content部分添加数据 
   *  - reasoning: 为数据中对应索引的content部分中每个role为deepseek的数据添加内容
   *  - fill: 为数据中对应索引的content部分最后一个数据添加内容
   *  - delete: 删除数据 |  删除会话
   * @param data 修改的数据
   * @param index 修改的索引
   */
  const setHistoryList = (type: String, index: string, data?: any) => {
    const Index = index.split('-')
    switch (type) {
      case 'add':
        if (Index[0]) {
          historyList.value[Index[0] as HistoryKey].list.unshift(data)
        }
        break
      case 'newData':
        if (data.id) {
          historyList.value[Index[0] as HistoryKey].list[Number(Index[1])].id = data.id
        }
        if (data.title) {
          historyList.value[Index[0] as HistoryKey].list[Number(Index[1])].title = data.title
        }
        if (data.date) {
          historyList.value[Index[0] as HistoryKey].list[Number(Index[1])].date = data.date.split('T')[0]
        }
        break
      case 'newCount':
        if (Array.isArray(data)) {
          historyList.value[Index[0] as HistoryKey].list[Number(Index[1])].content = []
          for (let i in data) {
            historyList.value[Index[0] as HistoryKey].list[Number(Index[1])].content.push(data[i as keyof typeof data])
          }
        } else {
          historyList.value[Index[0] as HistoryKey].list[Number(Index[1])].content.push(data)
        }
        break
      case 'fill':
        if (data?.type == 'reasoning') {
          historyList.value[Index[0] as HistoryKey].list[Number(Index[1])].content.at(-1).reasoning += data.content
        } else if (data?.type == 'content') {
          historyList.value[Index[0] as HistoryKey].list[Number(Index[1])].content.at(-1).content += data.content
        }
        break
      case 'delete':
        if (Index.length == 1) {
          historyList.value[Index[0] as HistoryKey].list = []
        } else if (Index.length == 2) {
          historyList.value[Index[0] as HistoryKey].list.splice(Number(Index[1]), 1)
        }
        break
    }
  }
  /**
   * 在侧边栏数据中新建数据
   */
  const setUnshiftData = (data: Object) => {
    historyList.value.today.list.unshift(data)
  }
  const setHistoryIndex = (index: string, num: string) => {
    historyIndex.value = `${index}-${num}`
  }
  /**
   * 修改交流状态
   */
  const setischat = (state: boolean) => {
    isChat.value = state
  }
  //#endregion


  return {
    historyIndex, getHistoryList, getHistoryIndex, setHistoryIndex, setHistoryList, setUnshiftData, setischat
  }
})
