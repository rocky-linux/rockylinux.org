import "@testing-library/jest-dom";
import * as matchers from "jest-extended";

expect.extend(matchers);

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
