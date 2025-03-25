import http from '../index'
// 创建会话
export const createchat = async (params: any) => {
  try {
    const res = await http.post("/createchat", params);
    return res;
  } catch (error) {
    console.log(error);
  }
};
// 获取历史记录
export const getChat = async (user_id: any,chat_id='') => {
  try {
    const res = await http.get(`/getChat?user_id=${user_id}&chat_id=${chat_id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
// 继续会话
export const chat = async (params: any) => {
  try {
    const res = await http.post("/chat", params);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
// 删除会话
export const deleteChat = async (params: any) => {
  try {
    const res = await http.post("/deletechat", params);
  } catch (error) {
    console.log(error);
  }
}
// 更改会话标题
export const updateChatTitle = async (params: any) => {
  try {
    const res = await http.post("/updatechattitle", params);
    return res;
  } catch (error) {
    console.log(error);
  }
}