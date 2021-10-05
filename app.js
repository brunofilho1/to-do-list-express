const express = require('express');
const path = require('path');

const checkListRouter = require('./src/routes/checkList');
const taskRouter = require('./src/routes/task');
const rootRouter = require('./src/routes/index');
const methodOverride = require('method-override');


require('./config/database');


const app = express();
//método pra usar um dos principais middlewares
app.use(express.json()); // verifica se tem algum json quando a chamada é feita e se ele deve processar e deixar no req.body
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method', {methods: ['POST', 'GET']}));

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');


app.use('/', rootRouter)
app.use('/checklists', checkListRouter);
app.use('/checklists', taskRouter.checklistDepedent);
app.use('/tasks', taskRouter.simple)


app.listen(3000, () => {
    console.log('Server iniciado...');
})