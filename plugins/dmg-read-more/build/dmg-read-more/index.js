/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dmg-read-more/block.json":
/*!**************************************!*\
  !*** ./src/dmg-read-more/block.json ***!
  \**************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"dmg/read-more","version":"1.0.0","title":"DMG Read More","category":"widgets","description":"Search for a published post and add a link to it in the post content.","example":{},"supports":{"html":false},"attributes":{"postId":{"type":"number"},"postTitle":{"type":"string"},"postUrl":{"type":"string"}},"textdomain":"dmg-read-more","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');

/***/ }),

/***/ "./src/dmg-read-more/components/pagination.tsx":
/*!*****************************************************!*\
  !*** ./src/dmg-read-more/components/pagination.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Pagination)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



function getPagination(currentPage, total) {
  const delta = 1; // Number of pages to show around the current page.
  const range = [];
  const rangeWithDots = [];
  let lastPageInRange;

  // Always show first and last page, and pages around the current page.
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || i >= currentPage - delta && i <= currentPage + delta) {
      range.push(i);
    }
  }

  // Insert ellipsis where page numbers are skipped.
  for (let i of range) {
    if (lastPageInRange) {
      if (i - lastPageInRange === 2) {
        // Only one page missing at end of range, so add one.
        rangeWithDots.push(lastPageInRange + 1);
      } else if (i - lastPageInRange > 2) {
        // More than one missing, so add an ellipsis.
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    lastPageInRange = i;
  }
  return rangeWithDots;
}
function Pagination({
  totalPages = 0,
  handlePaginationClick,
  currentPage = 1
}) {
  if (totalPages <= 1) {
    return null;
  }
  const pages = getPagination(currentPage, totalPages);
  const createHandlePaginationClick = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(page => () => handlePaginationClick(page), [handlePaginationClick]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ul", {
    className: "read-more__pagination",
    children: pages.map((page, index) => {
      return page === '...' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
        children: "\u2026"
      }, 'dots-' + index) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
          size: "small",
          variant: page === currentPage ? 'primary' : 'secondary',
          onClick: createHandlePaginationClick(page),
          children: page
        })
      }, page);
    })
  });
}

/***/ }),

/***/ "./src/dmg-read-more/components/read-more-posts.tsx":
/*!**********************************************************!*\
  !*** ./src/dmg-read-more/components/read-more-posts.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReadMorePosts: () => (/* binding */ ReadMorePosts)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pagination */ "./src/dmg-read-more/components/pagination.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



function ReadMorePosts({
  posts = [],
  totalPages = 0,
  handlePaginationClick,
  currentPage = 1,
  selectPost,
  selectedPostId = 0
}) {
  if (!posts || posts.length === 0) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
      children: "No posts found."
    });
  }
  const createPostClickHandler = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(post => () => selectPost(post), [selectPost]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ul", {
      children: posts.map(post => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
          onClick: createPostClickHandler(post),
          className: `read-more__post ${post.id === selectedPostId ? 'read-more__post--selected' : ''}`,
          children: post.title.rendered
        }, post.id);
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_pagination__WEBPACK_IMPORTED_MODULE_1__["default"], {
      totalPages: totalPages,
      handlePaginationClick: handlePaginationClick,
      currentPage: currentPage
    })]
  });
}

/***/ }),

/***/ "./src/dmg-read-more/components/read-more.tsx":
/*!****************************************************!*\
  !*** ./src/dmg-read-more/components/read-more.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReadMore)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _read_more_posts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./read-more-posts */ "./src/dmg-read-more/components/read-more-posts.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







function ReadMore({
  selectPost,
  selectedPostId
}) {
  const baseSearchArgs = {
    _fields: ['id', 'title', 'link'],
    per_page: 10,
    search: ''
  };
  const currentPostId = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)('core/editor').getCurrentPostId();
  if (currentPostId) baseSearchArgs.exclude = currentPostId;
  const [searchTerm, setSearchTerm] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)('');
  const [searchArgs, setSearchArgs] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(baseSearchArgs);
  const [searchRecent, setSearchRecent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(true);
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
  const twoYearsAgoISOPrefix = twoYearsAgo.toISOString().split('T')[0];
  const twoYearsAgoFormatted = twoYearsAgoISOPrefix + 'T00:00:00Z';
  let postsResult = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.useEntityRecords)('postType', 'post', searchArgs);
  function setSearchOrIdArgs(searchTerm) {
    const newSearchArgs = {
      ...baseSearchArgs
    };
    if (searchRecent) {
      newSearchArgs.after = twoYearsAgoFormatted;
    }
    if (searchTerm !== '' && Number.isInteger(Number(searchTerm))) {
      setSearchArgs({
        ...newSearchArgs,
        include: Number(searchTerm)
      });
    } else {
      setSearchArgs({
        ...newSearchArgs,
        search: searchTerm
      });
    }
  }
  const handleKeyDown = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(e => {
    if (e.key === 'Enter') {
      setSearchOrIdArgs(searchTerm);
    } else if (e.key === 'Escape') {
      setSearchTerm('');
    }
  }, [searchTerm, setSearchOrIdArgs]);
  const handleSearchButtonClick = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => {
    setSearchOrIdArgs(searchTerm);
  }, [searchTerm, setSearchOrIdArgs]);
  const handlePaginationClick = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(pageNumber => {
    setSearchArgs({
      ...searchArgs,
      page: pageNumber
    });
  }, [searchArgs]);
  const handleCheckboxChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => {
    const newSearchRecent = !searchRecent;
    setSearchRecent(newSearchRecent);
    const updatedArgs = {
      ...searchArgs
    };

    // We always reset to page 1 when the filter is toggled.
    updatedArgs.page = 1;
    if (newSearchRecent) {
      updatedArgs.after = twoYearsAgoFormatted;
    } else {
      delete updatedArgs.after;
    }
    setSearchArgs(updatedArgs);
  }, [searchRecent, searchArgs, twoYearsAgoFormatted]);
  const renderLoadingList = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(({
    className
  }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("ul", {
      children: [...Array(10)].map((_, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("li", {
        className: "read-more__post"
      }, i))
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("ul", {
      className: "read-more__pagination"
    })]
  }), []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
        className: "read-more__inputs",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          onChange: value => setSearchTerm(value),
          value: searchTerm,
          className: "read-more__search-input",
          help: "Enter term or post ID and click Search button to find posts.",
          onKeyDown: handleKeyDown
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          variant: "secondary",
          onClick: handleSearchButtonClick,
          text: "Search",
          isBusy: postsResult?.isResolving
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
        className: "read-more__checkbox",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
          __nextHasNoMarginBottom: true,
          checked: searchRecent,
          label: "Search last two years only",
          onChange: handleCheckboxChange
        })
      }), postsResult?.isResolving ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
        className: "read-more__posts read-more__posts--loading",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Animate, {
          type: "loading",
          children: renderLoadingList
        })
      }) : postsResult?.hasResolved ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
        className: "read-more__posts",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_read_more_posts__WEBPACK_IMPORTED_MODULE_5__.ReadMorePosts, {
          posts: postsResult?.records,
          totalPages: postsResult.totalPages,
          handlePaginationClick: handlePaginationClick,
          currentPage: searchArgs?.page || 1,
          selectPost: selectPost,
          selectedPostId: selectedPostId
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
        className: "read-more__posts",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
          children: "Error finding posts."
        })
      })]
    })
  });
}

/***/ }),

/***/ "./src/dmg-read-more/edit.js":
/*!***********************************!*\
  !*** ./src/dmg-read-more/edit.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_read_more__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/read-more */ "./src/dmg-read-more/components/read-more.tsx");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/dmg-read-more/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





function SelectedPost({
  id,
  title,
  url
}) {
  if (!id) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
      children: "DMG Read More \u2013 find a post using the form in the sidebar."
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("p", {
    className: "dmg-read-more",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
      children: "Read More:"
    }), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
      href: url,
      children: title !== null && title !== void 0 ? title : 'Untitled'
    })]
  });
}
function Edit({
  attributes,
  setAttributes
}) {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)();
  const selectPost = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(post => {
    setAttributes({
      postId: post.id,
      postTitle: post.title.rendered,
      postUrl: post.link
    });
  }, [setAttributes]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    ...blockProps,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_read_more__WEBPACK_IMPORTED_MODULE_2__["default"], {
      selectPost: selectPost,
      selectedPostId: attributes?.postId
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(SelectedPost, {
      id: attributes?.postId,
      title: attributes?.postTitle,
      url: attributes?.postUrl
    })]
  });
}

/***/ }),

/***/ "./src/dmg-read-more/editor.scss":
/*!***************************************!*\
  !*** ./src/dmg-read-more/editor.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/dmg-read-more/index.js":
/*!************************************!*\
  !*** ./src/dmg-read-more/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/dmg-read-more/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/dmg-read-more/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/dmg-read-more/block.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  icon: {
    src: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("svg", {
      width: "54",
      height: "54",
      viewBox: "0 0 54 54",
      xmlns: "http://www.w3.org/2000/svg",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("g", {
        id: "circles",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("path", {
          id: "Path",
          fill: "#9a4e9e",
          stroke: "none",
          d: "M 50.179993 14.270012 C 50.184052 18.072838 47.896378 21.503502 44.384155 22.961601 C 40.871948 24.419701 36.827194 23.617943 34.136734 20.930351 C 31.446289 18.24276 30.640228 14.198845 32.094574 10.685081 C 33.548935 7.171318 36.977142 4.879997 40.779999 4.879997 C 43.27211 4.877342 45.663071 5.865471 47.426193 7.626732 C 49.189331 9.387993 50.179993 11.777885 50.179993 14.270012 Z M 50.179993 40.580009 C 50.179993 45.771477 45.971481 49.980003 40.779999 49.980003 C 35.588516 49.980003 31.380005 45.771477 31.380005 40.580009 C 31.380005 35.388512 35.588516 31.179985 40.779999 31.179985 C 43.273849 31.17733 45.666321 32.166832 47.429733 33.93026 C 49.193161 35.693687 50.182663 38.086143 50.179993 40.580009 Z M 14.440002 23.670006 C 10.637146 23.674034 7.206497 21.386375 5.748413 17.874168 C 4.290314 14.361931 5.092072 10.317192 7.779663 7.626732 C 10.467255 4.936272 14.511139 4.130211 18.024918 5.584587 C 21.538681 7.038933 23.830002 10.467155 23.830002 14.270012 C 23.830002 19.457573 19.627563 23.664482 14.440002 23.670006 Z M 14.440002 49.969994 C 10.63623 49.974052 7.204956 47.685295 5.747452 44.171837 C 4.289948 40.658409 5.093536 36.612877 7.783203 33.92321 C 10.47287 31.233543 14.518402 30.429955 18.031845 31.887444 C 21.545288 33.344963 23.834045 36.776237 23.830002 40.580009 C 23.830002 45.765953 19.625946 49.969994 14.440002 49.969994 Z"
        })
      })
    })
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/dmg-read-more/style.scss":
/*!**************************************!*\
  !*** ./src/dmg-read-more/style.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"dmg-read-more/index": 0,
/******/ 			"dmg-read-more/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkdmg_read_more"] = globalThis["webpackChunkdmg_read_more"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["dmg-read-more/style-index"], () => (__webpack_require__("./src/dmg-read-more/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map