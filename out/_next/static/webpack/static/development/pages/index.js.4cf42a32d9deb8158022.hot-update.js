webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_images_hero_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/images/hero.png */ "./assets/images/hero.png");
/* harmony import */ var _assets_images_hero_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_images_hero_png__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assets_images_waterFeature_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/images/waterFeature.png */ "./assets/images/waterFeature.png");
/* harmony import */ var _assets_images_waterFeature_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_images_waterFeature_png__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_images_treehouse_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/images/treehouse.jpg */ "./assets/images/treehouse.jpg");
/* harmony import */ var _assets_images_treehouse_jpg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_images_treehouse_jpg__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _assets_images_skatepark_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/images/skatepark.png */ "./assets/images/skatepark.png");
/* harmony import */ var _assets_images_skatepark_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_images_skatepark_png__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _assets_images_pumptrack_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/images/pumptrack.png */ "./assets/images/pumptrack.png");
/* harmony import */ var _assets_images_pumptrack_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_images_pumptrack_png__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _assets_images_entertainment_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/images/entertainment.png */ "./assets/images/entertainment.png");
/* harmony import */ var _assets_images_entertainment_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_images_entertainment_png__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _assets_images_landmark_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../assets/images/landmark.png */ "./assets/images/landmark.png");
/* harmony import */ var _assets_images_landmark_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_images_landmark_png__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _assets_images_icerink_jpg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../assets/images/icerink.jpg */ "./assets/images/icerink.jpg");
/* harmony import */ var _assets_images_icerink_jpg__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_assets_images_icerink_jpg__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _assets_images_plans_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../assets/images/plans.png */ "./assets/images/plans.png");
/* harmony import */ var _assets_images_plans_png__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_assets_images_plans_png__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _assets_images_trees_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../assets/images/trees.svg */ "./assets/images/trees.svg");
/* harmony import */ var _assets_images_trees_svg__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_assets_images_trees_svg__WEBPACK_IMPORTED_MODULE_12__);















var _jsxFileName = "/Users/tannerlinsley/GitHub/valleydesignbuild/pages/index.js";













var features = [{
  label: 'Water Features',
  image: _assets_images_waterFeature_png__WEBPACK_IMPORTED_MODULE_4___default.a,
  href: '/'
}, {
  label: 'Play Houses',
  image: _assets_images_treehouse_jpg__WEBPACK_IMPORTED_MODULE_5___default.a,
  href: '/'
}, {
  label: 'Skate + Bike',
  image: _assets_images_skatepark_png__WEBPACK_IMPORTED_MODULE_6___default.a,
  href: '/'
}, {
  label: 'Pumptracks',
  image: _assets_images_pumptrack_png__WEBPACK_IMPORTED_MODULE_7___default.a,
  href: '/'
}, {
  label: 'Entertainment',
  image: _assets_images_entertainment_png__WEBPACK_IMPORTED_MODULE_8___default.a,
  href: '/'
}, {
  label: 'Landmarks',
  image: _assets_images_landmark_png__WEBPACK_IMPORTED_MODULE_9___default.a,
  href: '/'
}, {
  label: 'Winterscape',
  image: _assets_images_icerink_jpg__WEBPACK_IMPORTED_MODULE_10___default.a,
  href: '/'
}];
var Button = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].button.withConfig({
  displayName: "pages__Button",
  componentId: "sc-1cvwks4-0"
})(["padding:1rem;margin:0.5rem;appearance:none;background:white;color:#002838;border:0;border-radius:0.5rem;font-size:1.5rem;font-family:'Bebas Neue',sans-serif;box-shadow:0 5px 20px rgba(0,0,0,0.5);transition:all 0.3s ease;:hover{cursor:pointer;box-shadow:0 20px 40px rgba(0,0,0,0.5);z-index:1;}"]);

var _StyledDiv = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div.withConfig({
  displayName: "pages___StyledDiv",
  componentId: "sc-1cvwks4-1"
})([""]);

var _StyledDiv2 = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div.withConfig({
  displayName: "pages___StyledDiv2",
  componentId: "sc-1cvwks4-2"
})(["background:url(", ");background-size:cover;background-position:center;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30vh 5vw;color:white;text-align:center;text-shadow:0 5px 20px black,0 10px 40px black,0 20px 60px black;"], _assets_images_hero_png__WEBPACK_IMPORTED_MODULE_3___default.a);

var _StyledH = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].h1.withConfig({
  displayName: "pages___StyledH",
  componentId: "sc-1cvwks4-3"
})(["font-size:4rem;margin-bottom:1rem;"]);

var _StyledP = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].p.withConfig({
  displayName: "pages___StyledP",
  componentId: "sc-1cvwks4-4"
})(["width:400px;max-width:100%;font-size:2rem;"]);

var _StyledDiv3 = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div.withConfig({
  displayName: "pages___StyledDiv3",
  componentId: "sc-1cvwks4-5"
})(["border-top:solid 0.5rem black;background:black;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;font-size:2.5rem;font-weight:bolder;> *{position:relative;flex:1 0 300px;background:black;color:white;overflow:hidden;max-height:300px;:before{content:'';display:block;padding-bottom:80%;}.background{position:absolute;top:0;bottom:0;left:0;right:0;background-size:cover;background-position:center;transition:all 0.5s ease;}:hover > .background{transform:scale(1.1);}.mask{position:absolute;top:0;bottom:0;left:0;right:0;background:linear-gradient( to bottom,transparent,transparent,rgba(0,0,0,0.5) );}span{position:absolute;bottom:0;left:0;opacity:0.6;padding:0.3rem 0.5rem;text-shadow:0 0 20px black,0 0 20px black;}}"]);

var _StyledDiv4 = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div.withConfig({
  displayName: "pages___StyledDiv4",
  componentId: "sc-1cvwks4-6"
})(["position:relative;padding:0 5vw;backfround:white;display:flex;justify-content:center;"]);

var _StyledDiv5 = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div.withConfig({
  displayName: "pages___StyledDiv5",
  componentId: "sc-1cvwks4-7"
})(["position:absolute;top:0;bottom:0;left:0;right:0;background:url(", ");background-size:cover;background-position:center;opacity:0.25;"], _assets_images_plans_png__WEBPACK_IMPORTED_MODULE_11___default.a);

var _StyledDiv6 = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div.withConfig({
  displayName: "pages___StyledDiv6",
  componentId: "sc-1cvwks4-8"
})(["position:relative;padding:10vh 0;width:940px;max-width:100%;"]);

var _StyledImg = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].img.withConfig({
  displayName: "pages___StyledImg",
  componentId: "sc-1cvwks4-9"
})(["position:absolute;left:650px;bottom:0;height:80%;"]);

var _StyledH2 = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].h2.withConfig({
  displayName: "pages___StyledH2",
  componentId: "sc-1cvwks4-10"
})(["font-size:3.5rem;margin-bottom:1rem;"]);

var _StyledH3 = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].h3.withConfig({
  displayName: "pages___StyledH3",
  componentId: "sc-1cvwks4-11"
})(["font-family:'PT Sans Narrow',sans-serif;font-size:2.5rem;font-style:italic;margin-bottom:2rem;"]);

var _StyledP2 = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].p.withConfig({
  displayName: "pages___StyledP2",
  componentId: "sc-1cvwks4-12"
})(["font-family:'PT Sans Narrow',sans-serif;font-size:1.7rem;line-height:1.3;width:500px;max-width:100%;"]);

var _StyledDiv7 = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div.withConfig({
  displayName: "pages___StyledDiv7",
  componentId: "sc-1cvwks4-13"
})(["padding:30vh 5vw;border-top:solid 0.5rem black;background-image:linear-gradient(147deg,#004f6f 0%,#002e48 99%);color:white;display:flex;flex-direction:column;align-items:center;"]);

var _StyledH4 = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].h2.withConfig({
  displayName: "pages___StyledH4",
  componentId: "sc-1cvwks4-14"
})(["font-size:3.8rem;color:#ffffff;text-align:center;margin-bottom:0.5rem;"]);

var _StyledH5 = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].h3.withConfig({
  displayName: "pages___StyledH5",
  componentId: "sc-1cvwks4-15"
})(["font-size:2.5rem;color:#ffffff;text-align:center;margin-bottom:1.5rem;"]);

function Home() {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StyledDiv, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StyledDiv2, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StyledH, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: this
  }, "Ambitious Experiences"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StyledP, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: this
  }, "For the adventurer, recreater and child in all of us")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StyledDiv3, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    },
    __self: this
  }, features.map(function (_ref) {
    var label = _ref.label,
        image = _ref.image,
        href = _ref.href;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
      href: href,
      key: href,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 152
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 153
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "background",
      style: {
        backgroundImage: "url(".concat(image, ")")
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 154
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "mask",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 160
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 161
      },
      __self: this
    }, label)));
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StyledDiv4, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 166
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StyledDiv5, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 175
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StyledDiv6, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 188
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StyledImg, {
    src: _assets_images_trees_svg__WEBPACK_IMPORTED_MODULE_12___default.a,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 196
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StyledH2, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 205
    },
    __self: this
  }, "We are dreamers and builders"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StyledH3, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 213
    },
    __self: this
  }, "All rolled into one."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StyledP2, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 223
    },
    __self: this
  }, "At Valley Design Build, we believe that a home is more than just a house and that our greatest moments of adventure, recreation, entertainment and escape can happen in our own backyards."))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StyledDiv7, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 238
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StyledH4, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 249
    },
    __self: this
  }, "You bring the idea."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StyledH5, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 259
    },
    __self: this
  }, "We'll do the rest."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 269
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Button, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 270
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ion-icon", {
    name: "call",
    style: {
      marginRight: '.5rem'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 271
    },
    __self: this
  }), " Call Now"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Button, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 273
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ion-icon", {
    name: "chatbubbles",
    style: {
      marginRight: '.5rem'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 274
    },
    __self: this
  }), ' ', "Message Us"))));
}

/***/ })

})
//# sourceMappingURL=index.js.4cf42a32d9deb8158022.hot-update.js.map