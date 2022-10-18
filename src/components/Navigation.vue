<template>
  <header class="bg-at-light-green text-white">
    <nav
      class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row"
    >
      <div class="flex items-center gap-x-4">
        <img class="w-14" src="../assets/images/dumbbell-light.png" alt="" />
        <h1 class="text-log">Bijaya Giri Active Tracer</h1>
      </div>

      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link class="cursor-pointer" :to="{ name: 'Home' }"
          >Home
        </router-link>
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'Create' }"
          >Create
        </router-link>
        <router-link v-if="!user" class="cursor-pointer" :to="{ name: 'Login' }"
          >Login
        </router-link>
        <li @click="logout" v-if="user" class="cursor-pointer">Logout</li>
      </ul>
      <img
              class="h-3.5 w-auto"
              src="@/assets/images/pencil-light.png"
              alt=""
            />
    </nav>
  </header>
</template>

<script>

export default {
  setup() {
    // Get user from store
    const user = computed(() => store.state.user);
    // Setup ref to router
    const router = useRouter();
    // Logout function
    const logout = async () => {
      await supabase.auth.signOut();
      router.push({ name: "Home" });
    };

    return { logout, user };
  },
};
</script>
