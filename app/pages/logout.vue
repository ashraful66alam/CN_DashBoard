
<script setup>
import { useToast } from '#imports'
const toast = useToast()
const { logout, user } = useSanctumAuth();
const userStore = useUserStore();
console.log('user => ' + user.value.name);
const handleLogout = async () => {
  try {
    await logout()
    userStore.clearUser() 
    toast.add({
      title: 'Success',
      description: 'Logout was a success',
    })
  } catch (error) {
    console.error('Logout failed:', error)
    toast.add({
      title: 'Failed',
      description: 'Logout was Failed',
    })
  }
}
</script>

<template>
  <div class="flex flex-col gap-2 justify-center items-center w-full">
      <h1 class="text-green-500">Logout Page</h1>
      <UButton @click="handleLogout" class="font-bold rounded-full">
          Log Out
      </UButton>
  </div>

</template>
