<template>
  <div ref="titleRef"
    class="content-title" 
    contenteditable="true"
    @mousedown.prevent="handleMouseDown"
    @focus="handleFocus">
    {{ countent.title }}
  </div>
  <div class="content-list" ref="messageContainer" @scroll="handleScroll">
    <div v-for="i in countent.content" class="dialogue">
      <div class="dialogue-myset" v-if="i.role === '我'">
        <span v-html="formattedMySet(i.content)"></span>
      </div>  
      <div class="dialogue-ai" v-if="i.role === 'deepseek'">
        <div class="ai-logo">
          <div class="logo"><svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="path" d="M27.501 8.46875C27.249 8.3457 27.1406 8.58008 26.9932 8.69922C26.9434 8.73828 26.9004 8.78906 26.8584 8.83398C26.4902 9.22852 26.0605 9.48633 25.5 9.45508C24.6787 9.41016 23.9785 9.66797 23.3594 10.2969C23.2275 9.52148 22.79 9.05859 22.125 8.76172C21.7764 8.60742 21.4238 8.45312 21.1807 8.11719C21.0098 7.87891 20.9639 7.61328 20.8779 7.35156C20.8242 7.19336 20.7695 7.03125 20.5879 7.00391C20.3906 6.97266 20.3135 7.13867 20.2363 7.27734C19.9258 7.84375 19.8066 8.46875 19.8174 9.10156C19.8447 10.5234 20.4453 11.6562 21.6367 12.4629C21.7725 12.5547 21.8076 12.6484 21.7646 12.7832C21.6836 13.0605 21.5869 13.3301 21.501 13.6074C21.4473 13.7852 21.3662 13.8242 21.1768 13.7461C20.5225 13.4727 19.957 13.0684 19.458 12.5781C18.6104 11.7578 17.8438 10.8516 16.8877 10.1426C16.6631 9.97656 16.4395 9.82227 16.207 9.67578C15.2314 8.72656 16.335 7.94727 16.5898 7.85547C16.8574 7.75977 16.6826 7.42773 15.8193 7.43164C14.957 7.43555 14.167 7.72461 13.1611 8.10938C13.0137 8.16797 12.8594 8.21094 12.7002 8.24414C11.7871 8.07227 10.8389 8.0332 9.84766 8.14453C7.98242 8.35352 6.49219 9.23633 5.39648 10.7441C4.08105 12.5547 3.77148 14.6133 4.15039 16.7617C4.54883 19.0234 5.70215 20.8984 7.47559 22.3633C9.31348 23.8809 11.4307 24.625 13.8457 24.4824C15.3125 24.3984 16.9463 24.2012 18.7881 22.6406C19.2529 22.8711 19.7402 22.9629 20.5498 23.0332C21.1729 23.0918 21.7725 23.002 22.2373 22.9062C22.9648 22.752 22.9141 22.0781 22.6514 21.9531C20.5186 20.959 20.9863 21.3633 20.5605 21.0371C21.6445 19.752 23.2783 18.418 23.917 14.0977C23.9668 13.7539 23.9238 13.5391 23.917 13.2598C23.9131 13.0918 23.9512 13.0254 24.1445 13.0059C24.6787 12.9453 25.1973 12.7988 25.6738 12.5352C27.0557 11.7793 27.6123 10.5391 27.7441 9.05078C27.7637 8.82422 27.7402 8.58789 27.501 8.46875ZM15.46 21.8613C13.3926 20.2344 12.3906 19.6992 11.9766 19.7227C11.5898 19.7441 11.6592 20.1875 11.7441 20.4766C11.833 20.7617 11.9492 20.959 12.1123 21.209C12.2246 21.375 12.3018 21.623 12 21.8066C11.334 22.2207 10.1768 21.668 10.1221 21.6406C8.77539 20.8477 7.64941 19.7988 6.85547 18.3652C6.08984 16.9844 5.64453 15.5039 5.57129 13.9238C5.55176 13.541 5.66406 13.4062 6.04297 13.3379C6.54199 13.2461 7.05762 13.2266 7.55664 13.2988C9.66602 13.6074 11.4619 14.5527 12.9668 16.0469C13.8262 16.9004 14.4766 17.918 15.1465 18.9121C15.8584 19.9688 16.625 20.9746 17.6006 21.7988C17.9443 22.0879 18.2197 22.3086 18.4824 22.4707C17.6895 22.5586 16.3652 22.5781 15.46 21.8613ZM16.4502 15.4805C16.4502 15.3105 16.5859 15.1758 16.7568 15.1758C16.7949 15.1758 16.8301 15.1836 16.8613 15.1953C16.9033 15.2109 16.9424 15.2344 16.9727 15.2695C17.0273 15.3223 17.0586 15.4004 17.0586 15.4805C17.0586 15.6504 16.9229 15.7852 16.7529 15.7852C16.582 15.7852 16.4502 15.6504 16.4502 15.4805ZM19.5273 17.0625C19.3301 17.1426 19.1328 17.2129 18.9434 17.2207C18.6494 17.2344 18.3281 17.1152 18.1533 16.9688C17.8828 16.7422 17.6895 16.6152 17.6074 16.2168C17.5732 16.0469 17.5928 15.7852 17.623 15.6348C17.6934 15.3105 17.6152 15.1035 17.3877 14.9141C17.2012 14.7598 16.9658 14.7188 16.7061 14.7188C16.6094 14.7188 16.5205 14.6758 16.4541 14.6406C16.3457 14.5859 16.2568 14.4512 16.3418 14.2852C16.3691 14.2324 16.501 14.1016 16.5322 14.0781C16.8838 13.877 17.29 13.9434 17.666 14.0938C18.0146 14.2363 18.2773 14.498 18.6562 14.8672C19.0439 15.3145 19.1133 15.4395 19.334 15.7734C19.5078 16.0371 19.667 16.3066 19.7754 16.6152C19.8408 16.8066 19.7559 16.9648 19.5273 17.0625Z" fill-rule="nonzero" fill="#4D6BFE"></path></svg></div>
        </div>
        <div class="ai-answer">
          <div class="ai-think" v-if="i.reasoning">
            <!-- 思考路径 -->
            <div class="R1">
              <!-- R1按钮,切换是否展示思考内容 -->
              <div class="R1-show" @click="thinkBtn">
                <div class="logo"><svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.656 17.344c-1.016-1.015-1.15-2.75-.313-4.925.325-.825.73-1.617 1.205-2.365L3.582 10l-.033-.054c-.5-.799-.91-1.596-1.206-2.365-.836-2.175-.703-3.91.313-4.926.56-.56 1.364-.86 2.335-.86 1.425 0 3.168.636 4.957 1.756l.053.034.053-.034c1.79-1.12 3.532-1.757 4.957-1.757.972 0 1.776.3 2.335.86 1.014 1.015 1.148 2.752.312 4.926a13.892 13.892 0 0 1-1.206 2.365l-.034.054.034.053c.5.8.91 1.596 1.205 2.365.837 2.175.704 3.911-.311 4.926-.56.56-1.364.861-2.335.861-1.425 0-3.168-.637-4.957-1.757L10 16.415l-.053.033c-1.79 1.12-3.532 1.757-4.957 1.757-.972 0-1.776-.3-2.335-.86zm13.631-4.399c-.187-.488-.429-.988-.71-1.492l-.075-.132-.092.12a22.075 22.075 0 0 1-3.968 3.968l-.12.093.132.074c1.308.734 2.559 1.162 3.556 1.162.563 0 1.006-.138 1.298-.43.3-.3.436-.774.428-1.346-.008-.575-.159-1.264-.449-2.017zm-6.345 1.65l.058.042.058-.042a19.881 19.881 0 0 0 4.551-4.537l.043-.058-.043-.058a20.123 20.123 0 0 0-2.093-2.458 19.732 19.732 0 0 0-2.458-2.08L10 5.364l-.058.042A19.883 19.883 0 0 0 5.39 9.942L5.348 10l.042.059c.631.874 1.332 1.695 2.094 2.457a19.74 19.74 0 0 0 2.458 2.08zm6.366-10.902c-.293-.293-.736-.431-1.298-.431-.998 0-2.248.429-3.556 1.163l-.132.074.12.092a21.938 21.938 0 0 1 3.968 3.968l.092.12.074-.132c.282-.504.524-1.004.711-1.492.29-.753.442-1.442.45-2.017.007-.572-.129-1.045-.429-1.345zM3.712 7.055c.202.514.44 1.013.712 1.493l.074.13.092-.119a21.94 21.94 0 0 1 3.968-3.968l.12-.092-.132-.074C7.238 3.69 5.987 3.262 4.99 3.262c-.563 0-1.006.138-1.298.43-.3.301-.436.774-.428 1.346.007.575.159 1.264.448 2.017zm0 5.89c-.29.753-.44 1.442-.448 2.017-.008.572.127 1.045.428 1.345.293.293.736.431 1.298.431.997 0 2.247-.428 3.556-1.162l.131-.074-.12-.093a21.94 21.94 0 0 1-3.967-3.968l-.093-.12-.074.132a11.712 11.712 0 0 0-.71 1.492z" fill="currentColor" stroke="currentColor" stroke-width=".1"></path><path d="M10.706 11.704A1.843 1.843 0 0 1 8.155 10a1.845 1.845 0 1 1 2.551 1.704z" fill="currentColor" stroke="currentColor" stroke-width=".2"></path></svg></div>
                <div class="text">
                  <span v-if="thinking">思考中...</span>
                  <span v-else>已深度思考</span>
                </div>
                <div class="show" :style="{transform : thinkshowStyle}">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.786 4.167L2.765 1.259c-.416-.4-.985-.482-1.273-.183-.287.298-.183.864.233 1.264l3.021 2.908c.416.4.986.482 1.273.184.287-.299.183-.865-.233-1.265z" fill="currentColor"></path><path d="M8.197 1.206L5.288 4.208c-.4.413-.484.982-.187 1.27.298.289.864.187 1.265-.227L9.274 2.25c.401-.414.485-.983.187-1.271-.297-.288-.863-.187-1.264.227z" fill="currentColor"></path></svg>
                </div>
              </div>
              <!-- 思考内容 -->
              <div class="think-content" v-show="thinkshow">
                <span v-html="i.reasoning ? formattedAi(i.reasoning): undefined"></span>
              </div>
            </div>
          </div> 
          <div class="ai-content" v-if="i.content">
            <v-md-preview class="v-md-pre" :text="i.content" :key="previewKey"></v-md-preview>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch} from 'vue';
import { useRoute } from 'vue-router';
import hljs from 'highlight.js';
import { UseHistoryStore } from '@/stores/chatData'
import type { HistoryKey } from '@/stores/chatData'

const HistoryStore = UseHistoryStore()

//#region 每页历史标题按钮样式及标题内容
const titleRef = ref<HTMLDivElement | null>(null)
// 核心：在 mousedown 阶段拦截默认行为，直接定位光标到末尾
const handleMouseDown = (event:any) => {
  event.preventDefault() // 阻止浏览器默认的点击定位行为
  if (!titleRef.value) {
    return
  }
  titleRef.value.focus() // 手动触发 focus
  moveCursorToEnd(titleRef.value)
}

// 处理键盘 Tab 键等非点击的 focus 事件
const handleFocus = () => {
  moveCursorToEnd(titleRef.value)
}

// 移动光标到末尾的通用方法
const moveCursorToEnd = (element:any) => {
  const range = document.createRange()
  const selection = window.getSelection()
  range.selectNodeContents(element)
  range.collapse(false) // false 表示末尾
  if (selection) {
    selection.removeAllRanges()
    selection.addRange(range) 
  }
}
//#endregion

//#region 与ai交流的样式规则
const thinking = ref(false)  // 是否正在思考
const thinkshow = ref(true)  // 是否显示思考内容
const autoScroll = ref(true)  // 是否允许自动滚动
const scrollTimeout = ref<number | undefined>() // 滚动事件防抖
const messageContainer = ref<HTMLDivElement | null>(null) // 消息容器元素
const previewKey = ref(0) // ai-content的容器key

const thinkshowStyle = computed(() => thinkshow.value ? 'rotate(180deg)' : 'rotate(0deg)')
const thinkBtn = () => {
  thinkshow.value = !thinkshow.value
}

// 自己发送内容解析
const formattedMySet = (text:any) => {
  // 将换行符 \n 替换为 <br> 标签
  return text.replace(/\n/g, '<br>');
}
// ai思考内容解析
const formattedAi = (text:any, keywords:any = null) => {
  let processedText = text;
  // 默认处理：中文标点符号后换行
  if (!keywords) {
    processedText = processedText.replace(/([。！？])/g, '$1\n');
  } 
  // 自定义关键词处理：关键词前换行
  else {
    const escapedKeywords = keywords.map((k:any) => 
        k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    ).join('|');
    
    // 使用正向回看来避免行首插入多余换行
    const pattern = new RegExp(`(\\S)(?=${escapedKeywords})`, 'g');
    processedText = processedText.replace(pattern, '$1\n');
  }

  // 清理多余换行并移除首尾空白
  return processedText
    .replace(/\n+/g, '\n')
    .trim();
}
// 盒子滚动追踪
const scrollToBottom = () => {
  if (!autoScroll.value || !messageContainer.value) return
  nextTick(() => {
    if(messageContainer.value === null) return
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  })
}
// 处理滚动事件
const handleScroll = (e: any) => {
  clearTimeout(scrollTimeout.value)
  scrollTimeout.value = setTimeout(() => {
    const threshold = 50
    const isBottom = 
      e.target.scrollHeight - e.target.scrollTop <= 
      e.target.clientHeight + threshold
    autoScroll.value = isBottom
  }, 100)
}

let countent = ref({
  id: '',
  title: 'nihao',
  date: '',
  content: [
    {role: '我', content: ''},
    {role: 'deepseek', reasoning: '', content: ''},
  ]
})

// 监听内容变化,进行盒子更新
watch(()=>{
  return HistoryStore.getHistoryIndex()
}, () => {  
  const index = HistoryStore.getHistoryIndex().split('-')
  let historyList = HistoryStore.getHistoryList()
  countent.value = historyList[index[0] as HistoryKey].list[Number(index[1])]
},{
  deep: true,
  immediate: true
})

watch(()=>{
  return HistoryStore.getHistoryList()
}, () => {
  const index = HistoryStore.getHistoryIndex().split('-')
  let historyList:any = HistoryStore.getHistoryList()
  countent.value = historyList[index[0]].list[index[1]]
  nextTick()
},{
  deep: true,
})
//#endregion


onMounted(() => {
  scrollToBottom
})
</script>

<style scoped lang="scss">
  .content-title{
    max-width: 40%;
    height: 40px;
    padding: 8px 12px;
    color: #262626;
    font-size: 16px;
    font-family: Inter, system-ui, -apple-system, Bl;
    font-weight: 600;
    border-radius: 12px;
    box-sizing: border-box;
    margin-top: 20px;
    margin-bottom: 38px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    user-select: auto;
    cursor: pointer;
  }
  .content-title:hover{
    box-shadow: inset 0 0 0 1px rgb(229,229,229);
  }
  .content-title:focus{
    outline: none;
    border: 2px solid #4d6bfe;
  }

  .content-list {
    width: 70%;
    height: 500px;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin-top: 50px;
    padding: 38px 0 0 0;
    display: flex; 
    flex-grow: 1;
    flex-direction: column;
    .dialogue{
      width: 100%;
      .dialogue-myset{
        max-width: 100%;   
        padding-bottom: 32px;    
        display: flex;
        justify-content: flex-end;
        span{
          color: #262626;
          background-color: #eff6ff;
          padding: 8px 20px;
          border-radius: 14px;
          user-select: auto !important;
        }
      }
      .dialogue-ai{
        max-width: 100%;
        display: flex;
        margin-bottom: 32px;
        .ai-logo{
          width: 32px;
          height: 32px;
          display: flex;
          justify-content: center;
          margin-right: 15px;
          border: 1px solid #d5e4ff;
          border-radius: 50%;
          .logo{
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
          }
        }
        .ai-answer{
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .ai-think{
          max-width: 100%;
          height: 90%;
          margin-bottom: 14px;
          .R1{
            max-width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .R1-show{
              height: 32px;
              margin-bottom: 12px;
              padding: 7px 14px;
              color: rgb(38 38 38);
              background-color: rgb(245 245 245);
              font-size: 12px;
              line-height: 18px;
              border-radius: 10px;
              display: flex;
              align-items: center;
              cursor: pointer;
              .logo{
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-right: 6px;
                svg{
                  margin-bottom: 2px;
                }
              }
              .text{
                margin-right: 6px;
              }
              .show{
                svg{
                  margin-bottom: 2px;
                }
              }
            }
            .think-content{
              padding-left: 13px;
              color: rgb(139, 139, 139);
              border-left: 2px solid rgb(229,229,229);
            }
          }
        }
        :deep(.v-md-pre .github-markdown-body){
          padding: 0;
        }
      }
    }
  }
</style>