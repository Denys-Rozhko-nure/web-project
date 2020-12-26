/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!************************************!*\
  !*** ./src/js/fibonacci-worker.js ***!
  \************************************/
eval("onmessage = (e) => {\r\n  const n = +e.data;\r\n  if(n == 1) return \"<b>1</b>\";\r\n  if(n == 2) return \"1 <b>1</b>\"\r\n  let result = \"1 1\";\r\n  let a = b = 1;\r\n\r\n  for(let i = 3; i < n; ++i) {\r\n    let curr = a + b;\r\n    result += ` ${curr}`;\r\n    a = b;\r\n    b = curr;\r\n  }\r\n  result += `<b>${a+b}</b>`;\r\n\r\n  postMessage(result);\r\n}\n\n//# sourceURL=webpack://web-t/./src/js/fibonacci-worker.js?");
/******/ })()
;