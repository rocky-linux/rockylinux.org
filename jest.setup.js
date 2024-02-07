import "@testing-library/jest-dom";
global.TextEncoder = require("util").TextEncoder;
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
