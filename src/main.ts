import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/App.scss'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import store from './store'

const app = createApp(App)

app.directive('demo', (el, binding) => {
    // this will be called for both `mounted` and `updated`
    const type = binding.arg
    const myFunction = binding.value.click
    el.addEventListener(type, myFunction)

    console.log(el)
    console.log(binding.value)
    el.innerHTML = `<div class='out-side-directive'>${
        binding.value.text
    }<div class='hint-directive'><img src='${require(`../src/assets/review/warn.png`)}' alt=''></div></div>`
    el.addEventListener('click', binding.value.click)

    el.style.color = binding.value.color
})
app.use(Quasar, quasarUserOptions)
    .use(router)
    .use(store)
    .mount('#app')
