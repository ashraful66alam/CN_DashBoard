<template>
    <div class="flex flex-col gap-2 justify-center items-center w-full">
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

<script setup lang="ts">

const state = reactive({ email: '' ,password: ''})


// async function onSubmit() {
//   return new Promise<void>(res => setTimeout(res, 1000))
// }

async function validate(data: Partial<typeof state>) {
  if (!data.email?.length) return [{ name: 'email', message: 'Required' }]
  if (!data.password?.length) return [{ name: 'password', message: 'Required' }]
  return []
}


const { login, user } = useSanctumAuth();
const userStore = useUserStore();
// const userStore = useUserStore();
// const credentials = ref({
//   email: 'asad@test.com',
//   password: 'admin123'
// })
const credentials = computed(() => ({
  email: state.email,
  password: state.password
}))

const handleLogin = async () => {
  try {
    const res = await login(credentials.value);
    console.log(res);
    console.log('User after login:', user.value)
    userStore.setUser(user.value) // adapt if your response structure differs
    console.log('Login success');
  } catch (err) {
    console.error('Login error:', err);
  }
}
</script>