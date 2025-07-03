"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksandy"] = self["webpackChunksandy"] || []).push([["src_pages_Home_jsx"],{

/***/ "./src/pages/Home.jsx":
/*!****************************!*\
  !*** ./src/pages/Home.jsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/dist/development/chunk-QMGIS6GS.mjs\");\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./src/contexts/AuthContext.js\");\n\n\nfunction Home() {\n  const {\n    currentUser\n  } = (0,_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_0__.useAuth)();\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"text-center py-12\"\n  }, /*#__PURE__*/React.createElement(\"h1\", {\n    className: \"text-4xl font-bold mb-6\"\n  }, \"\\uD83D\\uDC69\\u200D\\uD83C\\uDFEB Welcome to Sandy\"), /*#__PURE__*/React.createElement(\"p\", {\n    className: \"text-xl mb-8\"\n  }, \"Your AI Teaching Companion\"), currentUser ? /*#__PURE__*/React.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {\n    to: \"/dashboard\",\n    className: \"btn-primary\"\n  }, \"Go to Dashboard\") : /*#__PURE__*/React.createElement(\"div\", {\n    className: \"space-x-4\"\n  }, /*#__PURE__*/React.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {\n    to: \"/login\",\n    className: \"btn-primary\"\n  }, \"Login\"), /*#__PURE__*/React.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {\n    to: \"/register\",\n    className: \"btn-secondary\"\n  }, \"Register\")));\n}\n\n//# sourceURL=webpack://sandy/./src/pages/Home.jsx?");

/***/ })

}]);