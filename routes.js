const routes = require("next-routes")();

routes.add("/upload/:tokenId/create", "/preview");

module.exports = routes;
