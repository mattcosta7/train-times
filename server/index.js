"use strict";
/**
 * Created by caimingxun on 2016/10/16.
 */
if (process.env.NODE_ENV !== "production") require("dotenv").config();
require("babel-register")({
  presets: ["es2015", "stage-2"]
});
require("babel-polyfill");
require("./server");
