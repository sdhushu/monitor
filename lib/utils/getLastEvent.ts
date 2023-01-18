let lastEvent: any

['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(eventType => {
  document.addEventListener(eventType, (event) => {
    lastEvent = event
  }, {
    // 捕获阶段执行
    capture: true,
    // 默认不阻止默认事件
    passive: true
  })
})

export default function () {
  return lastEvent
}