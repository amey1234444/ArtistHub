"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/requests/[id]/route";
exports.ids = ["app/api/requests/[id]/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Frequests%2F%5Bid%5D%2Froute&page=%2Fapi%2Frequests%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frequests%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5CArtistHub-main%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5CArtistHub-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Frequests%2F%5Bid%5D%2Froute&page=%2Fapi%2Frequests%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frequests%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5CArtistHub-main%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5CArtistHub-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_asus_OneDrive_Desktop_ArtistHub_main_src_app_api_requests_id_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/requests/[id]/route.ts */ \"(rsc)/./src/app/api/requests/[id]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/requests/[id]/route\",\n        pathname: \"/api/requests/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/requests/[id]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\asus\\\\OneDrive\\\\Desktop\\\\ArtistHub-main\\\\src\\\\app\\\\api\\\\requests\\\\[id]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_asus_OneDrive_Desktop_ArtistHub_main_src_app_api_requests_id_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/requests/[id]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZyZXF1ZXN0cyUyRiU1QmlkJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZyZXF1ZXN0cyUyRiU1QmlkJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcmVxdWVzdHMlMkYlNUJpZCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhc3VzJTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDQXJ0aXN0SHViLW1haW4lNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2FzdXMlNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUNBcnRpc3RIdWItbWFpbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDMkM7QUFDeEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jcmVhdGl2ZS1oZWxwZXItYXBwLz9kNmMxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGFzdXNcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxBcnRpc3RIdWItbWFpblxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxyZXF1ZXN0c1xcXFxbaWRdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9yZXF1ZXN0cy9baWRdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcmVxdWVzdHMvW2lkXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvcmVxdWVzdHMvW2lkXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGFzdXNcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxBcnRpc3RIdWItbWFpblxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxyZXF1ZXN0c1xcXFxbaWRdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9yZXF1ZXN0cy9baWRdL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Frequests%2F%5Bid%5D%2Froute&page=%2Fapi%2Frequests%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frequests%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5CArtistHub-main%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5CArtistHub-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/requests/[id]/route.ts":
/*!********************************************!*\
  !*** ./src/app/api/requests/[id]/route.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PATCH: () => (/* binding */ PATCH)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var _models_Request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/models/Request */ \"(rsc)/./src/models/Request.ts\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nasync function PATCH(req, { params }) {\n    try {\n        await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n        // Get token from cookies\n        const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_3__.cookies)();\n        const token = cookieStore.get(\"token\")?.value;\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        // Verify token and get user data\n        const decoded = (0,jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__.verify)(token, process.env.JWT_SECRET);\n        if (!decoded || !decoded.userId || decoded.role !== \"artist\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const data = await req.json();\n        const request = await _models_Request__WEBPACK_IMPORTED_MODULE_2__[\"default\"].findOneAndUpdate({\n            _id: params.id,\n            artistId: decoded.userId\n        }, {\n            status: data.status\n        }, {\n            new: true\n        }).populate(\"artistId managerId\");\n        if (!request) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Request not found\"\n            }, {\n                status: 404\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(request);\n    } catch (error) {\n        console.error(\"Error updating request:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Internal server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9yZXF1ZXN0cy9baWRdL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBd0Q7QUFDdkI7QUFDTTtBQUNBO0FBQ0Q7QUFFL0IsZUFBZUssTUFDcEJDLEdBQWdCLEVBQ2hCLEVBQUVDLE1BQU0sRUFBOEI7SUFFdEMsSUFBSTtRQUNGLE1BQU1OLG1EQUFTQTtRQUVmLHlCQUF5QjtRQUN6QixNQUFNTyxjQUFjTCxxREFBT0E7UUFDM0IsTUFBTU0sUUFBUUQsWUFBWUUsR0FBRyxDQUFDLFVBQVVDO1FBRXhDLElBQUksQ0FBQ0YsT0FBTztZQUNWLE9BQU9ULHFEQUFZQSxDQUFDWSxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBZSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDcEU7UUFFQSxpQ0FBaUM7UUFDakMsTUFBTUMsVUFBVVgsb0RBQU1BLENBQUNLLE9BQU9PLFFBQVFDLEdBQUcsQ0FBQ0MsVUFBVTtRQUVwRCxJQUFJLENBQUNILFdBQVcsQ0FBQ0EsUUFBUUksTUFBTSxJQUFJSixRQUFRSyxJQUFJLEtBQUssVUFBVTtZQUM1RCxPQUFPcEIscURBQVlBLENBQUNZLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFlLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNwRTtRQUVBLE1BQU1PLE9BQU8sTUFBTWYsSUFBSU0sSUFBSTtRQUUzQixNQUFNVSxVQUFVLE1BQU1wQix1REFBT0EsQ0FBQ3FCLGdCQUFnQixDQUM1QztZQUFFQyxLQUFLakIsT0FBT2tCLEVBQUU7WUFBRUMsVUFBVVgsUUFBUUksTUFBTTtRQUFDLEdBQzNDO1lBQUVMLFFBQVFPLEtBQUtQLE1BQU07UUFBQyxHQUN0QjtZQUFFYSxLQUFLO1FBQUssR0FDWkMsUUFBUSxDQUFDO1FBRVgsSUFBSSxDQUFDTixTQUFTO1lBQ1osT0FBT3RCLHFEQUFZQSxDQUFDWSxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBb0IsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3pFO1FBRUEsT0FBT2QscURBQVlBLENBQUNZLElBQUksQ0FBQ1U7SUFDM0IsRUFBRSxPQUFPVCxPQUFPO1FBQ2RnQixRQUFRaEIsS0FBSyxDQUFDLDJCQUEyQkE7UUFDekMsT0FBT2IscURBQVlBLENBQUNZLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXdCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQzdFO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jcmVhdGl2ZS1oZWxwZXItYXBwLy4vc3JjL2FwcC9hcGkvcmVxdWVzdHMvW2lkXS9yb3V0ZS50cz9kNDRhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgY29ubmVjdERCIGZyb20gJ0AvbGliL2RiJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJ0AvbW9kZWxzL1JlcXVlc3QnO1xuaW1wb3J0IHsgY29va2llcyB9IGZyb20gJ25leHQvaGVhZGVycyc7XG5pbXBvcnQgeyB2ZXJpZnkgfSBmcm9tICdqc29ud2VidG9rZW4nO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUEFUQ0goXG4gIHJlcTogTmV4dFJlcXVlc3QsXG4gIHsgcGFyYW1zIH06IHsgcGFyYW1zOiB7IGlkOiBzdHJpbmcgfSB9XG4pIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBjb25uZWN0REIoKTtcbiAgICBcbiAgICAvLyBHZXQgdG9rZW4gZnJvbSBjb29raWVzXG4gICAgY29uc3QgY29va2llU3RvcmUgPSBjb29raWVzKCk7XG4gICAgY29uc3QgdG9rZW4gPSBjb29raWVTdG9yZS5nZXQoJ3Rva2VuJyk/LnZhbHVlO1xuXG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuXG4gICAgLy8gVmVyaWZ5IHRva2VuIGFuZCBnZXQgdXNlciBkYXRhXG4gICAgY29uc3QgZGVjb2RlZCA9IHZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCEpIGFzIHsgdXNlcklkOiBzdHJpbmcsIHJvbGU6IHN0cmluZyB9O1xuICAgIFxuICAgIGlmICghZGVjb2RlZCB8fCAhZGVjb2RlZC51c2VySWQgfHwgZGVjb2RlZC5yb2xlICE9PSAnYXJ0aXN0Jykge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcS5qc29uKCk7XG4gICAgXG4gICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IFJlcXVlc3QuZmluZE9uZUFuZFVwZGF0ZShcbiAgICAgIHsgX2lkOiBwYXJhbXMuaWQsIGFydGlzdElkOiBkZWNvZGVkLnVzZXJJZCB9LFxuICAgICAgeyBzdGF0dXM6IGRhdGEuc3RhdHVzIH0sXG4gICAgICB7IG5ldzogdHJ1ZSB9XG4gICAgKS5wb3B1bGF0ZSgnYXJ0aXN0SWQgbWFuYWdlcklkJyk7XG5cbiAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnUmVxdWVzdCBub3QgZm91bmQnIH0sIHsgc3RhdHVzOiA0MDQgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHJlcXVlc3QpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwZGF0aW5nIHJlcXVlc3Q6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImNvbm5lY3REQiIsIlJlcXVlc3QiLCJjb29raWVzIiwidmVyaWZ5IiwiUEFUQ0giLCJyZXEiLCJwYXJhbXMiLCJjb29raWVTdG9yZSIsInRva2VuIiwiZ2V0IiwidmFsdWUiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJkZWNvZGVkIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJ1c2VySWQiLCJyb2xlIiwiZGF0YSIsInJlcXVlc3QiLCJmaW5kT25lQW5kVXBkYXRlIiwiX2lkIiwiaWQiLCJhcnRpc3RJZCIsIm5ldyIsInBvcHVsYXRlIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/requests/[id]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nif (!process.env.MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable inside .env\");\n}\nconst MONGODB_URI = process.env.MONGODB_URI;\nlet cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function connectDB() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: true\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            return mongoose;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectDB);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFnQztBQUVoQyxJQUFJLENBQUNDLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVyxFQUFFO0lBQzVCLE1BQU0sSUFBSUMsTUFBTTtBQUNsQjtBQUVBLE1BQU1ELGNBQWNGLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVztBQUUzQyxJQUFJRSxTQUFTQyxPQUFPTixRQUFRO0FBRTVCLElBQUksQ0FBQ0ssUUFBUTtJQUNYQSxTQUFTQyxPQUFPTixRQUFRLEdBQUc7UUFBRU8sTUFBTTtRQUFNQyxTQUFTO0lBQUs7QUFDekQ7QUFFQSxlQUFlQztJQUNiLElBQUlKLE9BQU9FLElBQUksRUFBRTtRQUNmLE9BQU9GLE9BQU9FLElBQUk7SUFDcEI7SUFFQSxJQUFJLENBQUNGLE9BQU9HLE9BQU8sRUFBRTtRQUNuQixNQUFNRSxPQUFPO1lBQ1hDLGdCQUFnQjtRQUNsQjtRQUVBTixPQUFPRyxPQUFPLEdBQUdSLHVEQUFnQixDQUFDRyxhQUFhTyxNQUFNRyxJQUFJLENBQUMsQ0FBQ2I7WUFDekQsT0FBT0E7UUFDVDtJQUNGO0lBRUEsSUFBSTtRQUNGSyxPQUFPRSxJQUFJLEdBQUcsTUFBTUYsT0FBT0csT0FBTztJQUNwQyxFQUFFLE9BQU9NLEdBQUc7UUFDVlQsT0FBT0csT0FBTyxHQUFHO1FBQ2pCLE1BQU1NO0lBQ1I7SUFFQSxPQUFPVCxPQUFPRSxJQUFJO0FBQ3BCO0FBRUEsaUVBQWVFLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jcmVhdGl2ZS1oZWxwZXItYXBwLy4vc3JjL2xpYi9kYi50cz85ZTRmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5cbmlmICghcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgZGVmaW5lIHRoZSBNT05HT0RCX1VSSSBlbnZpcm9ubWVudCB2YXJpYWJsZSBpbnNpZGUgLmVudicpO1xufVxuXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xuXG5sZXQgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlO1xuXG5pZiAoIWNhY2hlZCkge1xuICBjYWNoZWQgPSBnbG9iYWwubW9uZ29vc2UgPSB7IGNvbm46IG51bGwsIHByb21pc2U6IG51bGwgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY29ubmVjdERCKCkge1xuICBpZiAoY2FjaGVkLmNvbm4pIHtcbiAgICByZXR1cm4gY2FjaGVkLmNvbm47XG4gIH1cblxuICBpZiAoIWNhY2hlZC5wcm9taXNlKSB7XG4gICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgIGJ1ZmZlckNvbW1hbmRzOiB0cnVlLFxuICAgIH07XG5cbiAgICBjYWNoZWQucHJvbWlzZSA9IG1vbmdvb3NlLmNvbm5lY3QoTU9OR09EQl9VUkksIG9wdHMpLnRoZW4oKG1vbmdvb3NlKSA9PiB7XG4gICAgICByZXR1cm4gbW9uZ29vc2U7XG4gICAgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWQucHJvbWlzZSA9IG51bGw7XG4gICAgdGhyb3cgZTtcbiAgfVxuXG4gIHJldHVybiBjYWNoZWQuY29ubjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdERCOyJdLCJuYW1lcyI6WyJtb25nb29zZSIsInByb2Nlc3MiLCJlbnYiLCJNT05HT0RCX1VSSSIsIkVycm9yIiwiY2FjaGVkIiwiZ2xvYmFsIiwiY29ubiIsInByb21pc2UiLCJjb25uZWN0REIiLCJvcHRzIiwiYnVmZmVyQ29tbWFuZHMiLCJjb25uZWN0IiwidGhlbiIsImUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./src/models/Request.ts":
/*!*******************************!*\
  !*** ./src/models/Request.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst requestSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    eventName: {\n        type: String,\n        required: true\n    },\n    eventDate: {\n        type: String,\n        required: true\n    },\n    location: {\n        type: String,\n        required: true\n    },\n    details: {\n        type: String,\n        required: true\n    },\n    amount: {\n        type: String,\n        required: true\n    },\n    status: {\n        type: String,\n        enum: [\n            \"PENDING\",\n            \"ACCEPTED\",\n            \"REJECTED\"\n        ],\n        default: \"PENDING\"\n    },\n    paymentStatus: {\n        type: String,\n        enum: [\n            \"UNPAID\",\n            \"PAID\"\n        ],\n        default: \"UNPAID\"\n    },\n    artistId: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n        ref: \"User\",\n        required: true\n    },\n    managerId: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n        ref: \"User\",\n        required: true\n    },\n    createdAt: {\n        type: Date,\n        default: Date.now\n    }\n});\nconst Request = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Request || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Request\", requestSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Request);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbW9kZWxzL1JlcXVlc3QudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGdCQUFnQixJQUFJRCx3REFBZSxDQUFDO0lBQ3hDRyxXQUFXO1FBQUVDLE1BQU1DO1FBQVFDLFVBQVU7SUFBSztJQUMxQ0MsV0FBVztRQUFFSCxNQUFNQztRQUFRQyxVQUFVO0lBQUs7SUFDMUNFLFVBQVU7UUFBRUosTUFBTUM7UUFBUUMsVUFBVTtJQUFLO0lBQ3pDRyxTQUFTO1FBQUVMLE1BQU1DO1FBQVFDLFVBQVU7SUFBSztJQUN4Q0ksUUFBUTtRQUFFTixNQUFNQztRQUFRQyxVQUFVO0lBQUs7SUFDdkNLLFFBQVE7UUFBRVAsTUFBTUM7UUFBUU8sTUFBTTtZQUFDO1lBQVc7WUFBWTtTQUFXO1FBQUVDLFNBQVM7SUFBVTtJQUN0RkMsZUFBZTtRQUFFVixNQUFNQztRQUFRTyxNQUFNO1lBQUM7WUFBVTtTQUFPO1FBQUVDLFNBQVM7SUFBUztJQUMzRUUsVUFBVTtRQUFFWCxNQUFNSix3REFBZSxDQUFDZ0IsS0FBSyxDQUFDQyxRQUFRO1FBQUVDLEtBQUs7UUFBUVosVUFBVTtJQUFLO0lBQzlFYSxXQUFXO1FBQUVmLE1BQU1KLHdEQUFlLENBQUNnQixLQUFLLENBQUNDLFFBQVE7UUFBRUMsS0FBSztRQUFRWixVQUFVO0lBQUs7SUFDL0VjLFdBQVc7UUFBRWhCLE1BQU1pQjtRQUFNUixTQUFTUSxLQUFLQyxHQUFHO0lBQUM7QUFDN0M7QUFFQSxNQUFNQyxVQUFVdkIsd0RBQWUsQ0FBQ3VCLE9BQU8sSUFBSXZCLHFEQUFjLENBQUMsV0FBV0M7QUFDckUsaUVBQWVzQixPQUFPQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3JlYXRpdmUtaGVscGVyLWFwcC8uL3NyYy9tb2RlbHMvUmVxdWVzdC50cz8xMDFiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5cbmNvbnN0IHJlcXVlc3RTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcbiAgZXZlbnROYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgZXZlbnREYXRlOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgbG9jYXRpb246IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICBkZXRhaWxzOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgYW1vdW50OiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgc3RhdHVzOiB7IHR5cGU6IFN0cmluZywgZW51bTogWydQRU5ESU5HJywgJ0FDQ0VQVEVEJywgJ1JFSkVDVEVEJ10sIGRlZmF1bHQ6ICdQRU5ESU5HJyB9LFxuICBwYXltZW50U3RhdHVzOiB7IHR5cGU6IFN0cmluZywgZW51bTogWydVTlBBSUQnLCAnUEFJRCddLCBkZWZhdWx0OiAnVU5QQUlEJyB9LFxuICBhcnRpc3RJZDogeyB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogJ1VzZXInLCByZXF1aXJlZDogdHJ1ZSB9LFxuICBtYW5hZ2VySWQ6IHsgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLCByZWY6ICdVc2VyJywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgY3JlYXRlZEF0OiB7IHR5cGU6IERhdGUsIGRlZmF1bHQ6IERhdGUubm93IH1cbn0pO1xuXG5jb25zdCBSZXF1ZXN0ID0gbW9uZ29vc2UubW9kZWxzLlJlcXVlc3QgfHwgbW9uZ29vc2UubW9kZWwoJ1JlcXVlc3QnLCByZXF1ZXN0U2NoZW1hKTtcbmV4cG9ydCBkZWZhdWx0IFJlcXVlc3Q7Il0sIm5hbWVzIjpbIm1vbmdvb3NlIiwicmVxdWVzdFNjaGVtYSIsIlNjaGVtYSIsImV2ZW50TmFtZSIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsImV2ZW50RGF0ZSIsImxvY2F0aW9uIiwiZGV0YWlscyIsImFtb3VudCIsInN0YXR1cyIsImVudW0iLCJkZWZhdWx0IiwicGF5bWVudFN0YXR1cyIsImFydGlzdElkIiwiVHlwZXMiLCJPYmplY3RJZCIsInJlZiIsIm1hbmFnZXJJZCIsImNyZWF0ZWRBdCIsIkRhdGUiLCJub3ciLCJSZXF1ZXN0IiwibW9kZWxzIiwibW9kZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/models/Request.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Frequests%2F%5Bid%5D%2Froute&page=%2Fapi%2Frequests%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frequests%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5CArtistHub-main%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Casus%5COneDrive%5CDesktop%5CArtistHub-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();