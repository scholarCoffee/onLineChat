import { createApp } from 'vue';
import App from './App.vue';
import { Button, Field, Popup, NavBar, Cell, CellGroup, Uploader } from 'vant';
import 'vant/lib/index.css';

const app = createApp(App);

app.use(Button);
app.use(Field);
app.use(Popup);
app.use(NavBar);
app.use(Cell);
app.use(CellGroup);
app.use(Uploader);

app.mount('#app');