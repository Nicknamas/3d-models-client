<template>
  <div :class="$style.container">
    <header :class="$style.profileCard">
      <div :class="$style.avatarWrapper">
        <div :class="$style.avatar">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      </div>

      <div :class="$style.profileInfo">
        <h1 :class="$style.profileName">John Designer</h1>
        <p :class="$style.profileEmail">john@designer.com</p>

        <div :class="$style.statsGrid">
          <div :class="$style.statItem">
            <div :class="[$style.iconContainer, $style.iconBlue]">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg>
            </div>
            <div>
              <div :class="$style.statValue">127</div>
              <div :class="$style.statLabel">Models Created</div>
            </div>
          </div>

          <div :class="$style.statItem">
            <div :class="[$style.iconContainer, $style.iconGreen]">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
            <div>
              <div :class="$style.statValue">1.2K</div>
              <div :class="$style.statLabel">Total Downloads</div>
            </div>
          </div>

          <div :class="$style.statItem">
            <div :class="[$style.iconContainer, $style.iconPurple]">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <div :class="$style.statValue">Jan 2026</div>
              <div :class="$style.statLabel">Member Since</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section :class="$style.section">
      <h2 :class="$style.sectionTitle">Current Plan</h2>
      <div :class="$style.currentPlanCard">
        <div>
          <h3 :class="$style.currentPlanName">Free Plan</h3>
          <p :class="$style.currentPlanDesc">100 credits per month</p>
        </div>
        <div :class="$style.creditsBlock">
          <div :class="$style.creditsValue">45</div>
          <div :class="$style.creditsLabel">Credits remaining</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style module>
:root {
  --bg-main: #0b0c10;
  --bg-card: #13151a;
  --bg-card-border: #1f222a;
  --text-primary: #ffffff;
  --text-secondary: #8a8f98;
  --accent-blue: #00bcd4;
  --accent-green: #00e676;
  --accent-purple: #ab47bc;
  --accent-gradient: linear-gradient(135deg, #00bcd4, #ab47bc);
}

.container {
  min-height: 100vh;
  background-color: #0b0c10;
  color: #ffffff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 2.5rem 4rem;
  width: 100%;
  box-sizing: border-box;
}

/* Блок Профиля */
.profileCard {
  background-color: #13151a;
  border: 1px solid #1f222a;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin-bottom: 2.5rem;
}

.avatarWrapper {
  flex-shrink: 0;
}

.avatar {
  width: 90px;
  height: 90px;
  background: linear-gradient(180deg, #4da3ff 0%, #a166ff 100%);
  border-radius: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: #ffffff;
  overflow: hidden;
}

.profileInfo {
  flex-grow: 1;
}

.profileName {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.profileEmail {
  margin: 0 0 1.5rem 0;
  color: #8a8f98;
  font-size: 0.95rem;
}

.statsGrid {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
}

.statItem {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.iconContainer {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.04);
}

.iconBlue { color: #00bcd4; }
.iconGreen { color: #00e676; }
.iconPurple { color: #ab47bc; }

.statValue {
  font-size: 1.1rem;
  font-weight: 600;
}

.statLabel {
  font-size: 0.8rem;
  color: #8a8f98;
  margin-top: 0.15rem;
}

/* Общие заголовки секций */
.section {
  margin-bottom: 2.5rem;
}

.sectionTitle {
  font-size: 1.15rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1.25rem;
}

/* Текущий тариф */
.currentPlanCard {
  background: linear-gradient(90deg, rgba(27, 21, 44, 0.7) 0%, rgba(19, 21, 26, 1) 100%);
  border: 1px solid #2e1e4e;
  border-radius: 12px;
  padding: 1.75rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.currentPlanName {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.currentPlanDesc {
  margin: 0;
  color: #8a8f98;
  font-size: 0.95rem;
}

.creditsBlock {
  text-align: right;
}

.creditsValue {
  font-size: 2.2rem;
  font-weight: 500;
  line-height: 1;
}

.creditsLabel {
  font-size: 0.8rem;
  color: #8a8f98;
  margin-top: 0.5rem;
}

/* Сетка тарифов */
.pricingGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  align-items: stretch;
}

.planCard {
  background-color: #13151a;
  border: 1px solid #1f222a;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

/* Особенный стиль для карточки Pro */
.planCardPro {
  border: 1px solid #00bcd4;
  position: relative;
}

.planHeader {
  margin-bottom: 2rem;
}

.badge {
  display: inline-block;
  background-color: #7c4dff;
  color: #ffffff;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

.planTitle {
  margin: 0 0 1rem 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: #ffffff;
}

.planPrice {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.pricePeriod {
  font-size: 1rem;
  font-weight: 400;
  color: #8a8f98;
}

.planCredits {
  margin: 0;
  font-size: 0.85rem;
  color: #8a8f98;
}

/* Списки фич */
.featuresList {
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  flex-grow: 1;
}

.featureItem {
  font-size: 0.9rem;
  color: #bcbfc4;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Зеленый маркер списка */
.featureItem::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #00e676;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Кнопки */
.planButton {
  width: 100%;
  padding: 0.85rem;
  background-color: transparent;
  border: 1px solid #2e323d;
  color: #ffffff;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.planButton:hover {
  background-color: rgba(255, 255, 255, 0.02);
  border-color: #444957;
}

.planButtonPro {
  background: linear-gradient(90deg, #00bcd4, #ab47bc);
  border: none;
  font-weight: 600;
}
</style>
