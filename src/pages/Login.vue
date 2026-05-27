<script lang="ts" setup>
import { ref, useId } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const emailId = useId();
const passwordId = useId();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref('');

const handleSubmit = async () => {
  if (password.value.length < 6) {
    error.value = 'Пароль должен быть не менее 6 символов';
    return;
  }

  error.value = '';
  isLoading.value = true;

  try {
    const response = await fakeLoginApi(email.value, password.value);

    router.push({ name: 'Home' })

  } catch (err) {
    error.value = err.message || 'Неверный email или пароль';
  } finally {
    isLoading.value = false;
  }
};

const fakeLoginApi = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@admin.com' && password === '123456') {
        resolve({ token: 'fake-jwt-token-12345' });
      } else {
        reject(new Error('Неверные учетные данные'));
      }
    }, 1000);
  });
};
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.card">
      <h2 :class="$style.title">Вход в систему</h2>

      <form @submit.prevent="handleSubmit" :class="$style.form">
        <div :class="$style.field">
          <label :for="emailId" :class="$style.label">Email</label>
          <input
            type="email"
            :id="emailId"
            v-model.trim="email"
            placeholder="example@mail.com"
            :class="[$style.input, error && !$style.inputError]"
            required
          />
        </div>

        <div :class="$style.field">
          <label :for="passwordId" :class="$style.label">Пароль</label>
          <input
            type="password"
            :id="passwordId"
            v-model="password"
            placeholder="••••••••"
            :class="$style.input"
            required
          />
        </div>

        <p v-if="error" :class="$style.errorMessage">
          {{ error }}
        </p>

        <button
          type="submit"
          :disabled="isLoading"
          :class="$style.button"
        >
          {{ isLoading ? 'Вход...' : 'Войти' }}
        </button>
      </form>
    </div>
  </div>
</template>


<style module>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--primary-foreground);
}

.card {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background-color: var(--sidebar);
  border-radius: 12px;
}

.title {
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--sidebar-foreground);
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--sidebar-foreground);
}

.input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #111827;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.errorMessage {
  margin: 0;
  font-size: 0.875rem;
  color: #dc2626;
}

.button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  background-color: var(--accent);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.1s;
}

.button:hover {
  scale: 1.02;
}

.button:active {
  scale: 0.95;
}
</style>
