<template>
  <div class="login-wrap">
    <Card class="login-card">
      <template #title>Sign in to Mambeu Manage</template>
      <template #subtitle>Use the email and password your administrator created for you.</template>
      <template #content>
      <form @submit.prevent="onSubmit" class="field-grid">
        <div>
          <label for="email">Email</label>
          <InputText id="email" v-model="email" type="email" autocomplete="username" class="w-full" required />
        </div>
        <div>
          <label for="password">Password</label>
          <Password id="password" v-model="password" :feedback="false" toggleMask class="w-full" inputClass="w-full" required />
        </div>
        <Message v-if="error" severity="error" :closable="false">{{ error }}</Message>
        <Button type="submit" label="Sign in" icon="pi pi-sign-in" :loading="loading" class="w-full" />
      </form>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { useAuthStore } from '@/stores/auth';
import { describePbError } from '@/lib/pb';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

async function onSubmit() {
  loading.value = true;
  error.value = '';
  try {
    await auth.login(email.value.trim(), password.value);
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/';
    router.replace(redirect);
  } catch (e) {
    error.value = describePbError(e, 'Invalid email or password.');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.35rem;
}
.w-full,
:deep(.p-password),
:deep(.p-password-input),
:deep(.p-inputtext) {
  width: 100%;
}
</style>
