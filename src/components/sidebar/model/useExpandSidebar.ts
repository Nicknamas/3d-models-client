import { type ModelRef, onBeforeMount } from 'vue'

type EmitFunction = (evt: 'updateSidebarStatus', args_0: boolean) => void

export function useExpandSidebar(isExpand: ModelRef<boolean>, emit: EmitFunction) {
  function toggleExpand() {
    switchExpandValue()
    notifyUpdateState()
    saveHeaderState()
  }

  function switchExpandValue() {
    isExpand.value = !isExpand.value
  }

  function notifyUpdateState() {
    emit('updateSidebarStatus', isExpand.value)
  }

  function saveHeaderState() {
    localStorage.setItem('isExpandHeader', String(isExpand.value))
  }

  function getHeaderState() {
    return localStorage.getItem('isExpandHeader')
  }

  function updateHeaderStateWithSavedValue() {
    isExpand.value = getHeaderState() === 'true'
  }

  onBeforeMount(() => {
    updateHeaderStateWithSavedValue()
    notifyUpdateState()
  })

  return {
    toggleExpand,
  }
}
