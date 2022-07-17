const routes = require("next-routes")();

routes.add("/upload/:cid/create", "/preview");

module.exports = routes;
