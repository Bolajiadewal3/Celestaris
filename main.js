require("./main.css");
var $8I7SX$react = require("react");
var $8I7SX$reactdom = require("react-dom");
var $8I7SX$brace = require("brace");
var $8I7SX$reactace = require("react-ace");
var $8I7SX$reactframecomponent = require("react-frame-component");
require("brace/mode/jsx");
require("brace/theme/monokai");
var $8I7SX$reactjsxruntime = require("react/jsx-runtime");
var $8I7SX$reactthreefiber = require("@react-three/fiber");
var $8I7SX$reactthreedrei = require("@react-three/drei");
var $8I7SX$three = require("three");
var $8I7SX$reactthreepostprocessing = require("@react-three/postprocessing");
var $8I7SX$reactspringweb = require("@react-spring/web");
var $8I7SX$reactrouterdom = require("react-router-dom");
var $8I7SX$reactspringthree = require("@react-spring/three");
var $8I7SX$d3 = require("d3");
var $8I7SX$r3fglobe = require("r3f-globe");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

      var $parcel$global = globalThis;
    
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequireca8d"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequireca8d"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("6QrJX", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $4fbd1e06204a95c7$var$_react = $4fbd1e06204a95c7$var$_interopRequireDefault($8I7SX$react);
function $4fbd1e06204a95c7$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $4fbd1e06204a95c7$var$_typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") $4fbd1e06204a95c7$var$_typeof = function _typeof(obj) {
        return typeof obj;
    };
    else $4fbd1e06204a95c7$var$_typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    return $4fbd1e06204a95c7$var$_typeof(obj);
}
function $4fbd1e06204a95c7$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $4fbd1e06204a95c7$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $4fbd1e06204a95c7$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $4fbd1e06204a95c7$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $4fbd1e06204a95c7$var$_defineProperties(Constructor, staticProps);
    return Constructor;
}
function $4fbd1e06204a95c7$var$_possibleConstructorReturn(self, call) {
    if (call && ($4fbd1e06204a95c7$var$_typeof(call) === "object" || typeof call === "function")) return call;
    return $4fbd1e06204a95c7$var$_assertThisInitialized(self);
}
function $4fbd1e06204a95c7$var$_assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function $4fbd1e06204a95c7$var$_getPrototypeOf(o) {
    $4fbd1e06204a95c7$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $4fbd1e06204a95c7$var$_getPrototypeOf(o);
}
function $4fbd1e06204a95c7$var$_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) $4fbd1e06204a95c7$var$_setPrototypeOf(subClass, superClass);
}
function $4fbd1e06204a95c7$var$_setPrototypeOf(o, p) {
    $4fbd1e06204a95c7$var$_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return $4fbd1e06204a95c7$var$_setPrototypeOf(o, p);
}
var $4fbd1e06204a95c7$var$DefaultWrapper = function DefaultWrapper(props) {
    return $4fbd1e06204a95c7$var$_react["default"].createElement("div", null, props.children);
};
var $4fbd1e06204a95c7$var$ComponentRenderer = /*#__PURE__*/ function(_React$Component) {
    $4fbd1e06204a95c7$var$_inherits(ComponentRenderer, _React$Component);
    function ComponentRenderer(props) {
        var _this;
        $4fbd1e06204a95c7$var$_classCallCheck(this, ComponentRenderer);
        _this = $4fbd1e06204a95c7$var$_possibleConstructorReturn(this, $4fbd1e06204a95c7$var$_getPrototypeOf(ComponentRenderer).call(this, props));
        _this.Wrapper = window._CustomWrapper || $4fbd1e06204a95c7$var$DefaultWrapper;
        _this.state = {
            hasError: false,
            error: null
        };
        return _this;
    }
    $4fbd1e06204a95c7$var$_createClass(ComponentRenderer, [
        {
            key: "componentDidCatch",
            value: function componentDidCatch(error) {
                console.log(error.message);
            }
        },
        {
            key: "render",
            value: function render() {
                var children = this.props.children;
                return $4fbd1e06204a95c7$var$_react["default"].createElement(this.Wrapper, this.props, children);
            }
        }
    ]);
    return ComponentRenderer;
}($4fbd1e06204a95c7$var$_react["default"].Component);
var $4fbd1e06204a95c7$var$_default = $4fbd1e06204a95c7$var$ComponentRenderer;
module.exports["default"] = $4fbd1e06204a95c7$var$_default;

});



var $99e5c865b19c7c75$exports = {};
"use strict";
Object.defineProperty($99e5c865b19c7c75$exports, "__esModule", {
    value: true
});
$99e5c865b19c7c75$exports["default"] = void 0;

var $99e5c865b19c7c75$var$_react = $99e5c865b19c7c75$var$_interopRequireDefault($8I7SX$react);

var $99e5c865b19c7c75$var$_brace = $99e5c865b19c7c75$var$_interopRequireDefault($8I7SX$brace);

var $99e5c865b19c7c75$var$_reactAce = $99e5c865b19c7c75$var$_interopRequireDefault($8I7SX$reactace);

var $99e5c865b19c7c75$var$_reactFrameComponent = $99e5c865b19c7c75$var$_interopRequireWildcard($8I7SX$reactframecomponent);



var $99e5c865b19c7c75$var$_componentRenderer = $99e5c865b19c7c75$var$_interopRequireDefault((parcelRequire("6QrJX")));
function $99e5c865b19c7c75$var$_interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                if (desc.get || desc.set) Object.defineProperty(newObj, key, desc);
                else newObj[key] = obj[key];
            }
        }
        newObj["default"] = obj;
        return newObj;
    }
}
function $99e5c865b19c7c75$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $99e5c865b19c7c75$var$_typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") $99e5c865b19c7c75$var$_typeof = function _typeof(obj) {
        return typeof obj;
    };
    else $99e5c865b19c7c75$var$_typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    return $99e5c865b19c7c75$var$_typeof(obj);
}
function $99e5c865b19c7c75$var$_objectSpread2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
        ownKeys.forEach(function(key) {
            $99e5c865b19c7c75$var$_defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function $99e5c865b19c7c75$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $99e5c865b19c7c75$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $99e5c865b19c7c75$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $99e5c865b19c7c75$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $99e5c865b19c7c75$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $99e5c865b19c7c75$var$_defineProperties(Constructor, staticProps);
    return Constructor;
}
function $99e5c865b19c7c75$var$_possibleConstructorReturn(self, call) {
    if (call && ($99e5c865b19c7c75$var$_typeof(call) === "object" || typeof call === "function")) return call;
    return $99e5c865b19c7c75$var$_assertThisInitialized(self);
}
function $99e5c865b19c7c75$var$_getPrototypeOf(o) {
    $99e5c865b19c7c75$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $99e5c865b19c7c75$var$_getPrototypeOf(o);
}
function $99e5c865b19c7c75$var$_assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function $99e5c865b19c7c75$var$_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) $99e5c865b19c7c75$var$_setPrototypeOf(subClass, superClass);
}
function $99e5c865b19c7c75$var$_setPrototypeOf(o, p) {
    $99e5c865b19c7c75$var$_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return $99e5c865b19c7c75$var$_setPrototypeOf(o, p);
}
window.component = null;
var $99e5c865b19c7c75$var$Wrapper = /*#__PURE__*/ function(_React$Component) {
    $99e5c865b19c7c75$var$_inherits(Wrapper, _React$Component);
    function Wrapper(props) {
        var _this;
        $99e5c865b19c7c75$var$_classCallCheck(this, Wrapper);
        _this = $99e5c865b19c7c75$var$_possibleConstructorReturn(this, $99e5c865b19c7c75$var$_getPrototypeOf(Wrapper).call(this, props));
        window.component = window.component || {};
        _this.iframeRef = $99e5c865b19c7c75$var$_react["default"].createRef();
        _this.handleChange = _this.handleChange.bind($99e5c865b19c7c75$var$_assertThisInitialized(_this));
        _this.toggleEditor = _this.toggleEditor.bind($99e5c865b19c7c75$var$_assertThisInitialized(_this));
        var example = props.example;
        example = example || 'return (<div>Example</div>)';
        _this.state = {
            example: example,
            height: 200,
            showEditor: false
        };
        _this.executeScript(example);
        return _this;
    }
    $99e5c865b19c7c75$var$_createClass(Wrapper, [
        {
            key: "executeScript",
            value: function executeScript(source) {
                var uniqId = this.props.uniqId;
                var script = document.createElement('script');
                var self = this;
                script.onload = script.onerror = function() {
                    this.remove();
                    self.setState(function(state) {
                        return $99e5c865b19c7c75$var$_objectSpread2({}, state, {
                            component: window.component[uniqId] || ''
                        });
                    });
                };
                var wrapper = "window.component['".concat(uniqId, "'] = (() => {\n      ").concat(Object.keys(reactComponents).map(function(k) {
                    return "const ".concat(k, " = reactComponents['").concat(k, "'];");
                }).join('\n'), "\n      try {\n        ").concat(source, "\n      } catch (error) {\n        console.log(error)\n      }\n    })()");
                try {
                    var src = Babel.transform(wrapper, {
                        presets: [
                            'react',
                            'es2015'
                        ]
                    }).code;
                    script.src = 'data:text/plain;base64,' + btoa(src);
                } catch (error) {
                    console.log(error);
                }
                document.body.appendChild(script);
            }
        },
        {
            key: "handleChange",
            value: function handleChange(code) {
                this.executeScript(code);
                this.setState(function(state) {
                    return $99e5c865b19c7c75$var$_objectSpread2({}, state, {
                        example: code
                    });
                });
            }
        },
        {
            key: "computeHeight",
            value: function computeHeight() {
                var height = this.state.height;
                var padding = 5; // buffer for any unstyled margins
                if (this.iframeRef.current && this.iframeRef.current.node.contentDocument && this.iframeRef.current.node.contentDocument.body.offsetHeight !== 0 && this.iframeRef.current.node.contentDocument.body.offsetHeight !== height - padding) this.setState({
                    height: this.iframeRef.current.node.contentDocument.body.offsetHeight + padding
                });
            }
        },
        {
            key: "componentDidUpdate",
            value: function componentDidUpdate() {
                this.computeHeight();
            }
        },
        {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;
                this.heightInterval = setInterval(function() {
                    _this2.computeHeight();
                }, 1000);
            }
        },
        {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                clearInterval(this.heightInterval);
            }
        },
        {
            key: "toggleEditor",
            value: function toggleEditor(event) {
                event.preventDefault();
                this.setState(function(state) {
                    return $99e5c865b19c7c75$var$_objectSpread2({}, state, {
                        showEditor: !state.showEditor
                    });
                });
            }
        },
        {
            key: "render",
            value: function render() {
                var _this3 = this;
                var _this$state = this.state, component = _this$state.component, height = _this$state.height, showEditor = _this$state.showEditor;
                return $99e5c865b19c7c75$var$_react["default"].createElement("div", null, $99e5c865b19c7c75$var$_react["default"].createElement($99e5c865b19c7c75$var$_reactFrameComponent["default"], {
                    className: "component-wrapper",
                    ref: this.iframeRef,
                    style: {
                        width: '100%',
                        height: height
                    },
                    onLoad: this.computeHeight()
                }, $99e5c865b19c7c75$var$_react["default"].createElement("link", {
                    type: "text/css",
                    rel: "stylesheet",
                    href: "./build/entry.css"
                }), $99e5c865b19c7c75$var$_react["default"].createElement($99e5c865b19c7c75$var$_reactFrameComponent.FrameContextConsumer, null, function(frameContext) {
                    return $99e5c865b19c7c75$var$_react["default"].createElement($99e5c865b19c7c75$var$_componentRenderer["default"], {
                        frameContext: frameContext
                    }, component);
                })), $99e5c865b19c7c75$var$_react["default"].createElement("div", {
                    className: "bd__button"
                }, $99e5c865b19c7c75$var$_react["default"].createElement("a", {
                    href: "#",
                    onClick: this.toggleEditor
                }, "Modify Example Code")), showEditor ? $99e5c865b19c7c75$var$_react["default"].createElement("div", {
                    className: "field"
                }, $99e5c865b19c7c75$var$_react["default"].createElement($99e5c865b19c7c75$var$_reactAce["default"], {
                    style: {
                        width: '100%',
                        height: '200px',
                        marginBottom: '20px'
                    },
                    value: this.state.example,
                    mode: "jsx",
                    theme: "monokai",
                    onChange: function onChange(code) {
                        return _this3.handleChange(code);
                    },
                    name: "editor-div",
                    editorProps: {
                        $useSoftTabs: true
                    }
                })) : '');
            }
        }
    ]);
    return Wrapper;
}($99e5c865b19c7c75$var$_react["default"].Component);
var $99e5c865b19c7c75$var$_default = function _default(props) {
    return $99e5c865b19c7c75$var$_react["default"].createElement($99e5c865b19c7c75$var$Wrapper, props);
};
$99e5c865b19c7c75$exports["default"] = $99e5c865b19c7c75$var$_default;




/**
 * @module City
 * @category Scenes
 * @description The high-performance urban landing page.
 * ![City.png](The city model as it appears on the site)
 * ![City2.png](The city model as it appears on the site)
 */ 





var $c899916b68c87ba7$exports = {};
$c899916b68c87ba7$exports = JSON.parse('{"projects":[{"title":"NIKE","abstract":"This report examines Nike\'s branding strategy and its successful transition into the e-business domain. Employing the brand equity model and the customer decision journey framework, the study dissects Nike\u2019s marketing efforts, including sports sponsorships and ambassadorships. It evaluates Nike\'s ability to create positive brand perceptions, fostering customer loyalty and increasing market share. The analysis highlights potential pitfalls, such as over-dependence on ambassadors and brand diversification risks, while offering recommendations for bolstering brand equity and exploring untapped markets.","siteLink":"Portfolio/research-projects/nike-2/"},{"title":"Uber","abstract":"The paper explores Uber\'s application of machine learning to enhance its customer experience, focusing on improving the pickup process. It introduces an improved pickup quality metric that incorporates active, passive, and third-party signals to minimize delays and enhance user satisfaction. Additionally, the study examines strategies to refine time estimation accuracy, reduce driver loops, and optimize user interaction. The integration of advanced AI platforms, such as Horovod and Michelangelo, demonstrates Uber\u2019s commitment to leveraging data for operational efficiency and user-centric innovations.","siteLink":"Portfolio/research-projects/uber/","WIP":"Yes"},{"title":"Amazon","abstract":"This evaluation analyzes Amazon.com\'s usability through heuristic evaluations and user journey assessments. Highlighting its strengths in navigation, search efficiency, and aesthetics, the paper also identifies areas for improvement, such as limited accessibility options and insufficient error diagnostics. Proposed redesigns incorporate better visual hierarchy, enhanced color contrast, and streamlined accessibility features to improve customer experience. The study concludes that while Amazon excels in creating a user-friendly platform, addressing minor usability flaws could further optimize the e-commerce giant\u2019s performance.","siteLink":"Portfolio/research-projects/amazon/","WIP":"Yes"}]}');


var $c5214312cc917dc2$exports = {};
$c5214312cc917dc2$exports = JSON.parse("{\"projects\":[{\"title\":\"Gothic\",\"abstract\":\"Gothic poems inspired by Victorian Romantics and Gothic writers\",\"website\":\"https://aremuart.wordpress.com/poetry/gothics/\",\"siteLink\":\"Portfolio/poetry/gothic/\",\"WIP\":\"Yes\"},{\"title\":\"Existential\",\"abstract\":\"An assortment of existential poems - aimed at the contemplative and inward-thinkers\",\"navigation\":\"/Celestaris/Poetry/existentialPoetry\",\"website\":\"https://aremuart.wordpress.com/poetry/existentialists/\",\"siteLink\":\"Portfolio/poetry/existentialists/\",\"WIP\":\"Yes\"},{\"title\":\"Poetry Anthology: Canto I\",\"abstract\":\"Serentiy, Silence and Salutation\",\"navigation\":\"/Celestaris/Poetry/section0\",\"siteLink\":\"Portfolio/poetry/lux/section0\",\"WIP\":\"Yes\"},{\"title\":\"Poetry Anthology: Canto II\",\"abstract\":\"Tabula Lux\",\"navigation\":\"/Celestaris/Poetry/section1\",\"siteLink\":\"Portfolio/poetry/lux/section1\",\"WIP\":\"Yes\"}]}");


var $5f275980e24e53b6$exports = {};
$5f275980e24e53b6$exports = JSON.parse("{\"projects\":[{\"title\":\"The National Football League: A case study assessing the impact of website design methodology on Information System learnability\",\"abstract\":\"An attempted synthesis of Business Analytics and the Sporting world; unifying the two concepts to form an investigation into how the design of systems (i.e. Human Computer Interaction choices) can influence the retention and understanding of abstract / niche information\",\"siteLink\":\"\",\"WIP\":\"Yes\"}]}");


var $72d2bfc3e95efd9e$exports = {};
$72d2bfc3e95efd9e$exports = JSON.parse("{\"projects\":[{\"title\":\"Music\",\"abstract\":\"All music released under the artist name: AREMU\",\"website\":\"https://linktr.ee/ar3mu\",\"external\":\"Yes\",\"model\":\"/files/misc/vinyl.glb\"},{\"title\":\"Profile\",\"abstract\":\"Profile page with useful links\",\"website\":\"https://linktr.ee/bolajiadewale\",\"external\":\"Yes\",\"model\":\"/files/misc/books.glb\"}]}");


var $a470e25448b54df9$exports = {};
$a470e25448b54df9$exports = JSON.parse("{\"projects\":[{\"title\":\"\",\"abstract\":\"\",\"siteLink\":\"Portfolio/research-projects/nike-2/\",\"WIP\":\"Yes\"}]}");


var $33d99ab8c635f77f$exports = {};
$33d99ab8c635f77f$exports = JSON.parse("{\"projects\":[{\"title\":\"\",\"abstract\":\"\",\"siteLink\":\"Portfolio/research-projects/nike-2/\",\"WIP\":\"Yes\"}]}");


var $0337a43b1bf22104$exports = {};
$0337a43b1bf22104$exports = JSON.parse("{\"projects\":[{\"title\":\"S E R E N I T Y\",\"abstract\":\"My first fully-fledged EP\",\"website\":\"https://open.spotify.com/album/785WraoWzcgxA8h1QUCVvU?si=p_DV9NB-ThudCruT2Rvn9Q\",\"external\":\"Yes\"},{\"title\":\"P R O S E\",\"abstract\":\"My first commercial release\",\"website\":\"https://open.spotify.com/album/4b9is3K20OWiLPrTxCEZMr?si=IU3rP9dkSHGd1TkCh9Em9Q\",\"external\":\"Yes\"}]}");


var $e355f84da0148888$exports = {};
$e355f84da0148888$exports = JSON.parse("{\"projects\":[{\"title\":\"NHS\",\"abstract\":\"A data-driven demo rendering the United Kingdom and the location of its National Healthcare facilites\",\"internalLink\":\"NHS\"},{\"title\":\"Population\",\"abstract\":\"A 3-Dimensional demo of the 3Globe React Fiber integration\",\"internalLink\":\"Population\"}]}");


/**
 * @fileoverview A nunber of functions to assist in the displaying of overlays on the screen
 * @category Utility
 * @description Various overlay rendering functions
 */ 




var $919cea3b052cd76d$import_meta = Object.assign(Object.create(null), {
    url: "file:///src/Components/overlays.jsx"
});
/**
 * Allows for a loading screen at the start of a page that waits for the assets to load
 * @function
 * @category Loading
 */ function $919cea3b052cd76d$export$3b0d6d7590275603() {
    /**
   * Variable that tracks the current progress on asset loading on the page
   * @type {useProgress}
   */ const { progress: progress } = (0, $8I7SX$reactthreedrei.useProgress)();
    return /* The white background */ /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("div", {
        style: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            zIndex: 2000,
            color: "black",
            fontFamily: "sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("div", {
                style: {
                    fontSize: "2rem",
                    marginBottom: "20px",
                    letterSpacing: "0.2em"
                },
                children: "LOADING EXPERIENCE"
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("div", {
                style: {
                    width: "200px",
                    height: "2px",
                    background: "#333"
                },
                children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("div", {
                    style: {
                        width: `${progress}%`,
                        height: "100%",
                        background: "#6a0dad",
                        transition: "width 0.3s ease"
                    }
                })
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("div", {
                style: {
                    marginTop: "10px",
                    fontSize: "0.8rem",
                    opacity: 0.5
                },
                children: [
                    Math.round(progress),
                    "%"
                ]
            })
        ]
    });
}
/**
 * Allows for a custom start screen with a button to start the experience; assets load on click and the page is not revealed until assets fully loaded
 * @function
 * @category Loading
 * @deprecated use Loader() instead
 */ function $919cea3b052cd76d$export$a1909b6cc88e74a({ onStart: onStart, visible: visible }) {
    const styles = (0, $8I7SX$reactspringweb.useSpring)({
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        config: {
            duration: 500
        }
    });
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactspringweb.animated).div, {
        style: {
            ...styles,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 20
        },
        children: [
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("button", {
                id: "startButton",
                style: {
                    padding: "20px 40px",
                    fontSize: "42px",
                    fontWeight: "bold",
                    borderRadius: "12px",
                    fontFamily: "Orbitron, sans-serif"
                },
                onClick: onStart,
                children: "By MOBOLAJI ADEWALE"
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("div", {
                id: "hintText",
                style: {
                    position: "absolute",
                    bottom: "2%",
                    padding: "20px 40px",
                    fontSize: "15px",
                    borderRadius: "1px",
                    color: "white",
                    fontFamily: "Orbitron, sans-serif"
                },
                children: "HINT: Find the glowing orbs and press them to learn more about me"
            })
        ]
    });
}
/**
 * Displays a html/css overlay over the 3D scene; that is populated with JSON data as text; includes a return to scene and internal navigation buttons
 * @function
 * @category Overlay
 */ function $919cea3b052cd76d$export$c6fdb837b070b4ff({ isActive: isActive, onClose: onClose, items: items = [] }) {
    /**
   * Allows for internal navigation of the page
   * @type {useNavigate}
   */ const navigate = (0, $8I7SX$reactrouterdom.useNavigate)();
    /**
   * Fades in and out the overlay
   * @type {useSpring}
   */ const overlaySpring = (0, $8I7SX$reactspringweb.useSpring)({
        opacity: isActive ? 1 : 0,
        config: {
            tension: 220,
            friction: 50
        }
    });
    /**
   * Allows for animations in sequence of a list/array of elements - applies a CSS animation transform to have the different elements slide in from the right of the screen and slide back out later
   * @type {useTrail}
   */ const trail = (0, $8I7SX$reactspringweb.useTrail)(Array.isArray(items) ? items.length : 0, {
        from: {
            transform: "translateX(200%)",
            opacity: 0
        },
        to: {
            transform: isActive ? "translateX(0%)" : "translateX(100%)",
            opacity: isActive ? 1 : 0
        },
        config: {
            mass: 1,
            tension: 150,
            friction: 100,
            delay: 100
        }
    });
    return(//Animated element that allows for the useSpring and useTrail to work
    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactspringweb.animated).div, {
        className: "jsonOverlay",
        style: {
            pointerEvents: isActive ? "auto" : "none",
            opacity: overlaySpring.opacity
        },
        children: [
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("div", {
                className: "normalExitButton",
                onClick: onClose,
                children: "Exit"
            }),
            trail.map((style, index)=>{
                const item = items[index];
                //const isExternal = Boolean(item.website);
                //const isNavigable = Boolean(item.navigation);
                return(// The individual items pulled from the JSON
                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactspringweb.animated).div, {
                    className: "jsonOverlayItems",
                    style: {
                        transform: style.transform
                    },
                    children: [
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("h2", {
                            style: {
                                fontSize: "20px",
                                marginBottom: "10px"
                            },
                            children: item.title
                        }),
                        !item.WIP && /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("a", {
                            className: "goToComputerButton",
                            onClick: // A conditional on whether the JSON of the item has the property EXTERNAL (denoting an external website link)
                            item.external ? ()=>{
                                window.location.href = item.website;
                            } : ()=>{
                                //console.log("HERE");
                                // If a site link is found; pass that page to the IFRAME on the COMPUTER page; to be rendered within the static wordpress site
                                if (item.siteLink) {
                                    const fullUrl = `${$919cea3b052cd76d$import_meta.env.BASE_URL}${item.siteLink}index.html`;
                                    //console.log("Passing to iframe:", fullUrl);
                                    // Passing site link through the COMPUTER page's IFRAME
                                    navigate(`/Computer`, {
                                        state: {
                                            iframeUrl: fullUrl
                                        }
                                    });
                                } else //console.log("SHOULD BE MOVING HERE");
                                // Navigate to the page specified
                                navigate(item.internalLink);
                            },
                            children: "Go To"
                        }),
                        " ",
                        item.WIP && /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("a", {
                            className: "workInProgressButton",
                            children: "W I P"
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("p", {
                            children: item.abstract
                        })
                    ]
                }, index));
            })
        ]
    }));
}
function $919cea3b052cd76d$export$b20d2d957c657ed9({ url: url }) {
    const [playing, setPlaying] = (0, $8I7SX$react.useState)(false);
    const audioRef = (0, $8I7SX$react.useRef)(null);
    // This effect handles stopping the audio if the component unmounts
    // or if the URL changes (page navigation)
    (0, $8I7SX$react.useEffect)(()=>{
        return ()=>{
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [
        url
    ]);
    const toggleAudio = ()=>{
        if (!audioRef.current) {
            audioRef.current = new Audio(url);
            audioRef.current.loop = true;
        }
        if (playing) audioRef.current.pause();
        else audioRef.current.play().catch((err)=>console.error("Audio blocked:", err));
        setPlaying(!playing);
    };
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("button", {
        onClick: toggleAudio,
        className: "OverlayButton",
        style: {
            position: "fixed",
            bottom: "20px",
            left: "20px",
            zIndex: 2000,
            padding: "10px 20px",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            border: "1px solid #6a0dad",
            borderRadius: "2px",
            cursor: "pointer",
            fontFamily: "monospace",
            backdropFilter: "blur(10px)",
            textTransform: "uppercase"
        },
        children: playing ? "\uD83D\uDD0A Mute" : "\uD83D\uDD08 Play Ambience"
    });
}
function $919cea3b052cd76d$export$be31ffb534e4b03d({ showHeadings: showHeadings, setShowHeadings: setShowHeadings }) {
    const toggleHeadings = ()=>{
        // This toggles the boolean to its opposite value
        setShowHeadings((prev)=>!prev);
    };
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("button", {
        onClick: toggleHeadings,
        className: "OverlayButton",
        style: {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 2000,
            padding: "10px 20px",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            border: "1px solid #6a0dad",
            borderRadius: "2px",
            cursor: "pointer",
            fontFamily: "monospace",
            backdropFilter: "blur(10px)",
            textTransform: "uppercase"
        },
        children: showHeadings ? "Hide Headings" : "Show Headings"
    });
}
function $919cea3b052cd76d$export$c75d6b34c1d7db44() {
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("a", {
        className: "OverlayButton",
        style: {
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 2000,
            padding: "10px 20px",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            border: "1px solid #6a0dad",
            borderRadius: "2px",
            cursor: "pointer",
            fontFamily: "monospace",
            backdropFilter: "blur(10px)",
            textTransform: "uppercase"
        },
        href: `${$919cea3b052cd76d$import_meta.env.BASE_URL}Resume.pdf`,
        target: "_blank",
        rel: "noopener noreferrer",
        children: "Resume"
    });
}


/**
 * @fileoverview A nunber of functions to assist in the displaying of text throughout the portfolio
 * @category Utility
 * @description Various text rendering functions
 */ 




/**
 * Creates a white bordered banner of glowing gold text; that turns red on hover
 * @function
 * @category Text
 */ function $66a61f0af1aeb748$export$c877ad22df1c64d6({ text: text = "Projects", position: position = [
    0,
    5,
    0
], rotation: rotation = [
    0,
    0,
    0
], onClick: onClick }) {
    /**
   * State to track whether the text is being actively hovered over
   * @type {boolean}
   */ const [hovered, setHovered] = (0, $8I7SX$react.useState)(false);
    const textWidth = text.length * 4.5;
    const padding = 2;
    const boxWidth = textWidth + padding;
    const boxHeight = 12;
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("group", {
        position: position,
        rotation: rotation,
        children: [
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("mesh", {
                children: [
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("planeGeometry", {
                        args: [
                            boxWidth,
                            boxHeight
                        ]
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("meshBasicMaterial", {
                        transparent: true,
                        opacity: 0
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Edges), {
                        scale: 1.01,
                        children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("lineBasicMaterial", {
                            color: "#ffd700"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Text), {
                fontSize: 8,
                style: {
                    fontFamily: "Arial",
                    fontWeight: "bold"
                },
                color: hovered ? "#ff0000" : "#ffd700",
                anchorX: "center",
                anchorY: "middle",
                onPointerOver: ()=>setHovered(true),
                onPointerOut: ()=>setHovered(false),
                onClick: onClick,
                children: text
            })
        ]
    });
}
function $66a61f0af1aeb748$export$c70aacca60c78502({ text: text = "Group", position: position = [
    0,
    8,
    0
], rotation: rotation = [
    0,
    0,
    0
] }) {
    const textWidth = text.length * 9;
    const padding = 2;
    const boxWidth = textWidth + padding;
    const boxHeight = 20;
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("group", {
        position: position,
        rotation: rotation,
        children: [
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("mesh", {
                children: [
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("planeGeometry", {
                        args: [
                            boxWidth,
                            boxHeight
                        ]
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("meshBasicMaterial", {
                        transparent: true,
                        opacity: 0
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Edges), {
                        scale: 1.01,
                        children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("lineBasicMaterial", {
                            color: "#fff"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Text), {
                fontSize: 15,
                style: {
                    fontFamily: "Arial",
                    fontWeight: "bold"
                },
                color: "#fff",
                anchorX: "center",
                anchorY: "middle",
                children: text
            })
        ]
    });
}
/**
 * Creates a white bordered banner of white text, with a grey background and glowing orange box to open it; that can be placed on scene objects and tracks if its being viewed
 * @function
 * @category Text
 */ function $66a61f0af1aeb748$export$82fb00ee8a55bec7({ title: title = "SMALL TEXT", text: text = "text", position: position = [
    0,
    10,
    0
], rotation: rotation = [
    0,
    0,
    0
], width: width = 10, onClick: onClick, isOpen: isOpen, onOpen: onOpen }) {
    const padding = 0.3;
    const boxWidth = width + padding;
    const boxHeight = 10;
    //console.log(isOpen);
    //console.log(onOpen);
    /**
   * State to track whether the text is being viewed currently
   * @type {boolean}
   */ const [open, setOpen] = (0, $8I7SX$react.useState)(false);
    /**
   * Animation effect to have the text box expand open and close shut on enter and exit, respectively
   * @type {useSpring}
   */ const { scale: scale, box: box } = (0, $8I7SX$reactspringweb.useSpring)({
        scale: isOpen ? 1 : 0,
        box: isOpen ? 0 : 1,
        config: {
            mass: 1,
            tension: 170,
            friction: 150
        }
    });
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("group", {
        position: position,
        rotation: rotation,
        children: [
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactspringthree.a).mesh, {
                scale: box,
                position: [
                    0,
                    10,
                    -3
                ],
                onClick: ()=>{
                    onClick();
                    onOpen();
                    setOpen(true);
                //console.log(open);
                },
                children: [
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("boxGeometry", {
                        args: [
                            3,
                            3,
                            3
                        ]
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("meshStandardMaterial", {
                        color: "orange",
                        emissive: "orange",
                        emissiveIntensity: 4
                    })
                ]
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactspringthree.a).group, {
                scale: scale,
                children: [
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("mesh", {
                        position: [
                            0,
                            0,
                            -0.1
                        ],
                        children: [
                            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("planeGeometry", {
                                args: [
                                    boxWidth,
                                    boxHeight
                                ]
                            }),
                            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("meshBasicMaterial", {
                                color: "#050505",
                                transparent: true,
                                opacity: 0.85
                            }),
                            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Edges), {
                                scale: 1,
                                children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("lineBasicMaterial", {
                                    color: "#ffffff",
                                    toneMapped: false
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Text), {
                        maxWidth: width,
                        fontSize: 1.6,
                        color: "white",
                        style: {
                            fontFamily: "Orbitron",
                            fontWeight: "bold"
                        },
                        anchorX: "center",
                        anchorY: "middle",
                        position: [
                            0,
                            3.5,
                            0.1
                        ],
                        outlineWidth: 0.1,
                        outlineColor: "#aaa",
                        children: title.toUpperCase()
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Text), {
                        maxWidth: width - 1,
                        fontSize: 0.7,
                        color: "#dddddd",
                        anchorX: "center",
                        anchorY: "top",
                        textAlign: "center",
                        position: [
                            0,
                            1.5,
                            0.1
                        ],
                        lineHeight: 1.4,
                        children: text
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Text), {
                        fontSize: 0.5,
                        color: "#AAAAAA",
                        position: [
                            0,
                            -3.5,
                            0.1
                        ],
                        children: '(Click "Return" to close)'
                    })
                ]
            })
        ]
    });
}





function $dcb2f366e2a78e3e$export$c96ae4a4d477a88c({ onComplete: onComplete }) {
    const { camera: camera } = (0, $8I7SX$reactthreefiber.useThree)();
    const targetPosition = new $8I7SX$three.Vector3(0, 35, 150); // Final resting position
    const [done, setDone] = (0, $8I7SX$react.useState)(false);
    (0, $8I7SX$reactthreefiber.useFrame)(()=>{
        if (done) return;
        camera.position.lerp(targetPosition, 0.03);
        camera.lookAt(0, 0, 0);
        if (camera.position.distanceTo(targetPosition) < 1) {
            camera.position.copy(targetPosition);
            setDone(true);
            onComplete(); // Notify parent
        }
    });
    return null;
}
function $dcb2f366e2a78e3e$export$9a088e97127c2f51({ anchor: anchor, lookat: lookat, onComplete: onComplete, controlsRef: controlsRef }) {
    const { camera: camera } = (0, $8I7SX$reactthreefiber.useThree)();
    const targetPosition = new $8I7SX$three.Vector3(...anchor);
    const targetLookAt = new $8I7SX$three.Vector3(...lookat);
    if (controlsRef?.current) {
        console.log("DISABLED ORBIT");
        controlsRef.current.enabled = false;
    }
    // Compute final quaternion once based on desired look direction
    const finalQuaternion = (0, $8I7SX$react.useRef)(new $8I7SX$three.Quaternion());
    (0, $8I7SX$react.useEffect)(()=>{
        const dummyCam = new $8I7SX$three.PerspectiveCamera();
        dummyCam.position.copy(targetPosition);
        dummyCam.lookAt(targetLookAt);
        finalQuaternion.current.copy(dummyCam.quaternion);
    }, [
        anchor,
        lookat
    ]);
    const [done, setDone] = (0, $8I7SX$react.useState)(false);
    (0, $8I7SX$reactthreefiber.useFrame)(()=>{
        if (done) return;
        camera.position.lerp(targetPosition, 0.1);
        camera.quaternion.slerp(finalQuaternion.current, 0.1);
        const closePosition = camera.position.distanceTo(targetPosition) < 0.1;
        const closeRotation = camera.quaternion.angleTo(finalQuaternion.current) < 0.1;
        if (closePosition && closeRotation) {
            camera.position.copy(targetPosition);
            camera.quaternion.copy(finalQuaternion.current);
            if (controlsRef?.current) {
                controlsRef.current.target.copy(targetLookAt);
                controlsRef.current.update(); // Recompute internal state
                console.log("RESET ORBIT");
            }
            setDone(true);
            onComplete();
        }
    });
    return null;
}


/**
 * Utility function to convert DEGREES to RADIANS; for easier expression of rotations
 * @function
 * @category Utility
 */ function $8c8a4d7c0a98efcd$export$c9fcf1a7df975d78(degrees) {
    return degrees * Math.PI / 180;
}


var $9e79c54aa8a563fd$import_meta = Object.assign(Object.create(null), {
    url: "file:///src/city.jsx"
});
/**
 * CityModel manages the complex OBJ/MTL loading and asset disposal.
 * @component
 * @category 3D Assets
 * @returns {JSX.primitive}
 */ function $9e79c54aa8a563fd$var$CityModel() {
    /**
   * The compressed scene model .GLB file
   * @type {useGLTF}
   */ const { scene: scene } = (0, $8I7SX$reactthreedrei.useGLTF)(`${$9e79c54aa8a563fd$import_meta.env.BASE_URL}City/city-v2.glb`, "https://www.gstatic.com/draco/versioned/decoders/1.5.5/");
    /** A traversal of the model's elements that clear geometries and materials from memory on cleanup */ (0, $8I7SX$react.useEffect)(()=>{
        return ()=>{
            scene.traverse((child)=>{
                if (child.isMesh) {
                    child.geometry.dispose();
                    if (child.material.isMaterial) child.material.dispose();
                }
            });
        };
    }, [
        scene
    ]);
    return /** The scene object; it has shadows enabled */ /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("primitive", {
        object: scene,
        scale: 0.15,
        position: [
            70,
            0,
            -65
        ],
        castShadow: true,
        receiveShadow: true
    });
}
/**
 * Preloads the city model in memory
 * @function
 * @category 3D Assets
 */ (0, $8I7SX$reactthreedrei.useGLTF).preload(`${$9e79c54aa8a563fd$import_meta.env.BASE_URL}City/city-v2.glb`);
/**
 * CameraLight attaches a spotlight that follows the camera's position,
 * simulating a light source that moves with the viewer.
 *
 * @component
 * @returns {JSX.spotLight} - A spotlight that follows the camera
 */ function $9e79c54aa8a563fd$var$CameraLight() {
    const { camera: camera } = (0, $8I7SX$reactthreefiber.useThree)(); // Access the main camera from the scene
    const lightRef = (0, $8I7SX$react.useRef)(); // Reference to the spotlight
    // Update light position every frame to match the camera's current position
    (0, $8I7SX$reactthreefiber.useFrame)(()=>{
        if (lightRef.current && camera) lightRef.current.position.copy(camera.position);
    });
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("spotLight", {
        ref: lightRef,
        intensity: 10,
        angle: 0.8,
        penumbra: 0.6,
        distance: 300,
        decay: 0.6,
        castShadow: true
    });
}
function $9e79c54aa8a563fd$export$2e2bcd8739ae039() {
    // UI states
    const [controlsEnabled, setControlsEnabled] = (0, $8I7SX$react.useState)(false);
    const [isOverlayActive, setOverlayActive] = (0, $8I7SX$react.useState)(false);
    const [overlayContent, setOverlayContent] = (0, $8I7SX$react.useState)([]);
    //const [started, setStarted] = useState(false);
    const [openBannerId, setOpenBannerId] = (0, $8I7SX$react.useState)(null);
    const [cameraAnimationDone, setcameraAnimationDone] = (0, $8I7SX$react.useState)(null);
    //const [cityLoaded, setCityLoaded] = useState(false);
    const [audioStarted, setAudioStarted] = (0, $8I7SX$react.useState)(false);
    const [initialAnimation, setInitialAnimation] = (0, $8I7SX$react.useState)(false); // Unused?
    // Camera/interaction state
    const controlsRef = (0, $8I7SX$react.useRef)();
    //const [currentCameraPos, setCurrentCameraPos] = useState([0, 0, 0]); // Reserved
    const [goToSmallText, setGoToSmallText] = (0, $8I7SX$react.useState)(false);
    const [smallTextAnchor, setSmallTextAnchor] = (0, $8I7SX$react.useState)([
        0,
        0,
        0
    ]);
    const [smallTextLookAt, setSmallTextLookAt] = (0, $8I7SX$react.useState)([
        0,
        0,
        0
    ]);
    const [showExitButton, setShowExitButton] = (0, $8I7SX$react.useState)(false);
    const [showBigHeadings, setShowBigHeadings] = (0, $8I7SX$react.useState)(true);
    /**
   * Returns camera to initial view and re-enables controls after interacting with banners.
   * @function
   * @returns {void}
   */ const resetOrbit = ()=>{
        setOpenBannerId(null);
        controlsRef.current.target.copy(new $8I7SX$three.Vector3(0, 0, 0));
        setShowExitButton(false);
        setControlsEnabled(true);
    };
    /**
   * Toggles the overlay and OrbitControls simultaneously.
   * @function
   * @returns {boolean}
   */ const toggleOverlay = ()=>{
        setOverlayActive((prev)=>{
            const newState = !prev;
            if (controlsRef.current) controlsRef.current.enabled = !newState;
            return newState;
        });
    };
    /**
   * Opens a specific overlay content section (projects, poetry, etc.).
   * @function
   * @param {string} type - The type of content to open in the overlay.
   */ const openOverlay = (type)=>{
        switch(type){
            case "dissertation":
                console.log((0, (/*@__PURE__*/$parcel$interopDefault($5f275980e24e53b6$exports))).projects);
                setOverlayContent((0, (/*@__PURE__*/$parcel$interopDefault($5f275980e24e53b6$exports))).projects);
                break;
            case "dissertation2":
                setOverlayContent((0, (/*@__PURE__*/$parcel$interopDefault($33d99ab8c635f77f$exports))).projects);
                break;
            case "miscellaneous":
                setOverlayContent((0, (/*@__PURE__*/$parcel$interopDefault($72d2bfc3e95efd9e$exports))).projects);
                break;
            case "poetry":
                setOverlayContent((0, (/*@__PURE__*/$parcel$interopDefault($c5214312cc917dc2$exports))).projects);
                break;
            case "business":
                setOverlayContent((0, (/*@__PURE__*/$parcel$interopDefault($c899916b68c87ba7$exports))).projects);
                break;
            case "hci":
                setOverlayContent((0, (/*@__PURE__*/$parcel$interopDefault($a470e25448b54df9$exports))).projects);
                break;
            case "music":
                setOverlayContent((0, (/*@__PURE__*/$parcel$interopDefault($0337a43b1bf22104$exports))).projects);
                break;
            case "showcase":
                setOverlayContent((0, (/*@__PURE__*/$parcel$interopDefault($e355f84da0148888$exports))).projects);
                break;
        }
        setOverlayActive(true);
    };
    const audioRef = (0, $8I7SX$react.useRef)(null);
    /**
   * Starts city background audio on first interaction.
   * @deprecated use imported method from OVERLAYS
   */ const startAudio = ()=>{
        if (!audioStarted) {
            const audio = new Audio(`${$9e79c54aa8a563fd$import_meta.env.BASE_URL}City/cityAMBIENCE.mp3`);
            audio.loop = true;
            audioRef.current = audio;
            audio.play();
            setAudioStarted(true);
        }
    };
    (0, $8I7SX$react.useEffect)(()=>{
        return ()=>{
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);
    /**
   * The entire landing page
   */ return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("div", {
        style: {
            width: "100vw",
            height: "100vh",
            position: "relative"
        },
        children: [
            showExitButton && /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("button", {
                className: "smallTextButton",
                onClick: resetOrbit,
                children: "Return"
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $919cea3b052cd76d$export$b20d2d957c657ed9), {
                url: `${$9e79c54aa8a563fd$import_meta.env.BASE_URL}City/cityAMBIENCE.mp3`
            }),
            !isOverlayActive && /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $919cea3b052cd76d$export$c75d6b34c1d7db44), {}),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $919cea3b052cd76d$export$be31ffb534e4b03d), {
                showHeadings: showBigHeadings,
                setShowHeadings: setShowBigHeadings
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $919cea3b052cd76d$export$c6fdb837b070b4ff), {
                isActive: isOverlayActive,
                onClose: toggleOverlay,
                items: overlayContent
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$react.Suspense), {
                fallback: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $919cea3b052cd76d$export$3b0d6d7590275603), {}),
                children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactthreefiber.Canvas), {
                    shadows: true,
                    camera: {
                        position: [
                            0,
                            70,
                            500
                        ],
                        fov: 50
                    },
                    onCreated: ({ scene: scene })=>{
                        scene.fog = new $8I7SX$three.Fog(new $8I7SX$three.Color("#0a0a1a"), 200, 1200);
                    },
                    dpr: [
                        1,
                        1.5
                    ],
                    gl: {
                        antialias: true
                    },
                    performance: {
                        min: 0.8
                    },
                    children: [
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.OrbitControls), {
                            ref: controlsRef,
                            target: [
                                0,
                                0,
                                0
                            ],
                            enablePan: false,
                            maxPolarAngle: Math.PI / 2,
                            minDistance: 10,
                            maxDistance: 220,
                            enabled: controlsEnabled
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $dcb2f366e2a78e3e$export$c96ae4a4d477a88c), {
                            onComplete: ()=>{
                                setControlsEnabled(true);
                                setcameraAnimationDone(true);
                            }
                        }),
                        goToSmallText && /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $dcb2f366e2a78e3e$export$9a088e97127c2f51), {
                            anchor: smallTextAnchor,
                            lookat: smallTextLookAt,
                            onComplete: ()=>{
                                setGoToSmallText(false);
                                setShowExitButton(true);
                            },
                            controlsRef: controlsRef
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$82fb00ee8a55bec7), {
                            title: "About Me",
                            text: "25 Year Old Software & Data Engineer, Creative & National American Football Player",
                            position: [
                                -40,
                                -8.5,
                                90
                            ],
                            rotation: [
                                0,
                                (0, $8c8a4d7c0a98efcd$export$c9fcf1a7df975d78)(-13),
                                0
                            ],
                            width: 17,
                            isOpen: openBannerId === "1",
                            onOpen: ()=>setOpenBannerId("1"),
                            onClick: ()=>{
                                setSmallTextAnchor([
                                    -49,
                                    3,
                                    132
                                ]);
                                setSmallTextLookAt([
                                    -40,
                                    -8.5,
                                    90
                                ]);
                                setGoToSmallText(true);
                                setControlsEnabled(false);
                            }
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$82fb00ee8a55bec7), {
                            title: "Areas of Expertise",
                            text: "+ UI / UX\n+ Information Systems\n+ Data Visualisation\n+ Full-Stack Development",
                            position: [
                                -59.6,
                                -8.5,
                                162.9
                            ],
                            rotation: [
                                0,
                                (0, $8c8a4d7c0a98efcd$export$c9fcf1a7df975d78)(0),
                                0
                            ],
                            width: 17,
                            isOpen: openBannerId === "4",
                            onOpen: ()=>setOpenBannerId("4"),
                            onClick: ()=>{
                                setSmallTextAnchor([
                                    -60,
                                    -7,
                                    210
                                ]);
                                setSmallTextLookAt([
                                    -60,
                                    -2,
                                    170
                                ]);
                                setGoToSmallText(true);
                                setControlsEnabled(false);
                            }
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$82fb00ee8a55bec7), {
                            title: "Education",
                            text: "University of Nottingham - BSc (Hons) Computer Science [ 2019 - 2022 ]\nUniversity of Nottingham - MSc Information Systems & Operations Management [ 2022 - 2023 ]\nUniversity of Arizona - MS Information Science: Human Centered Computing [ 2024 & 2026 ]",
                            position: [
                                80,
                                -8.5,
                                142
                            ],
                            rotation: [
                                0,
                                (0, $8c8a4d7c0a98efcd$export$c9fcf1a7df975d78)(-1.5),
                                0
                            ],
                            width: 30,
                            isOpen: openBannerId === "2",
                            onOpen: ()=>setOpenBannerId("2"),
                            onClick: ()=>{
                                setSmallTextAnchor([
                                    83,
                                    2,
                                    186
                                ]);
                                setSmallTextLookAt([
                                    80,
                                    -8.5,
                                    0
                                ]);
                                setGoToSmallText(true);
                                setControlsEnabled(false);
                            }
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$82fb00ee8a55bec7), {
                            title: "Contact Me",
                            text: "bolajidgs@gmail.com\nmadewale@arizona.edu\n@bolaji.ad",
                            position: [
                                62.5,
                                -8.5,
                                -135
                            ],
                            rotation: [
                                0,
                                (0, $8c8a4d7c0a98efcd$export$c9fcf1a7df975d78)(177),
                                0
                            ],
                            width: 30,
                            isOpen: openBannerId === "3",
                            onOpen: ()=>setOpenBannerId("3"),
                            onClick: ()=>{
                                setSmallTextAnchor([
                                    65,
                                    2,
                                    -176
                                ]);
                                setSmallTextLookAt([
                                    62.5,
                                    -8.5,
                                    -135
                                ]);
                                setGoToSmallText(true);
                                setControlsEnabled(false);
                            }
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$82fb00ee8a55bec7), {
                            title: "What Am I working On ?",
                            text: "(1) My Second Dissertation\n(2) Professional American Football\n(3) My first two EPs\n(4) This Portfolio",
                            position: [
                                61,
                                50,
                                -98.5
                            ],
                            rotation: [
                                0,
                                (0, $8c8a4d7c0a98efcd$export$c9fcf1a7df975d78)(180),
                                0
                            ],
                            width: 25,
                            isOpen: openBannerId === "5",
                            onOpen: ()=>setOpenBannerId("5"),
                            onClick: ()=>{
                                setSmallTextAnchor([
                                    60,
                                    49,
                                    -140
                                ]);
                                setSmallTextLookAt([
                                    60,
                                    49,
                                    -120
                                ]);
                                setGoToSmallText(true);
                                setControlsEnabled(false);
                            }
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$c877ad22df1c64d6), {
                            text: "Business",
                            position: [
                                -70,
                                40,
                                -30
                            ],
                            onClick: ()=>openOverlay("business")
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$c877ad22df1c64d6), {
                            text: "HCI",
                            position: [
                                -70,
                                20,
                                -30
                            ],
                            onClick: ()=>openOverlay("hci")
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$c877ad22df1c64d6), {
                            text: "Dissertation I",
                            position: [
                                70,
                                40,
                                -50
                            ],
                            onClick: ()=>openOverlay("dissertation")
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$c877ad22df1c64d6), {
                            text: "Dissertation II",
                            position: [
                                70,
                                20,
                                -50
                            ],
                            onClick: ()=>openOverlay("dissertation2")
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$c877ad22df1c64d6), {
                            text: "Poetry",
                            position: [
                                50,
                                38,
                                60
                            ],
                            rotation: [
                                0,
                                Math.PI * 1.5,
                                0
                            ],
                            onClick: ()=>openOverlay("poetry")
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$c877ad22df1c64d6), {
                            text: "Music",
                            position: [
                                50,
                                18,
                                60
                            ],
                            rotation: [
                                0,
                                Math.PI * 1.5,
                                0
                            ],
                            onClick: ()=>openOverlay("music")
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$c877ad22df1c64d6), {
                            text: "Tech Showcase",
                            position: [
                                -60,
                                20,
                                75
                            ],
                            rotation: [
                                0,
                                Math.PI / 2,
                                0
                            ],
                            onClick: ()=>openOverlay("showcase")
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$c877ad22df1c64d6), {
                            text: "Links",
                            position: [
                                -60,
                                0,
                                75
                            ],
                            rotation: [
                                0,
                                Math.PI / 2,
                                0
                            ],
                            onClick: ()=>openOverlay("miscellaneous")
                        }),
                        showBigHeadings && /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactjsxruntime.Fragment), {
                            children: [
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$c70aacca60c78502), {
                                    text: "RESEARCH",
                                    position: [
                                        -70,
                                        60,
                                        -30
                                    ]
                                }),
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$c70aacca60c78502), {
                                    text: "Academia",
                                    position: [
                                        70,
                                        62,
                                        -50
                                    ]
                                }),
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$c70aacca60c78502), {
                                    text: "Creative",
                                    position: [
                                        50,
                                        60,
                                        60
                                    ],
                                    rotation: [
                                        0,
                                        Math.PI * 1.5,
                                        0
                                    ]
                                }),
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$c70aacca60c78502), {
                                    text: "Miscellaneous",
                                    position: [
                                        -60,
                                        40,
                                        75
                                    ],
                                    rotation: [
                                        0,
                                        Math.PI / 2,
                                        0
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)($9e79c54aa8a563fd$var$CameraLight, {}),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("ambientLight", {
                            intensity: 0.1
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("directionalLight", {
                            position: [
                                5,
                                35,
                                5
                            ],
                            intensity: 1.0,
                            castShadow: true,
                            "shadow-mapSize-width": 512,
                            "shadow-mapSize-height": 512,
                            "shadow-camera-near": 1,
                            "shadow-camera-far": 200,
                            "shadow-camera-left": -100,
                            "shadow-camera-right": 100,
                            "shadow-camera-top": 100,
                            "shadow-camera-bottom": -100,
                            "shadow-bias": -0.005
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("mesh", {
                            position: [
                                0,
                                10,
                                0
                            ],
                            children: [
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("sphereGeometry", {
                                    args: [
                                        2,
                                        32,
                                        32
                                    ]
                                }),
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("meshStandardMaterial", {
                                    color: "red"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("color", {
                            attach: "background",
                            args: [
                                "#0a0a1a"
                            ]
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)($9e79c54aa8a563fd$var$CityModel, {}),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactthreepostprocessing.EffectComposer), {
                            enabled: !isOverlayActive,
                            children: [
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreepostprocessing.HueSaturation), {
                                    hue: 0.1,
                                    saturation: 0.2
                                }),
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreepostprocessing.BrightnessContrast), {
                                    brightness: 0.05,
                                    contrast: 0.2
                                }),
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreepostprocessing.Bloom), {
                                    intensity: 3,
                                    luminanceThreshold: 0.05,
                                    luminanceSmoothing: 0.1
                                }),
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreepostprocessing.Vignette), {
                                    eskil: false,
                                    offset: 0.1,
                                    darkness: 0.7
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


/**
 * @module Documentation
 * @category Scenes
 * @description Technical showcase featuring an interactive 3D tablet.
 */ 







var $3a805d76f32be13e$import_meta = Object.assign(Object.create(null), {
    url: "file:///src/documentation.jsx"
});
/**
 * Creates the tablet that the documentation is embedded on
 * @component
 * @category 3D Objects
 * @description
 * Creates a tablet that then displays the static documentation site
 * @returns {JSX.Element}
 */ function $3a805d76f32be13e$var$Tablet() {
    /**
   * Allows for site navigation
   * @function
   * @type {useNavigate}
   */ const navigate = (0, $8I7SX$reactrouterdom.useNavigate)();
    /**
   * Navigates back to home when pressed
   * @function
   * @type {function}
   */ const handleHomeClick = ()=>{
        navigate(`/`);
    };
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("group", {
        position: [
            0,
            1.5,
            -4
        ],
        rotation: [
            -Math.PI / 10,
            0,
            0
        ],
        children: [
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("mesh", {
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("boxGeometry", {
                        args: [
                            3.5,
                            5.5,
                            0.15
                        ]
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("meshStandardMaterial", {
                        color: "#111",
                        roughness: 0.2
                    })
                ]
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Html), {
                transform: true,
                occlude: "blending",
                distanceFactor: 2,
                position: [
                    0,
                    0,
                    0.08
                ],
                children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("div", {
                    className: "tablet-screen",
                    children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("iframe", {
                        className: "tablet-iframe",
                        src: `${$3a805d76f32be13e$import_meta.env.BASE_URL}docs/index.html`,
                        title: "Documentation"
                    })
                })
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("mesh", {
                position: [
                    0,
                    -2.5,
                    0.08
                ],
                onClick: handleHomeClick,
                onPointerOver: ()=>document.body.style.cursor = "pointer",
                onPointerOut: ()=>document.body.style.cursor = "auto",
                children: [
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("circleGeometry", {
                        args: [
                            0.15,
                            32
                        ]
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("meshStandardMaterial", {
                        color: "#F22"
                    })
                ]
            })
        ]
    });
}
function $3a805d76f32be13e$var$CameraRig() {
    const { camera: camera } = (0, $8I7SX$reactthreefiber.useThree)();
    const [active, setActive] = (0, $8I7SX$react.useState)(true);
    // 1. Create the target as a Vector3 object so distanceTo works correctly
    const target = (0, $8I7SX$react.useMemo)(()=>new $8I7SX$three.Vector3(0, 0.75, 2.5), []);
    const tempVec = (0, $8I7SX$react.useMemo)(()=>new $8I7SX$three.Vector3(), []);
    (0, $8I7SX$reactthreefiber.useFrame)((state)=>{
        if (!active) return;
        // 2. Smoothly move toward the target
        // Increased speed slightly to 0.05 for a better feel
        state.camera.position.lerp(target, 0.03);
        // 3. Keep eyes on the monitor
        state.camera.lookAt(0, 1, -4.5);
        // 4. Correct distance check (Vector3 vs Vector3)
        if (state.camera.position.distanceTo(target) < 0.1) {
            setActive(false);
            console.log("Animation complete. OrbitControls engaged.");
        }
    });
    return(// Attach a pointLight directly to the camera
    // This light moves wherever the camera moves
    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("primitive", {
        object: camera,
        children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("pointLight", {
            intensity: 3,
            distance: 20,
            color: "white"
        })
    }));
}
function $3a805d76f32be13e$export$2e2bcd8739ae039() {
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("div", {
        style: {
            width: "100vw",
            height: "100vh",
            position: "relative"
        },
        children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$react.Suspense), {
            fallback: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $919cea3b052cd76d$export$3b0d6d7590275603), {}),
            children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactthreefiber.Canvas), {
                dpr: [
                    1,
                    1.5
                ],
                gl: {
                    powerPreference: "high-performance",
                    antialias: false
                },
                camera: {
                    position: [
                        10,
                        10,
                        20
                    ],
                    fov: 50
                },
                children: [
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)($3a805d76f32be13e$var$CameraRig, {}),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("ambientLight", {
                        intensity: 0.5
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Environment), {
                        preset: "city"
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.ContactShadows), {
                        position: [
                            0,
                            -0.8,
                            0
                        ],
                        opacity: 0.4,
                        scale: 10,
                        blur: 2,
                        far: 0.8
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("pointLight", {
                        position: [
                            2,
                            2,
                            2
                        ],
                        intensity: 1.5,
                        color: "#ff00ff"
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)($3a805d76f32be13e$var$Tablet, {}),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactthreepostprocessing.EffectComposer), {
                        children: [
                            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreepostprocessing.Bloom), {
                                luminanceThreshold: 1,
                                intensity: 1.5,
                                levels: 9,
                                mipmapBlur: true
                            }),
                            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreepostprocessing.Noise), {
                                opacity: 0.05
                            }),
                            " ",
                            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreepostprocessing.Vignette), {
                                eskil: false,
                                offset: 0.1,
                                darkness: 1.1
                            })
                        ]
                    })
                ]
            })
        })
    });
}


/**
 * @module NHS
 * @category Scenes
 * @description Case study to showcase data visualisation with NHS data
 */ 






var $5786b60eebf519eb$import_meta = Object.assign(Object.create(null), {
    url: "file:///src/nhs.jsx"
});
const $5786b60eebf519eb$var$CENTER = [
    -3.44,
    55.36
];
const $5786b60eebf519eb$var$createRegionShape = (feature)=>{
    if (!feature.geometry) return [];
    const type = feature.geometry.type;
    const coords = feature.geometry.coordinates;
    const processPolygon = (polygonCoords)=>{
        const shape = new $8I7SX$three.Shape();
        polygonCoords[0].forEach((coord, i)=>{
            // DO NOT subtract CENTER here. Keep raw coordinates.
            const x = coord[0];
            const y = coord[1];
            if (i === 0) shape.moveTo(x, y);
            else shape.lineTo(x, y);
        });
        return shape;
    };
    if (type === "Polygon") return [
        processPolygon(coords)
    ];
    if (type === "MultiPolygon") return coords.map((poly)=>processPolygon(poly));
    return [];
};
function $5786b60eebf519eb$var$UKDashboard({ regionsGeoJson: regionsGeoJson, locationsCsvUrl: locationsCsvUrl }) {
    const rawGeoJson = (0, $8I7SX$reactthreefiber.useLoader)($8I7SX$three.FileLoader, regionsGeoJson);
    const rawCsv = (0, $8I7SX$reactthreefiber.useLoader)($8I7SX$three.FileLoader, locationsCsvUrl);
    const regionsData = (0, $8I7SX$react.useMemo)(()=>JSON.parse(rawGeoJson), [
        rawGeoJson
    ]);
    const locations = (0, $8I7SX$react.useMemo)(()=>$8I7SX$d3.csvParse(rawCsv), [
        rawCsv
    ]);
    const regionMeshes = (0, $8I7SX$react.useMemo)(()=>{
        return regionsData.features.map((feature, idx)=>{
            const shapes = $5786b60eebf519eb$var$createRegionShape(feature);
            return {
                id: feature.properties.areacd || idx,
                name: feature.properties.areanm,
                shapes: shapes
            };
        });
    }, [
        regionsData
    ]);
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("group", {
        scale: 25,
        children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("group", {
            position: [
                -$5786b60eebf519eb$var$CENTER[0],
                0,
                $5786b60eebf519eb$var$CENTER[1]
            ],
            rotation: [
                -Math.PI / 2,
                0,
                0
            ],
            children: [
                " ",
                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("group", {
                    children: regionMeshes.map((region)=>region.shapes.map((shape, i)=>/*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("mesh", {
                                position: [
                                    0,
                                    0,
                                    0
                                ],
                                children: [
                                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("extrudeGeometry", {
                                        args: [
                                            shape,
                                            {
                                                depth: 0.2,
                                                bevelEnabled: false
                                            }
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("meshStandardMaterial", {
                                        color: "#005EB8" // NHS Blue
                                        ,
                                        transparent: true,
                                        opacity: 0.55,
                                        emissive: "#6a0dad",
                                        emissiveIntensity: 0.3,
                                        side: $8I7SX$three.DoubleSide
                                    })
                                ]
                            }, `${region.id}-${i}`)))
                }),
                locations.map((loc, i)=>{
                    const lon = parseFloat(loc.Longitude);
                    const lat = parseFloat(loc.Latitude);
                    if (lat < 49 || lat > 61 || lon < -10 || lon > 3) return null;
                    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("group", {
                        position: [
                            lon,
                            lat,
                            0.2
                        ],
                        children: [
                            " ",
                            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("mesh", {
                                children: [
                                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("sphereGeometry", {
                                        args: [
                                            0.03,
                                            16,
                                            16
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("meshBasicMaterial", {
                                        color: "#00f5d4"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("mesh", {
                                position: [
                                    0,
                                    0,
                                    1
                                ],
                                rotation: [
                                    Math.PI / 2,
                                    0,
                                    0
                                ],
                                children: [
                                    " ",
                                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("cylinderGeometry", {
                                        args: [
                                            0.02,
                                            0.02,
                                            2
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("meshBasicMaterial", {
                                        color: "#00f5d4",
                                        transparent: true,
                                        opacity: 0.3
                                    })
                                ]
                            })
                        ]
                    }, i);
                })
            ]
        })
    });
}
function $5786b60eebf519eb$export$2e2bcd8739ae039() {
    // UI states
    const [controlsEnabled, setControlsEnabled] = (0, $8I7SX$react.useState)(true);
    // Camera/interaction state
    const controlsRef = (0, $8I7SX$react.useRef)();
    /**
   * Toggles the overlay and OrbitControls simultaneously.
   */ const toggleOverlay = ()=>{
        setOverlayActive((prev)=>{
            const newState = !prev;
            if (controlsRef.current) controlsRef.current.enabled = !newState;
            return newState;
        });
    };
    /**
   * Starts city background audio on first interaction.
   */ const audioRef = (0, $8I7SX$react.useRef)(null);
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("div", {
        style: {
            width: "100vw",
            height: "100vh",
            position: "relative"
        },
        children: [
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $919cea3b052cd76d$export$b20d2d957c657ed9), {
                url: `${$5786b60eebf519eb$import_meta.env.BASE_URL}NHS/hospital_ambience.mp3`
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$react.Suspense), {
                fallback: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $919cea3b052cd76d$export$3b0d6d7590275603), {}),
                children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactthreefiber.Canvas), {
                    shadows: true,
                    camera: {
                        position: [
                            0,
                            330,
                            140
                        ],
                        fov: 50,
                        near: 1,
                        far: 5000
                    },
                    dpr: [
                        1,
                        1.5
                    ],
                    gl: {
                        antialias: true
                    },
                    performance: {
                        min: 0.8
                    },
                    children: [
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)($5786b60eebf519eb$var$UKDashboard, {
                            regionsGeoJson: `${$5786b60eebf519eb$import_meta.env.BASE_URL}NHS/unitedkingdom.geojson`,
                            locationsCsvUrl: `${$5786b60eebf519eb$import_meta.env.BASE_URL}NHS/hospital_locations_england.csv`
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.OrbitControls), {
                            ref: controlsRef,
                            target: [
                                0,
                                0,
                                0
                            ],
                            enablePan: false,
                            maxPolarAngle: Math.PI / 2,
                            minDistance: 10,
                            maxDistance: 4000,
                            enabled: controlsEnabled
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("ambientLight", {
                            intensity: 0.8
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("directionalLight", {
                            position: [
                                300,
                                300,
                                300
                            ],
                            intensity: 3
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("mesh", {
                            position: [
                                5,
                                0,
                                -2
                            ],
                            children: [
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("sphereGeometry", {
                                    args: [
                                        2,
                                        32,
                                        32
                                    ]
                                }),
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("meshStandardMaterial", {
                                    color: "red"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("color", {
                            attach: "background",
                            args: [
                                "#ffffff"
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


/**
 * @module Population
 * @category Scenes
 * @description The high-performance urban landing page.
 */ 






var $35b197c452fc46d2$import_meta = Object.assign(Object.create(null), {
    url: "file:///src/population.jsx"
});
/*
const continentsGeoJson = await fetch(
  `${import.meta.env.BASE_URL}Population/world.geojson`,
).then((res) => res.json());



const continentsSet = new Set(
  continentsGeoJson.features.map((f) => f.properties),
);
console.log(continentsSet);
*/ const $35b197c452fc46d2$var$continentsGeoJson = await fetch(`${$35b197c452fc46d2$import_meta.env.BASE_URL}Population/continentsSmall.geo.json`).then((res)=>res.json());
/**
 * GlobeModel manages the complex OBJ/MTL loading and asset disposal.
 * @component
 * @type {function}
 * @category 3D Assets
 * @returns {JSX.Element}
 */ function $35b197c452fc46d2$var$GlobeModel({ continents: continents, setHoverData: setHoverData, colorMode: colorMode }) {
    const globeTexture = (0, $8I7SX$reactthreedrei.useTexture)("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg");
    const continentColors = (0, $8I7SX$react.useMemo)(()=>({
            Africa: "#FF595E",
            Asia: "#FFCA3A",
            Europe: "#8AC926",
            "North America": "#1982C4",
            "South America": "#6A4C93",
            Oceania: "#FF924C",
            Antarctica: "#F8F9FA"
        }), []);
    const countryPalette = [
        "#FF595E",
        "#FFCA3A",
        "#8AC926",
        "#1982C4",
        "#6A4C93",
        "#FF924C",
        "#00F5D4",
        "#F15BB5",
        "#00BBF9",
        "#FEE440",
        "#310A31",
        "#84DCC6",
        "#A5ffd6"
    ];
    // TO DO: FIND WAY TO PULL REAL WORLD DATA FOR POPULATION VALUES
    const continentPopulation = (0, $8I7SX$react.useMemo)(()=>({
            Africa: 1550000000,
            Asia: 4835000000,
            Europe: 744000000,
            "North America": 617000000,
            "South America": 438000000,
            Oceania: 46000000
        }), []);
    /**
   * Ensures that the world updates whenever the data changes
   * @function
   * @type {useMemo}
   * @returns {function}
   */ const processedData = (0, $8I7SX$react.useMemo)(()=>{
        if (!continents) return [];
        return continents.features.map((f)=>{
            const continent = f.properties.continent;
            return {
                ...f,
                continent: continent,
                population: continentPopulation[continent] ?? 0,
                colorIndex: f.properties.mapcolor13 || f.properties.mapcolor7 || 0
            };
        });
    }, [
        continents,
        continentPopulation
    ]);
    /**
   * Returns differing colours based on the position of the country in the country array
   * @function
   * @type {function}
   * @returns {function}
   */ const getPolygonColor = (d)=>{
        if (colorMode === "none") return "rgba(106, 13, 173, 0.1)"; // Ghostly purple
        if (colorMode === "country") return countryPalette[d.colorIndex % countryPalette.length];
        return continentColors[d.continent] || "#999"; // Default fallback colour
    };
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, ($parcel$interopDefault($8I7SX$r3fglobe))), {
        // Globe Settings
        globeImageUrl: globeTexture.image.src,
        showAtmosphere: true,
        atmosphereColor: "skyblue",
        atmosphereAltitude: 0.5,
        // Polygon Layer
        polygonsData: processedData,
        polygonGeoJsonGeometry: "geometry",
        polygonCapColor: getPolygonColor,
        polygonSideColor: ()=>"rgba(255, 255, 255, 0.1)",
        polygonStrokeColor: ()=>colorMode === "none" ? "#6a0dad" : "#111",
        polygonAltitude: 0.01,
        polygonsTransitionDuration: 400,
        // Interaction
        onHover: (hoverObj, hoverData)=>{
            if (hoverData) {
                const name = hoverData.continent; // Using the mapped key
                const contPopRaw = continentPopulation[name] || 0; // Raw continent population number
                const countryPopRaw = hoverData.properties.pop_est || 0; // Raw country population number
                setHoverData({
                    continentName: name,
                    continentPopulation: contPopRaw,
                    countryName: hoverData.properties.formal_en,
                    countryPopulation: countryPopRaw,
                    countryPopulationYear: hoverData.properties.pop_year
                });
                document.body.style.cursor = "pointer";
            } else {
                setHoverData(null);
                document.body.style.cursor = "default";
            }
        }
    });
}
/**
 * Allows for displaying country information when hovering over the globe
 *
 * @component
 * @returns {JSX.Element} - A tooltip for information on countries
 */ const $35b197c452fc46d2$var$GlobeTooltip = ({ data: data })=>{
    if (!data) return null;
    const percentage = data.continentPopulation > 0 ? data.countryPopulation / data.continentPopulation * 100 : 0;
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("div", {
        style: {
            position: "fixed",
            top: "20px",
            left: "20px",
            zIndex: 2000,
            padding: "10px 20px",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            border: "1px solid #6a0dad",
            borderRadius: "2px",
            fontFamily: "monospace",
            fontSize: "clamp(8px, 0.7vw, 12px)",
            backdropFilter: "blur(10px)",
            textTransform: "uppercase"
        },
        children: [
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("h1", {
                children: [
                    "Country: ",
                    data.countryName
                ]
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("p", {
                children: [
                    "Population: ",
                    data.countryPopulation.toLocaleString()
                ]
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("p", {
                children: [
                    "Year of Census: ",
                    data.countryPopulationYear
                ]
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("hr", {}),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("p", {
                children: [
                    "Continent: ",
                    data.continentName
                ]
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("p", {
                children: [
                    "Continent's Population: ",
                    data.continentPopulation.toLocaleString()
                ]
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("hr", {}),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("p", {
                children: [
                    "Share of Continent Population: ",
                    percentage.toFixed(2),
                    "%"
                ]
            })
        ]
    });
};
/**
 * Allows for changing the display mode of the globe
 *
 * @component
 * @returns {JSX.Element} - A visualisation changing panel
 */ const $35b197c452fc46d2$var$ColorControls = ({ currentMode: currentMode, setMode: setMode })=>{
    const modes = [
        {
            id: "none",
            label: "Wireframe / Ghost"
        },
        {
            id: "continent",
            label: "By Continent"
        },
        {
            id: "country",
            label: "By Country"
        }
    ];
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("div", {
        style: {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 2000,
            background: "rgba(0,0,0,0.8)",
            padding: "10px",
            border: "1px solid #6a0dad",
            fontFamily: "monospace",
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: "5px"
        },
        children: [
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("div", {
                style: {
                    fontSize: "10px",
                    marginBottom: "5px",
                    opacity: 0.7
                },
                children: "VISUALISATION MODE"
            }),
            modes.map((m)=>/*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("button", {
                    onClick: ()=>setMode(m.id),
                    style: {
                        background: currentMode === m.id ? "#6a0dad" : "transparent",
                        color: "white",
                        border: "1px solid #6a0dad",
                        cursor: "pointer",
                        padding: "5px 10px",
                        textAlign: "left",
                        textTransform: "uppercase",
                        fontSize: "11px"
                    },
                    children: m.label
                }, m.id))
        ]
    });
};
function $35b197c452fc46d2$export$2e2bcd8739ae039() {
    // UI states
    const [controlsEnabled, setControlsEnabled] = (0, $8I7SX$react.useState)(true);
    const [isOverlayActive, setOverlayActive] = (0, $8I7SX$react.useState)(false);
    const [hoverData, setHoverData] = (0, $8I7SX$react.useState)(null);
    const [colorMode, setColorMode] = (0, $8I7SX$react.useState)("continent");
    // Camera/interaction state
    const controlsRef = (0, $8I7SX$react.useRef)();
    const [showExitButton, setShowExitButton] = (0, $8I7SX$react.useState)(false);
    /**
   * Returns camera to initial view and re-enables controls after interacting with banners.
   */ const resetOrbit = ()=>{
        setOpenBannerId(null);
        controlsRef.current.target.copy(new $8I7SX$three.Vector3(0, 0, 0));
        setShowExitButton(false);
        setControlsEnabled(true);
    };
    const audioRef = (0, $8I7SX$react.useRef)(null);
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("div", {
        style: {
            width: "100vw",
            height: "100vh",
            position: "relative"
        },
        children: [
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)($35b197c452fc46d2$var$GlobeTooltip, {
                data: hoverData
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)($35b197c452fc46d2$var$ColorControls, {
                currentMode: colorMode,
                setMode: setColorMode
            }),
            showExitButton && /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("button", {
                className: "smallTextButton",
                onClick: resetOrbit,
                children: "Return"
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $919cea3b052cd76d$export$b20d2d957c657ed9), {
                url: `${$35b197c452fc46d2$import_meta.env.BASE_URL}Population/nature_ambience.mp3`
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$react.Suspense), {
                fallback: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $919cea3b052cd76d$export$3b0d6d7590275603), {}),
                children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactthreefiber.Canvas), {
                    shadows: true,
                    camera: {
                        position: [
                            0,
                            70,
                            400
                        ],
                        fov: 50,
                        near: 1,
                        far: 5000
                    },
                    dpr: [
                        1,
                        1.5
                    ],
                    gl: {
                        antialias: true
                    },
                    performance: {
                        min: 0.8
                    },
                    children: [
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.OrbitControls), {
                            ref: controlsRef,
                            target: [
                                0,
                                0,
                                0
                            ],
                            enablePan: false,
                            maxPolarAngle: Math.PI / 2,
                            minDistance: 10,
                            maxDistance: 4000,
                            enabled: controlsEnabled
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("ambientLight", {
                            intensity: 0.8
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("directionalLight", {
                            position: [
                                300,
                                300,
                                300
                            ],
                            intensity: 3
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("mesh", {
                            position: [
                                5,
                                0,
                                -2
                            ],
                            children: [
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("sphereGeometry", {
                                    args: [
                                        2,
                                        32,
                                        32
                                    ]
                                }),
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("meshStandardMaterial", {
                                    color: "red"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("group", {
                            position: [
                                0,
                                0,
                                0
                            ],
                            children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)($35b197c452fc46d2$var$GlobeModel, {
                                continents: $35b197c452fc46d2$var$continentsGeoJson,
                                setHoverData: setHoverData,
                                colorMode: colorMode
                            })
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("color", {
                            attach: "background",
                            args: [
                                "#ffffff"
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


/**
 * @module Portfolio
 * @category Scenes
 * @description The computer portfolio scene, with static wordpress showcased via a computer model
 */ 







var $a0362f18e412ef3b$import_meta = Object.assign(Object.create(null), {
    url: "file:///src/portfolio.jsx"
});
//const clickSound = new Audio("./Computer/mouse_click.mp3");
const $a0362f18e412ef3b$var$buttonSound = new Audio("./Computer/button_click.mp3");
/**
 * Handles the cinematic smooth camera transition on mount.
 * @component
 * @param {function} onComplete - the function to be called once the linear interpolation is finished
 * @category Camera Logic
 * @description
 * Uses `useFrame` to linearly interpolate (lerp) the camera from its global position
 * to a specific focus point in front of the monitor. Once the camera is within
 * a threshold distance, the animation "disengages" to allow for other interactions.
 * @returns {null}
 */ function $a0362f18e412ef3b$var$CameraRig({ onComplete: onComplete }) {
    const [active, setActive] = (0, $8I7SX$react.useState)(true);
    /** @type {THREE.Vector3} */ // Target coordinates for the camera focus point
    const target = (0, $8I7SX$react.useMemo)(()=>new $8I7SX$three.Vector3(0, 0.75, 2.5), []);
    /**
   * Linearly interpolates the cameras position and rotation to simulate a rig animation
   * @function
   * @param {RootState} state
   * @type {useFrame}
   */ (0, $8I7SX$reactthreefiber.useFrame)((state)=>{
        if (!active) return;
        state.camera.position.lerp(target, 0.03);
        state.camera.lookAt(0, 1, -4.5);
        if (state.camera.position.distanceTo(target) < 0.1) {
            setActive(false);
            if (onComplete) onComplete();
        }
    });
    return null;
}
/**
 * Utility developer component for coordinate mapping.
 * @component
 * @category Developer
 * @description Listens for a 'Q' keypress and logs the current camera Position/Rotation.
 * @returns {null}
 */ function $a0362f18e412ef3b$var$CameraLogger() {
    /**
   * Retrieves the 3D scene's camera
   * @function
   * @type {useThree}
   */ const { camera: camera } = (0, $8I7SX$reactthreefiber.useThree)();
    /**
   * A tool to check if a key has been pressed
   * @function
   * @type {useEffect}
   * @returns {function}
   */ (0, $8I7SX$react.useEffect)(()=>{
        /** If the Q key is pressed at any point */ const handleKeyDown = (event)=>{
            if (event.key.toLowerCase() === "q") {
                const { x: x, y: y, z: z } = camera.position;
                const { x: rx, y: ry, z: rz } = camera.rotation;
                /** Print the camera's position and rotation strictly to two decimal places */ console.log("--- Camera Coordinates ---");
                console.log(`Position: [${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)}]`);
                console.log(`Rotation: [${rx.toFixed(2)}, ${ry.toFixed(2)}, ${rz.toFixed(2)}]`);
            }
        };
        /** Ensures that the event listener is active and also cleaned up on removal of this function */ window.addEventListener("keydown", handleKeyDown);
        return ()=>window.removeEventListener("keydown", handleKeyDown);
    }, [
        camera
    ]);
    return null;
}
/**
 * The 3D Computer terminal assembly.
 * @component
 * @category Interactive gects
 * @description
 * Renders a GLTF monitor model with interactive hardware buttons and an embedded HTML screen.
 * @returns {JSX.Element}
 */ function $a0362f18e412ef3b$var$Computer({ onReady: onReady }) {
    /** @type {String|null} */ // State to track which button is currently being hovered
    const [hoveredText, setHoveredText] = (0, $8I7SX$react.useState)(null);
    /** @type {Boolean|null} */ // Controls the visibility of CRT scanlines and flicker overlays
    const [showEffects, setShowEffects] = (0, $8I7SX$react.useState)(true);
    /** @type {Boolean|null} */ const [shouldLoadIframe, setShouldLoadIframe] = (0, $8I7SX$react.useState)(false);
    /**
   * Retrieve's the computer model .GLB
   * @function
   * @type {useGLTF}
   */ const { scene: scene, nodes: nodes } = (0, $8I7SX$reactthreedrei.useGLTF)(`${$a0362f18e412ef3b$import_meta.env.BASE_URL}Computer/Monitor2.glb`);
    /**
   * Retrieves the current page location
   * @function
   * @type {useLocation}
   */ const location = (0, $8I7SX$reactrouterdom.useLocation)();
    /**
   * Allows for site navigation
   * @function
   * @type {useNavigate}
   */ const navigate = (0, $8I7SX$reactrouterdom.useNavigate)();
    /** @type {String} */ const iframeSrc = `${location.state?.iframeUrl}` || `${$a0362f18e412ef3b$import_meta.env.BASE_URL}Portfolio/index.html`;
    //const iframeSrc = `${import.meta.env.BASE_URL}Portfolio/index.html`;
    //console.log(`The should be showing iframe site is: ${iframeSrc}`);
    /**
   * Calculates the geometric center of the screen mesh
   * @function
   * @type {useMemo}
   * @returns {Array<number>} [x, y, z] offset relative to the mesh position.
   */ const centerOffset = (0, $8I7SX$react.useMemo)(()=>{
        if (!nodes.Screen) return [
            0,
            0,
            0
        ];
        const box = new $8I7SX$three.Box3().setFromObject(nodes.Screen);
        const center = new $8I7SX$three.Vector3();
        box.getCenter(center);
        return [
            center.x - nodes.Screen.position.x,
            center.y - nodes.Screen.position.y,
            center.z - nodes.Screen.position.z
        ];
    }, [
        nodes
    ]);
    /**
   * Makes sound on button press
   * @function
   * @type {function}
   * @returns {void}
   */ const playButton = ()=>{
        $a0362f18e412ef3b$var$buttonSound.currentTime = 0;
        $a0362f18e412ef3b$var$buttonSound.play();
    };
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("group", {
        children: [
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("primitive", {
                object: scene
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)($a0362f18e412ef3b$var$CameraRig, {
                onComplete: ()=>{
                    setShouldLoadIframe(true);
                    onReady;
                }
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("mesh", {
                position: [
                    nodes.Button.position.x - 0.17,
                    nodes.Button.position.y,
                    nodes.Button.position.z + 0.027
                ],
                rotation: nodes.Button.rotation,
                scale: nodes.Button.scale,
                onClick: ()=>{
                    playButton();
                    navigate(`/Documentation`);
                },
                onPointerOver: ()=>{
                    setHoveredText("Site Documentation");
                    document.body.style.cursor = "pointer";
                },
                onPointerOut: ()=>{
                    setHoveredText(null);
                    document.body.style.cursor = "auto";
                },
                children: [
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("primitive", {
                        object: nodes.Button.geometry,
                        attach: "geometry"
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("meshStandardMaterial", {
                        color: "blue",
                        emissive: "cornflowerblue",
                        emissiveIntensity: 0.5
                    })
                ]
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("mesh", {
                position: nodes.Button.position,
                rotation: nodes.Button.rotation,
                scale: nodes.Button.scale,
                onClick: ()=>{
                    setShowEffects(!showEffects);
                    playButton();
                },
                onPointerOver: ()=>{
                    setHoveredText("Toggle CRT Effects");
                    document.body.style.cursor = "pointer";
                },
                onPointerOut: ()=>{
                    setHoveredText(null);
                    document.body.style.cursor = "auto";
                },
                children: [
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("primitive", {
                        object: nodes.Button.geometry,
                        attach: "geometry"
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("meshStandardMaterial", {
                        color: showEffects ? "green" : "red",
                        emissive: showEffects ? "green" : "red",
                        emissiveIntensity: 0.5
                    })
                ]
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("mesh", {
                position: [
                    nodes.Button.position.x + 0.15,
                    nodes.Button.position.y,
                    nodes.Button.position.z
                ],
                rotation: nodes.Button.rotation,
                scale: nodes.Button.scale,
                onClick: ()=>{
                    playButton();
                    navigate("/", {
                        replace: true
                    });
                },
                onPointerOver: ()=>{
                    setHoveredText("Go to Last Page");
                    document.body.style.cursor = "pointer";
                },
                onPointerOut: ()=>{
                    setHoveredText(null);
                    document.body.style.cursor = "auto";
                },
                children: [
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("primitive", {
                        object: nodes.Button.geometry,
                        attach: "geometry"
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("meshStandardMaterial", {
                        color: "goldenrod",
                        emissive: "gold",
                        emissiveIntensity: 0.8
                    })
                ]
            }),
            hoveredText && /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Html), {
                position: [
                    nodes.Button.position.x + 0.075,
                    nodes.Button.position.y + 0.2,
                    nodes.Button.position.z
                ],
                center: true,
                distanceFactor: 3,
                children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("div", {
                    className: "monitor-tooltip",
                    children: hoveredText
                })
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("group", {
                position: nodes.Screen.position,
                rotation: nodes.Screen.rotation,
                scale: nodes.Screen.scale,
                children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Html), {
                    occlude: false,
                    transform: true,
                    "rotation-order": "YXZ",
                    position: [
                        centerOffset[0] + 0.09,
                        centerOffset[1],
                        centerOffset[2] - 0.05
                    ],
                    "rotation-y": Math.PI / 2,
                    "rotation-x": -0.15,
                    distanceFactor: 0.7,
                    center: true,
                    children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("div", {
                        className: `screen-container ${showEffects ? "effects-active" : ""}`,
                        children: [
                            shouldLoadIframe ? /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("iframe", {
                                src: iframeSrc,
                                className: "monitor-iframe"
                            }) : /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("div", {
                                className: "loading-placeholder",
                                children: "Booting Terminal..."
                            }),
                            showEffects && /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactjsxruntime.Fragment), {
                                children: [
                                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("div", {
                                        className: "scanline-layer"
                                    }),
                                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("div", {
                                        className: "flicker-layer"
                                    })
                                ]
                            })
                        ]
                    })
                })
            })
        ]
    });
}
(0, $8I7SX$reactthreedrei.useGLTF).preload(`${$a0362f18e412ef3b$import_meta.env.BASE_URL}Computer/Monitor2.glb`);
function $a0362f18e412ef3b$export$2e2bcd8739ae039() {
    const [isReady, setIsReady] = (0, $8I7SX$react.useState)(false);
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("div", {
        style: {
            width: "100vw",
            height: "100vh",
            position: "relative"
        },
        children: [
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $919cea3b052cd76d$export$b20d2d957c657ed9), {
                url: `${$a0362f18e412ef3b$import_meta.env.BASE_URL}Computer/office_ambience.mp3`
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$react.Suspense), {
                fallback: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $919cea3b052cd76d$export$3b0d6d7590275603), {}),
                children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactthreefiber.Canvas), {
                    dpr: [
                        1,
                        1.5
                    ],
                    gl: {
                        powerPreference: "high-performance",
                        antialias: false
                    },
                    camera: {
                        position: [
                            10,
                            10,
                            20
                        ],
                        fov: 50
                    },
                    children: [
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("ambientLight", {
                            intensity: 0.5
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Environment), {
                            preset: "city"
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)($a0362f18e412ef3b$var$Computer, {
                            onReady: ()=>setIsReady(true)
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)($a0362f18e412ef3b$var$CameraLogger, {}),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("group", {
                            children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("gridHelper", {
                                args: [
                                    10,
                                    10
                                ]
                            })
                        }),
                        isReady && /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactthreepostprocessing.EffectComposer), {
                            children: [
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreepostprocessing.Noise), {
                                    opacity: 0.05
                                }),
                                /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreepostprocessing.Vignette), {
                                    eskil: false,
                                    offset: 0.1,
                                    darkness: 1.1
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


window.reactComponents = {};
window.vueComponents = {};
window.React = (0, ($parcel$interopDefault($8I7SX$react)));
window.ReactDOM = (0, ($parcel$interopDefault($8I7SX$reactdom)));
window.ReactWrapper = (0, (/*@__PURE__*/$parcel$interopDefault($99e5c865b19c7c75$exports)));
reactComponents['City'] = (0, $9e79c54aa8a563fd$export$2e2bcd8739ae039);
reactComponents['City'] = (0, $9e79c54aa8a563fd$export$2e2bcd8739ae039);
reactComponents['City'] = (0, $9e79c54aa8a563fd$export$2e2bcd8739ae039);
reactComponents['Documentation'] = (0, $3a805d76f32be13e$export$2e2bcd8739ae039);
reactComponents['Documentation'] = (0, $3a805d76f32be13e$export$2e2bcd8739ae039);
reactComponents['NHS'] = (0, $5786b60eebf519eb$export$2e2bcd8739ae039);
reactComponents['Population'] = (0, $35b197c452fc46d2$export$2e2bcd8739ae039);
reactComponents['Population'] = (0, $35b197c452fc46d2$export$2e2bcd8739ae039);
reactComponents['Population'] = (0, $35b197c452fc46d2$export$2e2bcd8739ae039);
reactComponents['Population'] = (0, $35b197c452fc46d2$export$2e2bcd8739ae039);
reactComponents['Portfolio'] = (0, $a0362f18e412ef3b$export$2e2bcd8739ae039);
reactComponents['Portfolio'] = (0, $a0362f18e412ef3b$export$2e2bcd8739ae039);
reactComponents['Portfolio'] = (0, $a0362f18e412ef3b$export$2e2bcd8739ae039);
reactComponents['Portfolio'] = (0, $a0362f18e412ef3b$export$2e2bcd8739ae039);


//# sourceMappingURL=main.js.map
