"use strict";
/**
 * Created by caimingxun on 2016/10/16.
 */

require("babel-register")({
  presets: ["es2015", "stage-2"]
});
require("babel-polyfill");
require("./server");
