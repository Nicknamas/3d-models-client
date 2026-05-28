import { useId } from 'vue'
import notifications from '../store/notification.ts'

export default function useMessage(notification) {
  notifications.value.push(notification)
  notification.isShow = true
  notification.id = useId()
  setTimeout(() => {
    notification.isShow = false
    notifications.value = notifications.value.filter(item => item.id !== notification.id)
  }, notification.duration)
}
