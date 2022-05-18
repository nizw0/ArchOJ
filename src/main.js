import { Amplify } from 'aws-amplify'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import awsConfig from './aws-exports'
import router from './router'
Amplify.configure(awsConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
