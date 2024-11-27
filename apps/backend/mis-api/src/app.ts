import createApp from '@/lib/create-app'
import index from '@/routes/index.route'
import tasks from '@/routes/tasks/tasks.index'
import configureOpenAPI from './lib/configure-open-api'

const app = createApp()

// export const routes = [
//   index,
//   tasks,
// ]

configureOpenAPI(app)
// routes.forEach(route => app.route('/', route))

export const _app = app.route("", index).route("", tasks)
export default app
