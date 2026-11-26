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

  // isValid also checks the token's expiry. An expired or rejected token makes PocketBase treat
  // requests as a visitor: saves fail with "not found" and lists come back empty.
  const isLoggedIn = computed(() => Boolean(token.value && user.value && pb.authStore.isValid));
  const isAdmin = computed(() => user.value?.role === 'admin');

  async function login(email, password) {
    const auth = await pb.collection(COLLECTIONS.staff).authWithPassword(email, password);
    user.value = auth.record;
    token.value = pb.authStore.token;
    return auth.record;
  }

  /** Confirm the saved session with PocketBase (renews the token); sign out if it was rejected. */
  async function refresh() {
    if (!pb.authStore.token) return false;
    try {
      await pb.collection(COLLECTIONS.staff).authRefresh();
      return true;
    } catch {
      logout();
      return false;
    }
  }

  function logout() {
    pb.authStore.clear();
    user.value = null;
    token.value = null;
  }

  return { user, token, isLoggedIn, isAdmin, login, logout, refresh };
});
