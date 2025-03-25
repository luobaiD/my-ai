<template>
  <div class="">
    <div v-html="htmlContent" class="markdown-content"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const content = ref('Markdown 是一种轻量级标记语言，用简单的语法实现内容格式化，适合编写文档、笔记等。以下是基础语法指南： --- ### 一、基础语法 1. **标题** 用 `#` 数量表示标题等级： ```markdown # 一级标题 ## 二级标题 ### 三级标题 ``` 2. **段落与换行** 直接换行不会被识别，需在行尾加两个空格或空一行。 3. **文本样式** ```markdown *斜体* 或 _斜体_ **粗体** 或 __粗体__ ***粗斜体*** ~~删除线~~ ``` 4. **列表** - **无序列表**：用 `-`、`+` 或 `*` ```markdown - 项目1 - 项目2 ``` - **有序列表**：数字 + `.` ```markdown 1. 第一项 2. 第二项 ``` 5. **链接与图片** ```markdown [链接文字](URL) ![图片描述](图片URL) ``` 6. **引用** ```markdown > 引用内容 > 多行引用 ``` 7. **代码** - 行内代码：用反引号 `` `代码` `` - 代码块：用三个反引号 + 语言名（可选） ```markdown ```python print("Hello World!") ``` ``` 8. **分割线** 三个及以上 `-` 或 `*`： ```markdown --- ``` --- ### 二、扩展语法（部分平台支持） 1. **表格** ```markdown | 标题1 | 标题2 | |-------|-------| | 内容1 | 内容2 | ``` 2. **任务列表** ```markdown - [x] 已完成 - [ ] 未完成 ``` 3. **脚注** ```markdown 文本[^1] [^1]: 脚注说明 ``` --- ### 三、工具推荐 - **编辑器**：VS Code、Typora、Obsidian - **在线工具**：[Markdown Live Preview](https://markdownlivepreview.com/) - **学习资源**：[Markdown 官方指南](https://www.markdownguide.org/) --- ✅ **提示**：不同平台（如 GitHub、Notion）可能支持额外语法，建议查看对应文档。');
const htmlContent = ref('')

onMounted( async () => {

})
</script>

<style scoped lang="scss">

</style>