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
var $8I7SX$threestdlib = require("three-stdlib");
var $8I7SX$reactthreepostprocessing = require("@react-three/postprocessing");
var $8I7SX$reactspringweb = require("@react-spring/web");
var $8I7SX$reactrouterdom = require("react-router-dom");
var $8I7SX$reactspringthree = require("@react-spring/three");


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
 * City scene component and model loaders.
 * @module City
 */ 






var $c899916b68c87ba7$exports = {};
$c899916b68c87ba7$exports = JSON.parse('{"projects":[{"title":"NIKE","abstract":"This report examines Nike\'s branding strategy and its successful transition into the e-business domain. Employing the brand equity model and the customer decision journey framework, the study dissects Nike\u2019s marketing efforts, including sports sponsorships and ambassadorships. It evaluates Nike\'s ability to create positive brand perceptions, fostering customer loyalty and increasing market share. The analysis highlights potential pitfalls, such as over-dependence on ambassadors and brand diversification risks, while offering recommendations for bolstering brand equity and exploring untapped markets.","siteLink":"Portfolio/research-projects/nike-2/","model":"/files/bia/nike.glb"},{"title":"Uber","abstract":"The paper explores Uber\'s application of machine learning to enhance its customer experience, focusing on improving the pickup process. It introduces an improved pickup quality metric that incorporates active, passive, and third-party signals to minimize delays and enhance user satisfaction. Additionally, the study examines strategies to refine time estimation accuracy, reduce driver loops, and optimize user interaction. The integration of advanced AI platforms, such as Horovod and Michelangelo, demonstrates Uber\u2019s commitment to leveraging data for operational efficiency and user-centric innovations.","siteLink":"Pages/BIA/uber/uber.html","website":"https://aremuart.wordpress.com/research-projects/uber/","private":"yes","model":"/files/bia/uber.glb"},{"title":"Amazon","abstract":"This evaluation analyzes Amazon.com\'s usability through heuristic evaluations and user journey assessments. Highlighting its strengths in navigation, search efficiency, and aesthetics, the paper also identifies areas for improvement, such as limited accessibility options and insufficient error diagnostics. Proposed redesigns incorporate better visual hierarchy, enhanced color contrast, and streamlined accessibility features to improve customer experience. The study concludes that while Amazon excels in creating a user-friendly platform, addressing minor usability flaws could further optimize the e-commerce giant\u2019s performance.","siteLink":"Pages/BIA/amazon/amazon.html","website":"https://aremuart.wordpress.com/research-projects/amazon/","private":"yes","model":"/files/bia/amazon.glb"}]}');


var $c5214312cc917dc2$exports = {};
$c5214312cc917dc2$exports = JSON.parse("{\"projects\":[{\"title\":\"Gothic\",\"abstract\":\"Gothic poems inspired by Victorian Romantics and Gothic writers\",\"website\":\"https://aremuart.wordpress.com/poetry/gothics/\",\"siteLink\":\"Portfolio/poetry/gothic/\"},{\"title\":\"Existential\",\"abstract\":\"An assortment of existential poems - aimed at the contemplative and inward-thinkers\",\"navigation\":\"/Celestaris/Poetry/existentialPoetry\",\"website\":\"https://aremuart.wordpress.com/poetry/existentialists/\",\"siteLink\":\"Portfolio/poetry/existentialists/\"},{\"title\":\"Poetry Anthology: Canto I\",\"abstract\":\"Serentiy, Silence and Salutation\",\"navigation\":\"/Celestaris/Poetry/section0\",\"siteLink\":\"Portfolio/poetry/lux/section0\"},{\"title\":\"Poetry Anthology: Canto II\",\"abstract\":\"Tabula Lux\",\"navigation\":\"/Celestaris/Poetry/section1\",\"siteLink\":\"Portfolio/poetry/lux/section1\"}]}");


var $5f275980e24e53b6$exports = {};
$5f275980e24e53b6$exports = JSON.parse("{\"projects\":[{\"title\":\"Master's I Thesis\",\"abstract\":\"\",\"siteLink\":\"projects/MISC/poetry/section0.html\"},{\"title\":\"Master's II Thesis\",\"abstract\":\"\",\"siteLink\":\"projects/MISC/music/music.html\"}]}");


var $72d2bfc3e95efd9e$exports = {};
$72d2bfc3e95efd9e$exports = JSON.parse("{\"projects\":[{\"title\":\"Music\",\"abstract\":\"Music released under the artist name: AREMU\",\"website\":\"https://linktr.ee/ar3mu\",\"external\":\"Yes\",\"model\":\"/files/misc/vinyl.glb\"},{\"title\":\"Profile\",\"abstract\":\"Profile page with useful links\",\"website\":\"https://linktr.ee/bolajiadewale\",\"external\":\"Yes\",\"model\":\"/files/misc/books.glb\"}]}");






var $919cea3b052cd76d$import_meta = Object.assign(Object.create(null), {
    url: "file:///src/Components/overlays.jsx"
});
function $919cea3b052cd76d$export$a1909b6cc88e74a({ onStart: onStart, visible: visible }) {
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
function $919cea3b052cd76d$export$c6fdb837b070b4ff({ isActive: isActive, onClose: onClose, items: items = [] }) {
    const [hovered, setHovered] = (0, $8I7SX$react.useState)(false);
    const navigate = (0, $8I7SX$reactrouterdom.useNavigate)();
    const overlaySpring = (0, $8I7SX$reactspringweb.useSpring)({
        opacity: isActive ? 1 : 0,
        config: {
            tension: 220,
            friction: 50
        }
    });
    const trail = (0, $8I7SX$reactspringweb.useTrail)(Array.isArray(items) ? items.length : 0, {
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
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactspringweb.animated).div, {
        style: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.9)",
            pointerEvents: isActive ? "auto" : "none",
            opacity: overlaySpring.opacity,
            zIndex: 10,
            display: "flex",
            justifyContent: "flexStart",
            alignItems: "center",
            flexDirection: "column",
            overflowX: "hidden",
            overflowY: "auto"
        },
        children: [
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("div", {
                className: "normalExitButton",
                style: {
                    position: "fixed",
                    top: "20px",
                    left: "20px",
                    color: "white",
                    fontSize: "30px",
                    fontWeight: "bold",
                    zIndex: 20
                },
                onClick: onClose,
                children: "Exit"
            }),
            trail.map((style, index)=>{
                const item = items[index];
                const isExternal = Boolean(item.website);
                const isNavigable = Boolean(item.navigation);
                return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactspringweb.animated).div, {
                    style: {
                        ...style,
                        width: "80%",
                        height: "auto",
                        background: "#222",
                        color: "#fff",
                        padding: "20px",
                        marginBottom: "15px",
                        marginTop: "15px",
                        borderRadius: "12px",
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
                        /*
            !isNavigable ? (
              <a
                href={
                  item.website
                    ? item.website // External website
                    : `${import.meta.env.BASE_URL}${item.siteLink}` // Internal page
                }
              >
                Go To
              </a>
            ) : 
          */ /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("a", {
                            onClick: /*item.private
                    ? (ev) => {
                        ev.preventDefault();
                        this.props.onClick(ev);
                        console.log("SHOULDNT BE HERE");
                      }*/ item.external ? ()=>{
                                window.location.href = item.website;
                            } : ()=>{
                                console.log("HERE");
                                if (item.siteLink) {
                                    console.log("HERE2");
                                    // 1. Create the full URL for the iframe to consume
                                    const fullUrl = `${$919cea3b052cd76d$import_meta.env.BASE_URL}${item.siteLink}`;
                                    console.log("Passing to iframe:", fullUrl);
                                    // 2. Navigate using the INTERNAL path only.
                                    navigate(`${$919cea3b052cd76d$import_meta.env.BASE_URL}Computer`, {
                                        state: {
                                            iframeUrl: fullUrl
                                        }
                                    });
                                } else {
                                    console.log("SHOULD BE MOVING HERE");
                                    navigate(item.navigation);
                                }
                            },
                            children: "Go To"
                        }),
                        /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("p", {
                            children: item.abstract
                        })
                    ]
                }, index);
            })
        ]
    });
}







function $66a61f0af1aeb748$export$c877ad22df1c64d6({ text: text = "Projects", position: position = [
    0,
    5,
    0
], rotation: rotation = [
    0,
    0,
    0
], onClick: onClick }) {
    const [hovered, setHovered] = (0, $8I7SX$react.useState)(false);
    const textWidth = text.length * 5; // Estimate; adjust based on font
    const padding = 2;
    const boxWidth = textWidth + padding;
    const boxHeight = 13.5;
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
                fontSize: 10,
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
function $66a61f0af1aeb748$export$82fb00ee8a55bec7({ title: title = "SMALL TEXT", text: text = "text", position: position = [
    0,
    10,
    0
], rotation: rotation = [
    0,
    0,
    0
], width: width = 10, onClick: onClick, isOpen: isOpen, onOpen: onOpen }) {
    const textWidth = text.length * 1.1; // Estimate; adjust based on font
    const padding = 0.3;
    const boxWidth = width + padding;
    const boxHeight = 10;
    console.log(isOpen);
    console.log(onOpen);
    const [open, setOpen] = (0, $8I7SX$react.useState)(false);
    const { scale: scale, box: box } = (0, $8I7SX$reactspringweb.useSpring)({
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
                    console.log(open);
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
                        emissive: "orange"
                    })
                ]
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactspringthree.a).group, {
                scale: scale,
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
                                scale: 1.002,
                                threshold: 15,
                                children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("lineBasicMaterial", {
                                    color: "#000000",
                                    toneMapped: false
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Text), {
                        maxWidth: width,
                        fontSize: 1.6,
                        color: "black",
                        anchorX: "center",
                        anchorY: "center",
                        textAlign: "center",
                        position: [
                            0,
                            5,
                            1
                        ],
                        strokeWidth: 0.5,
                        strokeColor: "black",
                        children: title
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Text), {
                        maxWidth: width,
                        fontSize: 1.0,
                        color: "black",
                        anchorX: "center",
                        anchorY: "center",
                        textAlign: "center",
                        position: [
                            0,
                            2.5,
                            1
                        ],
                        strokeWidth: 0.5,
                        strokeColor: "black",
                        children: text
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


function $8c8a4d7c0a98efcd$export$c9fcf1a7df975d78(degrees) {
    return degrees * Math.PI / 180;
}


/**
 * CityModel loads a textured 3D city model (OBJ + MTL) and adds it to the scene.
 * It also calls `onLoad` once the model is fully loaded.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onLoad - Callback triggered after the model is successfully loaded
 * @returns {JSX.Element} - A group element containing the loaded 3D city model
 */ function $9e79c54aa8a563fd$var$CityModel({ onLoad: onLoad }) {
    const group = (0, $8I7SX$react.useRef)();
    const { scene: scene } = (0, $8I7SX$reactthreefiber.useThree)(); // Scene is available if needed, though unused here
    // Load the city texture for use in the material (optional for visual debugging or preview)
    (0, $8I7SX$react.useEffect)(()=>{
        const textureLoader = new $8I7SX$three.TextureLoader();
        textureLoader.load("./City/cityPAL.jpg", (texture)=>{
            console.log("Texture loaded", texture);
        // This texture can be stored and used if needed later
        }, undefined, (err)=>{
            console.error("Texture load failed", err);
        });
    }, []);
    (0, $8I7SX$react.useEffect)(()=>{
        const mtlLoader = new (0, $8I7SX$threestdlib.MTLLoader)();
        // Load material definitions
        mtlLoader.load("./City/cityMAT.mtl", (materials)=>{
            materials.preload();
            const objLoader = new (0, $8I7SX$threestdlib.OBJLoader)();
            objLoader.setMaterials(materials); // Attach materials to the OBJ loader
            // Load the OBJ model
            objLoader.load("./City/city.obj", (obj)=>{
                obj.scale.set(0.15, 0.15, 0.15); // Scale to fit the scene
                obj.position.set(70, 0, -65); // Position in the scene
                // Enable shadows on all mesh children
                obj.traverse((child)=>{
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                // Add to group and notify parent
                group.current.add(obj);
                onLoad();
            });
        });
        // Cleanup function to dispose of the model and its resources
        return ()=>{
            if (group.current) group.current.children.forEach((obj)=>{
                group.current.remove(obj);
                obj.traverse((child)=>{
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) child.material.forEach((mat)=>mat.dispose());
                        else child.material.dispose();
                    }
                });
            });
        };
    }, []);
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("group", {
        ref: group
    });
}
/**
 * CameraLight attaches a spotlight that follows the camera's position,
 * simulating a light source that moves with the viewer.
 *
 * @component
 * @returns {JSX.Element} - A spotlight that follows the camera
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
        angle: 0.4,
        penumbra: 0.5,
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
    const [started, setStarted] = (0, $8I7SX$react.useState)(false);
    const [openBannerId, setOpenBannerId] = (0, $8I7SX$react.useState)(null);
    const [cameraAnimationDone, setcameraAnimationDone] = (0, $8I7SX$react.useState)(null);
    const [cityLoaded, setCityLoaded] = (0, $8I7SX$react.useState)(false);
    const [audioStarted, setAudioStarted] = (0, $8I7SX$react.useState)(false);
    const [initialAnimation, setInitialAnimation] = (0, $8I7SX$react.useState)(false); // Unused?
    // Camera/interaction state
    const controlsRef = (0, $8I7SX$react.useRef)();
    const [currentCameraPos, setCurrentCameraPos] = (0, $8I7SX$react.useState)([
        0,
        0,
        0
    ]); // Reserved
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
    /**
   * Returns camera to initial view and re-enables controls after interacting with banners.
   */ const resetOrbit = ()=>{
        setOpenBannerId(null);
        controlsRef.current.target.copy(new $8I7SX$three.Vector3(0, 0, 0));
        setShowExitButton(false);
        setControlsEnabled(true);
    };
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
   * Opens a specific overlay content section (projects, poetry, etc.).
   *
   * @param {string} type - The type of content to open in the overlay.
   */ const openOverlay = (type)=>{
        if (type === "projects") setOverlayContent((0, (/*@__PURE__*/$parcel$interopDefault($c899916b68c87ba7$exports))).projects);
        else if (type === "dissertation") setOverlayContent((0, (/*@__PURE__*/$parcel$interopDefault($5f275980e24e53b6$exports))).projects);
        else if (type === "miscellaneous") setOverlayContent((0, (/*@__PURE__*/$parcel$interopDefault($72d2bfc3e95efd9e$exports))).projects);
        else if (type === "poetry") setOverlayContent((0, (/*@__PURE__*/$parcel$interopDefault($c5214312cc917dc2$exports))).projects);
        setOverlayActive(true);
    };
    /**
   * Starts city background audio on first interaction.
   */ const audioRef = (0, $8I7SX$react.useRef)(null);
    const startAudio = ()=>{
        if (!audioStarted) {
            const audio = new Audio("./City/cityAMBIENCE.mp3");
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
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("div", {
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
            !cameraAnimationDone && started && /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    zIndex: 100,
                    pointerEvents: "all"
                }
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $919cea3b052cd76d$export$a1909b6cc88e74a), {
                onStart: ()=>{
                    startAudio();
                    setStarted(true);
                },
                visible: !started || !cityLoaded
            }),
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $919cea3b052cd76d$export$c6fdb837b070b4ff), {
                isActive: isOverlayActive,
                onClose: toggleOverlay,
                items: overlayContent
            }),
            started && /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactthreefiber.Canvas), {
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
                    scene.fog = new $8I7SX$three.Fog(new $8I7SX$three.Color("#6a0dad"), 0, 1600);
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
                        text: "24 Year Old Software Engineer, Creative & National American Football Player",
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
                        title: "Education",
                        text: "University of Nottingham - BSc Computer Science\nUniversity of Nottingham - MSc Information Systems & Operations Management\nUniversity of Arizona - MS Information Science: Human Centered Computing",
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
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$c877ad22df1c64d6), {
                        text: "Projects",
                        position: [
                            -70,
                            30,
                            -30
                        ],
                        onClick: ()=>openOverlay("projects")
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$c877ad22df1c64d6), {
                        text: "Dissertation",
                        position: [
                            70,
                            40,
                            -50
                        ],
                        onClick: ()=>openOverlay("dissertation")
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $66a61f0af1aeb748$export$c877ad22df1c64d6), {
                        text: "Poetry",
                        position: [
                            50,
                            40,
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
                        text: "Miscellaneous",
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
                        onClick: ()=>openOverlay("miscellaneous")
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
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Sky), {
                        distance: 450000,
                        sunPosition: [
                            100,
                            10,
                            100
                        ],
                        inclination: 0.49,
                        azimuth: 0.25
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)($9e79c54aa8a563fd$var$CityModel, {
                        onLoad: ()=>setCityLoaded(true)
                    }),
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
                            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreepostprocessing.DepthOfField), {
                                focusDistance: 5,
                                focalLength: 10,
                                bokehScale: 2
                            }),
                            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreepostprocessing.Vignette), {
                                eskil: false,
                                offset: 0.1,
                                darkness: 0.4
                            })
                        ]
                    })
                ]
            })
        ]
    });
}


/**
 * @module Portfolio
 * @description Manages the main 3D portfolio scene, including the smooth camera transition
 * from the world view to the computer terminal.
 */ 






var $a0362f18e412ef3b$import_meta = Object.assign(Object.create(null), {
    url: "file:///src/portfolio.jsx"
});
const $a0362f18e412ef3b$var$clickSound = new Audio("./Computer/mouse_click.mp3");
const $a0362f18e412ef3b$var$buttonSound = new Audio("./Computer/button_click.mp3");
/**
 * Handles the cinematic smooth camera transition on mount.
 * @component
 * @description
 * Uses `useFrame` to linearly interpolate (lerp) the camera from its global position
 * to a specific focus point in front of the monitor. Once the camera is within
 * a threshold distance, the animation "disengages" to allow for other interactions.
 */ function $a0362f18e412ef3b$var$CameraRig() {
    const [active, setActive] = (0, $8I7SX$react.useState)(true);
    /** @type {THREE.Vector3} Target coordinates for the camera focus point */ const target = (0, $8I7SX$react.useMemo)(()=>new $8I7SX$three.Vector3(0, 0.75, 2.5), []);
    const tempVec = (0, $8I7SX$react.useMemo)(()=>new $8I7SX$three.Vector3(), []);
    (0, $8I7SX$reactthreefiber.useFrame)((state)=>{
        if (!active) return;
        // Smoothly moves camera to target position using a lerp factor of 0.05
        state.camera.position.lerp(target, 0.03);
        state.camera.lookAt(0, 1, -4.5);
        // Disables the animation once the camera is close enough to the target
        if (state.camera.position.distanceTo(target) < 0.1) {
            setActive(false);
            console.log("Animation complete.");
        }
    });
    return null;
}
/**
 * Utility developer component for coordinate mapping.
 * @component
 * @description
 * Listens for a 'Q' keypress and logs the current camera Position and Rotation to the console.
 * Essential for precisely placing 3D objects like buttons and labels within the scene.
 */ function $a0362f18e412ef3b$var$CameraLogger() {
    const { camera: camera } = (0, $8I7SX$reactthreefiber.useThree)();
    (0, $8I7SX$react.useEffect)(()=>{
        const handleKeyDown = (event)=>{
            if (event.key.toLowerCase() === "q") {
                const { x: x, y: y, z: z } = camera.position;
                const { x: rx, y: ry, z: rz } = camera.rotation;
                console.log("--- Camera Coordinates ---");
                console.log(`Position: [${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)}]`);
                console.log(`Rotation: [${rx.toFixed(2)}, ${ry.toFixed(2)}, ${rz.toFixed(2)}]`);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return ()=>window.removeEventListener("keydown", handleKeyDown);
    }, [
        camera
    ]);
    return null;
}
/**
 * The 3D Computer terminal assembly.
 * @component
 * @description
 * Renders a GLTF monitor model with interactive hardware buttons and an embedded HTML screen.
 * Includes CRT post-processing effects (scanlines, flicker) and dynamic tooltip positioning.
 */ function $a0362f18e412ef3b$var$Computer() {
    /** @type {String|null} State to track which button is currently being hovered */ const [hoveredText, setHoveredText] = (0, $8I7SX$react.useState)(null);
    /** @type {Boolean} Controls the visibility of CRT scanlines and flicker overlays */ const [showEffects, setShowEffects] = (0, $8I7SX$react.useState)(true);
    const { scene: scene, nodes: nodes } = (0, $8I7SX$reactthreedrei.useGLTF)(`${$a0362f18e412ef3b$import_meta.env.BASE_URL}Computer/Monitor2.glb`);
    const location = (0, $8I7SX$reactrouterdom.useLocation)();
    const navigate = (0, $8I7SX$reactrouterdom.useNavigate)();
    /** @type {String} The URL to be rendered within the monitor's screen iframe */ const iframeSrc = location.state?.iframeUrl || "https://bolajiadewal3.github.io/Celestaris/Portfolio";
    /**
   * Calculates the geometric center of the screen mesh.
   * @description
   * This is necessary because the GLTF mesh might have its origin at a corner or hinge.
   * Calculating the bounding box center allows the HTML screen to be perfectly centered.
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
    const playButton = ()=>{
        $a0362f18e412ef3b$var$buttonSound.currentTime = 0;
        $a0362f18e412ef3b$var$buttonSound.play();
    };
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)("group", {
        children: [
            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("primitive", {
                object: scene
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
                    navigate(`${$a0362f18e412ef3b$import_meta.env.BASE_URL}Documentation`);
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
                    if (document.referrer) window.location.href = document.referrer;
                    else window.location.assign("/Celestaris/");
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
                            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("iframe", {
                                src: iframeSrc,
                                className: "monitor-iframe"
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
    return /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("div", {
        style: {
            width: "100vw",
            height: "100vh",
            position: "relative"
        },
        children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreefiber.Canvas), {
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
            children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$react.Suspense), {
                fallback: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Html), {
                    center: true,
                    children: "Loading Experience..."
                }),
                children: [
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)($a0362f18e412ef3b$var$CameraRig, {}),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("ambientLight", {
                        intensity: 0.5
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreedrei.Environment), {
                        preset: "city"
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)($a0362f18e412ef3b$var$Computer, {}),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)($a0362f18e412ef3b$var$CameraLogger, {}),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("group", {
                        children: /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)("gridHelper", {
                            args: [
                                10,
                                10
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsxs)((0, $8I7SX$reactthreepostprocessing.EffectComposer), {
                        children: [
                            /*#__PURE__*/ (0, $8I7SX$reactjsxruntime.jsx)((0, $8I7SX$reactthreepostprocessing.Bloom), {
                                intensity: 1.5,
                                mipmapBlur: true
                            }),
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
    });
}


window.reactComponents = {};
window.vueComponents = {};
window.React = (0, ($parcel$interopDefault($8I7SX$react)));
window.ReactDOM = (0, ($parcel$interopDefault($8I7SX$reactdom)));
window.ReactWrapper = (0, (/*@__PURE__*/$parcel$interopDefault($99e5c865b19c7c75$exports)));
reactComponents['App'] = (0, $9e79c54aa8a563fd$export$2e2bcd8739ae039);
reactComponents['App'] = (0, $9e79c54aa8a563fd$export$2e2bcd8739ae039);
reactComponents['App'] = (0, $9e79c54aa8a563fd$export$2e2bcd8739ae039);
reactComponents['Portfolio'] = (0, $a0362f18e412ef3b$export$2e2bcd8739ae039);
reactComponents['Portfolio'] = (0, $a0362f18e412ef3b$export$2e2bcd8739ae039);
reactComponents['Portfolio'] = (0, $a0362f18e412ef3b$export$2e2bcd8739ae039);
reactComponents['Portfolio'] = (0, $a0362f18e412ef3b$export$2e2bcd8739ae039);


//# sourceMappingURL=main.js.map
