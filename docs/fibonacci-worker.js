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
eval("onmessage = (e) => {\r\n  const n = BigInt(e.data);\r\n  if(n == 1) {\r\n    postMessage(\"<strong>1</strong>\");\r\n    return;\r\n  }\r\n  if(n == 2) {\r\n    postMessage(\"1 <strong>1</strong>\");\r\n    return;\r\n  }\r\n\r\n  let result = \"1 1\";\r\n  let a = b = BigInt(1);\r\n\r\n  for(let i = 3; i < n; ++i) {\r\n    let curr = a + b;\r\n    result += ` ${curr}`;\r\n    a = b;\r\n    b = curr;\r\n  }\r\n  result += `<strong> ${a+b}</strong>`;\r\n\r\n  postMessage(result);\r\n}\n\n//# sourceURL=webpack://web-t/./src/js/fibonacci-worker.js?");
/******/ })()
;