import getLastEvent from "./utils/getLastEvent";
import getSelector from "./utils/getSelector";
import tracker from "./utils/tracker";

interface JsErrorProps {
  host: string;
  project: string;
  logstore: string
}
export function JsError (props: JsErrorProps) {
  window.addEventListener ('error', (event) => {
    // 最后一个交互事件
    let lastEvent = { path: ''}
    let log = {
      // 监控指标大类
      kind: 'stability',
      // 小类型
      type: 'error',
      // js执行错误
      errorType: 'jsError',
      // 访问哪个路径报错了
      url: window.location.href,
      // 报错信息
      message: event.message,
      // 报错文件
      filename: event.filename,
      // 错误代码位置
      position: `${event.lineno}:${event.colno}`,
      // 报错堆栈
      stack: getLines(event.error.stack),
      // 最后一个操作元素
      selector: lastEvent ? getSelector(lastEvent.path) : ''
    }
    tracker.send(props.host, props.project, props.logstore, log)
  });

  window.addEventListener('unhandledrejection', (event)=> {

  })

  function getLines (stack: { split: (arg0: string) => string[]; }) {
    return stack.split('\n').slice(1).map(item=> item.replace(/^s+at\s+/g,'')).join('^')
  }

}