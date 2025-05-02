// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui-pro',
    '@vueuse/nuxt',
    'nuxt-auth-sanctum',
    '@pinia/nuxt'
  ],
  imports:{
    dirs:['./stores']
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  devtools: {
    enabled: true
  },
  sanctum: {
    baseUrl: 'https://thecnportal.hwwserver.com/',//'http://localhost:8000',
    mode:'token',
    userStateKey: 'sanctum.user.identity',
    redirectIfAuthenticated: false,
    redirectIfUnauthenticated: false,
    endpoints: {
      login: '/api/login',
      logout: '/api/logout',
      user: '/api/profile',
    },
    csrf: {
        cookie: 'XSRF-TOKEN',
        header: 'X-XSRF-TOKEN',
    },
    client: {
        retry: false,
        initialRequest: true,
    },
    redirect: {
      keepRequestedRoute: false,
      onLogin: '/',
      onLogout: '/',
      onAuthOnly: '/login',
      onGuestOnly: '/',
    },
    globalMiddleware: {
      enabled: false,
      allow404WithoutAuth: true,
    },
    logLevel: 5,
    appendPlugin: false,
  },
  css: ['~/assets/css/main.css'],

  // routeRules: {
  //   '/api/**': {
  //     cors: true
  //   }
  // },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-11',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
