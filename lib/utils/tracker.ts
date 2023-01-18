// @ts-ignore
import axios from 'axios'
function getExtraData() {
  return {
    title: document.title,
    url: location.href,
    timestamp: Date.now(),
    userAgent: navigator.userAgent
  }
}
class SendTracker {
  send(host: string, project: string, logstore: string, data: object) {
    const url = `http://${project}.${host}/logstores/${logstore}/track`
    const extraData = getExtraData()
    const log = { ...extraData, ...data }
    for (let key in log) {
      // @ts-ignore
      if (typeof log[key]  === 'number') {
        // @ts-ignore
        log[key] = String(log[key])
      }
    }
    const body = JSON.stringify(log)
    axios.post(url, {'__logs__': [JSON.parse(body)]}, {
      headers: {
        'x-log-apiversion': '0.6.0',
        'x-log-bodyrawsize': String(body.length),
      }
    })
  }
}
export default new SendTracker()