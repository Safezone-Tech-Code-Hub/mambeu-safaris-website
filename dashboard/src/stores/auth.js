import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { COLLECTIONS, pb } from '@/lib/pb';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(pb.authStore.record);
  const token = ref(pb.authStore.token);

  pb.authStore.onChange(() => {
    user.value = pb.authStore.record;
    token.value = pb.authStore.token;
  });

  const isLoggedIn = computed(() => Boolean(token.value && user.value));
  const isAdmin = computed(() => user.value?.role === 'admin');

  async function login(email, password) {
    const auth = await pb.collection(COLLECTIONS.staff).authWithPassword(email, password);
    user.value = auth.record;
    token.value = pb.authStore.token;
    return auth.record;
  }

  function logout() {
    pb.authStore.clear();
    user.value = null;
    token.value = null;
  }

  return { user, token, isLoggedIn, isAdmin, login, logout };
});
