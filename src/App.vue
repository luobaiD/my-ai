<template>
  <div class="whole">
    <Sidebar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Sidebar from './views/Sidebar.vue';
import ChatSSE from './Utils/SSE.ts';
import timeDifference  from './Utils/TimeDifference.ts'
import { UseHistoryStore } from '@/stores/chatData.ts';
import { user_id } from './api/login/login'
import { getChat } from '@/api/login/chat';
import { useRouter } from 'vue-router';

const router = useRouter()
//#region chatData赋值
const HistoryStore = UseHistoryStore()

const getHistoryData = async () => {
  const query = encodeURIComponent(user_id.value);
  const data = await getChat(query)
  // 清空历史数据
  HistoryStore.setHistoryList('delete','today')
  HistoryStore.setHistoryList('delete','yesterday')
  HistoryStore.setHistoryList('delete','thisWeek')
  HistoryStore.setHistoryList('delete','more')
  for(let i of data){
    const newItem = {
      id: i.chat_id,
      title: i.title,
      date: i.updatetime.split('T')[0],
      content: []
    }   
    if(timeDifference(newItem) === 0){
      HistoryStore.setHistoryList('add','today',newItem)
    }else if(timeDifference(newItem) === 1){
      HistoryStore.setHistoryList('add','yesterday',newItem)
    }else if(timeDifference(newItem) > 1 && timeDifference(newItem) < 7){
      HistoryStore.setHistoryList('add','thisWeek',newItem)
    }else if(timeDifference(newItem) > 6){
      HistoryStore.setHistoryList('add','more',newItem)
    }
  }
    
}

//#endregion
onMounted(async() => {
  //#region sse连接
  let query = encodeURIComponent(user_id.value)
  const sse = new ChatSSE(query, `${import.meta.env.VITE_BASE_URL}createsse`, `${import.meta.env.VITE_BASE_URL}chat`)

  // 当接收到'start'事件时，打印会话ID
  sse.on('start', (data) => {
    console.log('开始',data);

    HistoryStore.setHistoryList('newData','today-0',{
      id: JSON.parse(data).data.split(':')[1].trim(), 
      date: JSON.parse(data).create_date
    })
    router.push({
      name: 'a',
      params: {
        chat_id: JSON.parse(data).data.split(':')[1].trim(),
      }
    })
    HistoryStore.setischat(true)
  })

  // 当接收到'reasoning_content'事件时，累加到resput中
  sse.on('reasoning_content', (data) => {
    const put = {
      type: 'reasoning',
      content: JSON.parse(data).Stream? JSON.parse(data).Stream : ''
    }
    
    HistoryStore.setHistoryList('fill',HistoryStore.getHistoryIndex(), put)
  })

  // 当接收到'content'事件时，累加到put中
  sse.on('content', (data) => {
    const put = {
      type:'content',
      content: JSON.parse(data).Stream
    }
    HistoryStore.setHistoryList('fill',HistoryStore.getHistoryIndex(), put)
  })

  // 当接收到'DONE'事件时，打印结束信息
  sse.on('DONE',async (data) => {
    console.log('结束', data); 

    HistoryStore.setischat(false)
  })
  //#endregion

  await getHistoryData()
  
})

</script>

<style scoped lang="scss">
.whole {
  width: 100vw;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  position: fixed;
}
</style>