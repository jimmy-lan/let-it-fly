/**
 * This file was added according to documentation of Why Did You Render
 * GitHub: https://github.com/welldone-software/why-did-you-render
 */

import React from "react";

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
