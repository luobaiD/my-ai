<template>
  <div class="search">
    <div class="searchBox">
      <!-- 输入内容 -->
      <div class="searchInput">
        <textarea v-model="inputData" 
                  placeholder="给 DeepSeek 发送消息" 
                  :style="textareaStyle" 
                  ref="textareaRef" 
                  @input="handleInput" 
                  @keydown="handleKeydown" />
      </div>
      <!-- 按钮 -->
      <div class="searchBtn">
        <!-- 选择方案 -->
        <div class="left">
          <div :class="{ R1: isR1, 'left-bt': !isR1 }" @click="isR1 = !isR1">
            <div class="ds-button__icon" style="margin-bottom: 5px;">
              <span style="transition: none; transform: rotate(0deg);">
                <div class="ds-icon" style="font-size: 19px; width: 19px; height: 19px">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.656 17.344c-1.016-1.015-1.15-2.75-.313-4.925.325-.825.73-1.617 1.205-2.365L3.582 10l-.033-.054c-.5-.799-.91-1.596-1.206-2.365-.836-2.175-.703-3.91.313-4.926.56-.56 1.364-.86 2.335-.86 1.425 0 3.168.636 4.957 1.756l.053.034.053-.034c1.79-1.12 3.532-1.757 4.957-1.757.972 0 1.776.3 2.335.86 1.014 1.015 1.148 2.752.312 4.926a13.892 13.892 0 0 1-1.206 2.365l-.034.054.034.053c.5.8.91 1.596 1.205 2.365.837 2.175.704 3.911-.311 4.926-.56.56-1.364.861-2.335.861-1.425 0-3.168-.637-4.957-1.757L10 16.415l-.053.033c-1.79 1.12-3.532 1.757-4.957 1.757-.972 0-1.776-.3-2.335-.86zm13.631-4.399c-.187-.488-.429-.988-.71-1.492l-.075-.132-.092.12a22.075 22.075 0 0 1-3.968 3.968l-.12.093.132.074c1.308.734 2.559 1.162 3.556 1.162.563 0 1.006-.138 1.298-.43.3-.3.436-.774.428-1.346-.008-.575-.159-1.264-.449-2.017zm-6.345 1.65l.058.042.058-.042a19.881 19.881 0 0 0 4.551-4.537l.043-.058-.043-.058a20.123 20.123 0 0 0-2.093-2.458 19.732 19.732 0 0 0-2.458-2.08L10 5.364l-.058.042A19.883 19.883 0 0 0 5.39 9.942L5.348 10l.042.059c.631.874 1.332 1.695 2.094 2.457a19.74 19.74 0 0 0 2.458 2.08zm6.366-10.902c-.293-.293-.736-.431-1.298-.431-.998 0-2.248.429-3.556 1.163l-.132.074.12.092a21.938 21.938 0 0 1 3.968 3.968l.092.12.074-.132c.282-.504.524-1.004.711-1.492.29-.753.442-1.442.45-2.017.007-.572-.129-1.045-.429-1.345zM3.712 7.055c.202.514.44 1.013.712 1.493l.074.13.092-.119a21.94 21.94 0 0 1 3.968-3.968l.12-.092-.132-.074C7.238 3.69 5.987 3.262 4.99 3.262c-.563 0-1.006.138-1.298.43-.3.301-.436.774-.428 1.346.007.575.159 1.264.448 2.017zm0 5.89c-.29.753-.44 1.442-.448 2.017-.008.572.127 1.045.428 1.345.293.293.736.431 1.298.431.997 0 2.247-.428 3.556-1.162l.131-.074-.12-.093a21.94 21.94 0 0 1-3.967-3.968l-.093-.12-.074.132a11.712 11.712 0 0 0-.71 1.492z" fill="currentColor" stroke="currentColor" stroke-width=".1"></path>
                    <path d="M10.706 11.704A1.843 1.843 0 0 1 8.155 10a1.845 1.845 0 1 1 2.551 1.704z" fill="currentColor" stroke="currentColor" stroke-width=".2"></path>
                  </svg>
                </div>
              </span>
            </div>
            <span class="ad0c98fd" style="margin-left: 4px;">深度思考 (R1)</span>
          </div>
          <div :class="{ network: isnetwork, 'left-bt': !isnetwork }" @click="isnetwork = !isnetwork">
            <div class="ds-button__icon" style="margin-bottom: 5px;">
              <span style="transition: none; transform: rotate(0deg);">
                <div class="ds-icon" style="font-size: 17px; width: 17px; height: 17px;">
                  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.8"></circle>
                    <path d="M10 1c1.657 0 3 4.03 3 9s-1.343 9-3 9M10 19c-1.657 0-3-4.03-3-9s1.343-9 3-9M1 10h18" stroke="currentColor" stroke-width="1.8"></path>
                  </svg>
                </div>
              </span>
            </div>
            <span class="ad0c98fd" style="height: 100%; display: flex; align-items: center;margin-left: 4px;">联网搜索</span>            
          </div>
        </div>
        <!-- 功能按钮 -->
        <div class="right">
          <div class="file">
            <div class="ds-icon" style="font-size: 20px; width: 23px; height: 23px; display: inline-block; box-sizing: content-box; padding: 0; border: none; overflow: hidden; line-height: 23px; vertical-align: middle;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 20" width="23" height="23" fill="none">
                <path d="M7 20c-1.856-.002-3.635-.7-4.947-1.94C.74 16.819.003 15.137 0 13.383V4.828a4.536 4.536 0 0 1 .365-1.843 4.75 4.75 0 0 1 1.087-1.567A5.065 5.065 0 0 1 3.096.368a5.293 5.293 0 0 1 3.888 0c.616.244 1.174.6 1.643 1.05.469.45.839.982 1.088 1.567.25.586.373 1.212.364 1.843v8.555a2.837 2.837 0 0 1-.92 2.027A3.174 3.174 0 0 1 7 16.245c-.807 0-1.582-.3-2.158-.835a2.837 2.837 0 0 1-.92-2.027v-6.22a1.119 1.119 0 1 1 2.237 0v6.22a.777.777 0 0 0 .256.547.868.868 0 0 0 .585.224c.219 0 .429-.08.586-.224a.777.777 0 0 0 .256-.546V4.828A2.522 2.522 0 0 0 7.643 3.8a2.64 2.64 0 0 0-.604-.876 2.816 2.816 0 0 0-.915-.587 2.943 2.943 0 0 0-2.168 0 2.816 2.816 0 0 0-.916.587 2.64 2.64 0 0 0-.604.876 2.522 2.522 0 0 0-.198 1.028v8.555c0 1.194.501 2.339 1.394 3.183A4.906 4.906 0 0 0 7 17.885a4.906 4.906 0 0 0 3.367-1.319 4.382 4.382 0 0 0 1.395-3.183v-6.22a1.119 1.119 0 0 1 2.237 0v6.22c-.002 1.754-.74 3.436-2.052 4.677C10.635 19.3 8.856 19.998 7 20z" fill="currentColor"></path>
              </svg>
            </div>
          </div>
          <div class="send" :style="sendBtnStyle" @click="handleAction">
              <div class="ds-icon" style="font-size: 16px; width: 16px; height: 16px;display: inline-block; box-sizing: content-box; padding: 0; border: none; overflow: hidden; line-height: 23px; vertical-align: middle;margin-left: 2.3px;margin-bottom: 2px;">
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 16c-.595 0-1.077-.462-1.077-1.032V1.032C5.923.462 6.405 0 7 0s1.077.462 1.077 1.032v13.936C8.077 15.538 7.595 16 7 16z" fill="currentColor"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M.315 7.44a1.002 1.002 0 0 1 0-1.46L6.238.302a1.11 1.11 0 0 1 1.523 0c.421.403.421 1.057 0 1.46L1.838 7.44a1.11 1.11 0 0 1-1.523 0z" fill="currentColor"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.685 7.44a1.11 1.11 0 0 1-1.523 0L6.238 1.762a1.002 1.002 0 0 1 0-1.46 1.11 1.11 0 0 1 1.523 0l5.924 5.678c.42.403.42 1.056 0 1.46z" fill="currentColor"></path>
                </svg>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { user_id } from '../api/login/login'
import { createchat, chat } from '../api/login/chat'
import { UseHistoryStore } from '@/stores/chatData'

const route = useRoute()
const isR1 = ref(false)
const isnetwork = ref(false)
const inputData = ref('') // 输入框内容
const HistoryStore = UseHistoryStore()

//#region 输入框内容动态高度及内部按键处理
const textareaRef = ref<HTMLTextAreaElement | null>(null); // 获取 textarea 的 DOM 引用
const lineHeight = ref(0); // 每行的高度

const textareaStyle = computed(() => {
  if (!textareaRef.value) return {}
  
  textareaRef.value.style.height = 'auto'
  const scrollHeight = textareaRef.value.scrollHeight
  const currentRows = Math.floor(scrollHeight / lineHeight.value)

  // 当内容为空时强制重置为2行高度
  if (!inputData.value.trim()) {
    return {
      height: `${2 * lineHeight.value}px`,
      overflow: 'hidden'
    }
  }

  if (currentRows < 2) {
    return {
      height: `${2 * lineHeight.value}px`,
      overflow: 'hidden'
    }
  } else if (currentRows <= 10) {
    return {
      height: `${scrollHeight}px`,
      overflow: 'hidden'
    }
  } else {
    return {
      height: `${10 * lineHeight.value}px`,
      overflow: 'auto'
    }
  }
});

// 使用防抖优化输入事件
const handleInput = () => {
  if (!textareaRef.value) {
    return
  }
  textareaRef.value.style.height = 'auto';
  const scrollHeight = textareaRef.value.scrollHeight;
  // 如果 scrollHeight 大于 220px，固定高度为 220px
  if (scrollHeight > 220) {
    textareaRef.value.style.height = '220px';
  } else {
    // 否则，设置高度为 scrollHeight
    textareaRef.value.style.height = `${scrollHeight}px`;
  }
}

// 输入框内enter事件分类
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault() // 始终阻止默认换行
    
    // 仅在内容有效时提交
    if (inputData.value.trim()) {
      handleAction()
    }
  }
}
//#endregion

//#region 判断输入框内是否有内容,决定发送按钮样式
const isContent = ref(false)
watch(()=>inputData.value,(n,o)=>{
  if(n.trim()){
    isContent.value = true 
  }else{
    isContent.value = false
  }
},{
  deep: true
})

const sendBtnStyle = computed(() => {  // 监听输入框内容变化决定发送按钮样式
  if (isContent.value) {
    return {
      cursor: 'pointer',
      backgroundColor: '#4d6bfe'
    }
  }else{
    return {
      cursor: 'no-drop',
      backgroundColor: '#dce0e9' 
    }
  }
})
//#endregion

//#region 发送按钮
const IDcheck = async (userId:any, data:any) => {
  if(!route.params.chat_id){
    try {
      const params = {
        user_id: encodeURIComponent(userId.value),
        text: data
      }
      const res = await createchat(params)

      const newData = {
        id: '',
        title: '新会话',
        date: '',
        content: [
          {role:'我', content: inputData.value},
          {role:'deepseek', reasoning: '', content: ''}
        ]
      }
      HistoryStore.setUnshiftData(newData)
      // HistoryStore.setHistoryList('add','today',newData)
      HistoryStore.setHistoryIndex('today', '0')
      
      router.push({
        path: '/a',
      })
    } catch {
      console.log('创建失败'); 
    }
  }else{
    const chatId = route.params.chat_id
    try {
      const parameter = {
        user_id: encodeURIComponent(userId.value),
        chat_id: encodeURIComponent(chatId as string),
        text: data
      }
      const res = await chat(parameter)
      
      HistoryStore.setHistoryList('newCount',HistoryStore.getHistoryIndex(), {role:'我', content: inputData.value})
      HistoryStore.setHistoryList('newCount',HistoryStore.getHistoryIndex(), {role:'deepseek', reasoning: '', content: ''})
    } catch {
      console.log('发送失败'); 
    }
  } 
}
const handleAction = async () => {
  if(!inputData.value.trim()) return
  const ipdata = inputData.value
  // 成功与ds对接
  await IDcheck(user_id, ipdata)

  inputData.value = '' // 清空输入框内容
  isContent.value = false // 改变发送按钮样式
};
//#endregion


// 初始化时触发一次 input 事件
onMounted(() => {
  if (textareaRef.value) {
    lineHeight.value = parseInt(window.getComputedStyle(textareaRef.value).lineHeight, 10);
  }
});
</script>

<style scoped lang="scss">
  .search {
    width: 100%;
    min-width: 558px;
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .searchBox {
      width: 65%;
      height: auto;
      background-color: rgb(243 244 246);
      border-radius: 24px;
      box-shadow: 0 0 0 .5px #dce0e9;
      padding: 10px;
      z-index: 1;
      font-family:  Microsoft YaHei UI;
      display: flex; 
      flex: 0 0 auto;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      .searchInput {
        width: 100%;
        flex: 0 0 auto;
        overflow-y: hidden;
        textarea{
          width: 100%;
          color: rgb(64, 64, 64);
          background-color: rgb(243 244 246);
          border: none;
          font-family: inherit; 
          font-size: 16px;
          padding: 2px 0;
          resize: none;
        }
        textarea:focus {
          outline: none;
        }
      }
      .searchBtn {
        width: calc(100% - 2px);
        height: 32px;
        border-radius: 24px; 
        margin-top: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          .R1{
            height: 26px;
            color: rgb(77, 107, 254);
            background-color: rgb(219, 234, 254);
            padding: 0 7px;
            margin-right: 10px;
            font-size: 12px;
            border: 1px solid rgba(0, 122, 255, 0.15);
            border-radius: 24px;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          .R1:hover{
            background-color: #C3DAF8;
          }
          .network {
            height: 26px;
            color: rgb(77, 107, 254);
            background-color: rgb(219, 234, 254);
            padding: 0 7px;
            margin-right: 10px;
            font-size: 12px;
            border: 1px solid rgba(0, 122, 255, 0.15);
            border-radius: 24px;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          .network:hover{
            background-color: #C3DAF8;
          }
          .left-bt {
            height: 26px;
            background-color: rgb(255, 255, 255);
            padding: 0 7px;
            margin-right: 10px;
            font-size: 12px;
            border: 1px solid rgba(0, 0, 0, 0.12);
            border-radius: 24px;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          .left-bt:hover {
            background-color: #E0E4ED;
          }
        }
        .right {
          display: flex;
          .file {
            width: 32px;
            height: 32px;
            margin-right: 10px;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            cursor: pointer;
          }
          .file:hover {
            background-color: #e0e4ed;
          }
          .send {
            width: 32px;
            height: 32px;
            color: rgb(250, 250, 250);
            background-color: rgb(214, 222, 232);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: no-drop;
          }
        }
      }
    }
  }

  @media(max-width: 1270px){
    .search{
      width: 100%;
      .searchBox{
        width: 80%;
      }
    }
  }
  @media(max-width: 1038px){
    .search{
      width: 100%;
      .searchBox{
        width: 100%;
      }
    }
  }
</style>