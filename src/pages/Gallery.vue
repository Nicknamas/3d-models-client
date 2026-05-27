<script setup>
import { ref } from 'vue';

const models = ref([
  {
    title: 'Cyberpunk Bike',
    author: '@designer_01',
    emoji: '🏍️',
    tags: ['Sci-Fi', 'Vehicle']
  },
  {
    title: 'Space Station',
    author: '@architect_3d',
    emoji: '🛸',
    tags: ['Sci-Fi', 'Building']
  },
  {
    title: 'Fantasy Sword',
    author: '@gamedev_pro',
    emoji: '⚔️',
    tags: ['Fantasy', 'Weapon']
  },
  {
    title: 'Robot Character',
    author: '@creator_ai',
    emoji: '🤖',
    tags: ['Sci-Fi', 'Character']
  },
  {
    title: 'Crystal Formation',
    author: '@artist_digital',
    emoji: '💎',
    tags: ['Nature', 'Low-Poly']
  },
  {
    title: 'Futuristic Car',
    author: '@designer_01',
    emoji: '🚗',
    tags: ['Sci-Fi', 'Vehicle']
  },
  {
    title: 'Dragon Statue',
    author: '@sculptor_3d',
    emoji: '🐉',
    tags: ['Fantasy', 'Creature']
  },
  {
    title: 'Space Helmet',
    author: '@gamedev_pro',
    emoji: '👨‍🚀',
    tags: ['Sci-Fi', 'Prop']
  }
]);
</script>

<template>
  <div :class="$style.container">
    <header :class="$style.header">
      <h1 :class="$style.title">Community Gallery</h1>
      <p :class="$style.subtitle">Explore 3D models created by our community</p>
    </header>

    <main :class="$style.grid">
      <article
        v-for="(model, index) in models"
        :key="index"
        :class="$style.card"
      >
        <div :class="$style.previewArea">
          <span :class="$style.modelEmoji">{{ model.emoji }}</span>
        </div>

        <div :class="$style.infoArea">
          <h2 :class="$style.modelTitle">{{ model.title }}</h2>
          <p :class="$style.author">{{ model.author }}</p>
        </div>
      </article>
    </main>
  </div>
</template>

<style module>
.container {
  min-height: 100vh;
  background-color: #0b0c10;
  color: #ffffff;
  padding: 2.5rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

.header {
  margin-bottom: 2.5rem;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 1rem;
  color: #8a8f98;
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.card {
  background-color: #13151a;
  border: 1px solid #1f222a;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, border-color 0.2s;
}

.card:hover {
  border-color: #2e323d;
  transform: translateY(-2px);
}

.previewArea {
  height: 220px;
  background: radial-gradient(circle at center, #1f2330 0%, #13151a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #1f222a;
}

.modelEmoji {
  font-size: 4rem;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3));
}

.infoArea {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.modelTitle {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
}

.author {
  font-size: 0.85rem;
  color: #8a8f98;
  margin: 0 0 0.5rem 0;
}

.tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background-color: #1c1e24;
  border: 1px solid #282b35;
  color: #bcbfc4;
  padding: 0.3rem 0.65rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.tagIcon {
  width: 12px;
  height: 12px;
  color: #8a8f98;
}
</style>
