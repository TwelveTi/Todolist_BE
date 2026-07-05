const taskRoute = require('./taskRoute');
const API_PREFIX = "/api/v1";
function route(app) {

    // Định nghĩa các route cho công việc ở đây
    app.use(API_PREFIX, taskRoute);
}

module.exports = route;