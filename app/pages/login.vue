<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
const messages = ref([])
let source
const state = reactive({ email: '', password: '' })
const userData = ref(null)
onMounted(() => {
  source = new EventSource('http://localhost:3000/api/stream') // full URL

  source.onmessage = (event) => {
    messages.value.push(event.data)
    const payload = JSON.parse(event.data)
    userData.value = payload
    state.email = userData.value?.user.email || ''
    state.password = userData.value?.user.password || ''
  }

  source.onerror = (err) => {
    console.error('SSE error:', err)
    source.close()
  }
})

onUnmounted(() => {
  source?.close()
})
// async function onSubmit() {
//   return new Promise<void>(res => setTimeout(res, 1000))
// }

async function validate(data: Partial<typeof state>) {
  if (!data.email?.length) return [{ name: 'email', message: 'Required' }]
  if (!data.password?.length) return [{ name: 'password', message: 'Required' }]
  return []
}

const toast = useToast()
const { login, user } = useSanctumAuth();
const userStore = useUserStore();
// const userStore = useUserStore();
// const credentials = ref({
//   email: 'asad@test.com',
//   password: 'admin123'
// })
// const credentials = computed(() => ({
//   email: state.email,
//   password: state.password
// }))
const credentials = computed(() => ({
  email: state.email,
  password: state.password
}))

const handleLogin = async () => {
  try {
    const res = await login(credentials.value);
    console.log(res);
    console.log('User after login:', user.value)
    userStore.setUser(user.value)
    console.log('Login success');
    toast.add({
    title: 'Congrates',
    description: 'Login was a success',
  })
  } catch (err) {
    console.error('Login error:', err);
    toast.add({
    title: 'Uh oh! Something went wrong.',
    description: `There was a problem with your request. ${err}`,
  })
  }
}
</script>


<template>

  <div class="flex flex-col gap-2 justify-center items-center w-full">
    <div class="p-4">
      <h1 class="text-xl font-bold">SSE Messages</h1>
      <!-- <ul>
        <li v-for="(msg, i) in messages" :key="i">{{ msg }}</li>
      </ul> -->
      <!-- <p>{{ userData?.token }}</p> -->
      <p>{{ userData?.token }}</p>
      <!-- <p>{{ userData?.email }}</p> -->

    </div>
    <h1 class="" color="primary">Login Page</h1>
    <UForm :state="state" :validate="validate" @submit="handleLogin">
      <UFormField name="email" label="Email">
        <UInput v-model="state.email" />
      </UFormField>
      <UFormField name="password" label="Password">
        <UInput v-model="state.password" />
      </UFormField>
      <UButton type="submit" class="mt-2" loading-auto>
        Login
      </UButton>
    </UForm>
    <!-- <p>{{ state.email }}</p>
        <p>{{ state.password }}</p> -->

  </div>
</template>
