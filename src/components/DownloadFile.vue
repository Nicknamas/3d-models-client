<script lang="ts" setup>
interface Props {
  modelObject: object
}

const props = defineProps<Props>()

const downloadObjFile = () => {
  const base64Data = props.modelObject.data;
  const fileName = `${props.modelObject.title || 'model'}.obj`;

  const byteCharacters = window.atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: 'model/obj' });

  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
};
</script>

<template>
  <button @click="downloadObjFile" class="download-btn">
    📥 Скачать .OBJ модель
  </button>
</template>

<style scoped>
.download-btn {
  padding: 10px 20px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}
.download-btn:hover {
  background-color: #1d4ed8;
}
</style>
