// 定义 EventSource 事件名称的类型
type SSEEventName = "SUCCESS" | "start" | "reasoning_content" | "content" | "DONE" | "HEARTBEAT";

class ChatSSE {
    private user_id: string;
    private url: string;
    private chatUrl: string;
    private eventSource: EventSource | null;
    private eventListeners: { [eventName: string]: ((data: any) => void)[] };
    private reconnectDelay: number;

    constructor(user_id: string, url: string, chatUrl: string) {
        this.user_id = user_id;
        this.url = `${url}?user_id=${user_id}`;
        this.chatUrl = chatUrl;
        this.eventSource = null;
        this.eventListeners = {}; // 记录事件监听器
        this.reconnectDelay = 3000; // 断线重连间隔（毫秒）
        this.connect();
    }

    /**
     * 连接 SSE 服务器
     */
    private connect(): void {
        this.eventSource = new EventSource(this.url);

        this.eventSource.onopen = () => {
            console.log("SSE 连接成功");
        };

        this.eventSource.onerror = () => {
            console.error("SSE 连接错误，尝试重连...");
            this.eventSource?.close();
            setTimeout(() => this.connect(), this.reconnectDelay);
        };

        // 监听其他自定义事件
        const eventNames: SSEEventName[] = ["SUCCESS", "start", "reasoning_content", "content", "DONE", "HEARTBEAT"];
        eventNames.forEach((eventName) => {
            this.eventSource?.addEventListener(eventName, (event) => {
                this.triggerEvent(eventName, event.data);
            });
        });
    }

    /**
     * 注册事件监听器
     * @param eventName 事件名称
     * @param callback 回调函数
     */
    public on(eventName: string, callback: (data: any) => void): void {
        if (!this.eventListeners[eventName]) {
            this.eventListeners[eventName] = [];
        }
        this.eventListeners[eventName].push(callback);
    }

    /**
     * 触发事件
     * @param eventName 事件名称
     * @param data 事件数据
     */
    private triggerEvent(eventName: string, data: any): void {
        if (this.eventListeners[eventName]) {
            this.eventListeners[eventName].forEach((callback) => callback(data));
        }
    }

    /**
     * 发送消息到服务器
     * @param message 用户输入的消息
     */
    public sendMessage(message: string): void {
        if (!message.trim()) {
            console.warn("不能发送空消息");
            return;
        }
        fetch(this.chatUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: this.user_id, text: message }),
        });
    }

    /**
     * 关闭 SSE 连接
     */
    public close(): void {
        if (this.eventSource) {
            this.eventSource.close();
            console.log("SSE 连接已关闭");
        }
    }
}

export default ChatSSE;