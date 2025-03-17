import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { Button, Field, Popup, ActionSheet, Uploader, Dialog, NavBar, Cell, CellGroup, Icon } from 'vant';
import 'vant/lib/index.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Button);
app.use(Field);
app.use(Popup);
app.use(ActionSheet);
app.use(Uploader);
app.use(Dialog);
app.use(NavBar);
app.use(Cell);
app.use(CellGroup);
app.use(Icon);

app.mount('#app');