<template>
    <div class="flex flex-col gap-2 justify-center items-center w-full">
        <h1 class="text-green-500">Logout Page</h1>
        <UButton @click="handleLogout" class="font-bold rounded-full">
            Log Out
        </UButton>
    </div>

</template>

<script setup>
const { logout, user } = useSanctumAuth();
const userStore = useUserStore();
console.log('user => ' + user.value.name);
const handleLogout = async () => {
  try {
    await logout()
    userStore.clearUser() ;
    console.log('Logged out')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>