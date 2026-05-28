<script lang="ts" setup>
import useMessage from '@/utils/useMessage';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

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
    const data = {
      username: email.value,
      password: password.value
    }

    await axios.post('http://localhost:5000/users', data);
    useMessage({
      type: 'success',
      message: 'Успешная Регистрация',
      duration: 3000,
    })

    router.push({ name: 'Login' })

  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.card">
      <h2 :class="$style.title">Регистрация</h2>

      <form @submit.prevent="handleSubmit" :class="$style.form">
        <div :class="$style.field">
          <label :class="$style.label">Никнейм</label>
          <input
            type="username"
            v-model.trim="email"
            placeholder="some_funny_username"
            :class="[$style.input, error && !$style.inputError]"
            required
          />
        </div>

        <div :class="$style.field">
          <label :class="$style.label">Пароль</label>
          <input
            type="password"
            v-model="password"
            placeholder="••••••••"
            :class="$style.input"
            required
          />
        </div>

        <p v-if="error" :class="$style.errorMessage">
          {{ error }}
        </p>

        <a
          @click="$router.push({ name: 'Login' })"
          :class="[$style.label, $style.link]"
        >
          Есть аккаунт?
        </a>

        <button
          type="submit"
          :disabled="isLoading"
          :class="$style.button"
        >
          {{ isLoading ? 'Регистрация...' : 'Войти' }}
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

.link {
  text-decoration: underline;
  text-align: center;
  cursor: pointer;
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
