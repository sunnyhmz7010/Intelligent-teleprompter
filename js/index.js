function getConfig() {
  const config = JSON.parse(localStorage.getItem("inscriptionConfig") || "{}");
  return {
    speed: 10,
    fontsize: 8,
    width: 80,
    color: "#ffffff",
    bgColor: "#000000",
    ...config,
  };
}
class Tool {
  nodes = { menu: null, menuFold: null, inscription: null, toast: null }; // 主体元素节点
  styles = {
    paddingTop: 0.15,
    paddingBottom: 0.65,
  };
  controls = []; // 控件元素
  config = getConfig(); // 控件配置
  pluginsConfig = {}; // 插件配置
  keysMap = {}; // 快捷键映射
  timer = {}; // 定时器配置
  constructor({ config, templates = {}, plugins, ...rest } = {}) {
    document.addEventListener("DOMContentLoaded", () => {
      this.init(rest);
      this.renderMenu(config, templates);
      this.renderPlugins(plugins);
    });
  }
  init({ context = "" } = {}) {
    const menu = document.querySelector(".menu");
    const menuFold = document.querySelector(".menu-fold");
    const inscription = document.getElementById("inscription");
    const toast = document.getElementById("toast");
    this.nodes = { menu, menuFold, inscription, toast };
    // 折叠菜单
    menuFold.addEventListener("click", () => {
      menu.classList.toggle("close");
    });
    // 快捷键切换菜单
    this.registrationShortcutKeyMap({ shortcutKey: "Shift+K" }, menuFold);

    const handleChange = throttle(() => {
      this.setContent(inscription.value);
    }, 300);
    // 添加文本更新记录
    inscription.addEventListener("input", handleChange);

    this.initPadding(inscription);
    this.updateContent(this.getContent() || context, false);
    this.registrationShortcutKey();
  }
  initPadding(inscription) {
    const { offsetHeight: height } = inscription;
    inscription.style.paddingTop = `${height * this.styles.paddingTop}px`;
    inscription.style.paddingBottom = `${height * this.styles.paddingBottom}px`;
  }

  // 渲染菜单
  renderMenu(menuConfig = [], templates = {}) {
    if (!menuConfig.length) return;
    const menuOptions = document.createElement("div");
    menuOptions.classList.add("menu-options");
    for (const menu of menuConfig) {
      if (Array.isArray(menu)) {
        this.renderMenu(menu, templates);
      } else {
        const node = functionCall.call(this, templates[menu.type], {
          ...menu,
          title: menu.title || "",
          tool: this,
        });
        if (node) {
          this.controls.push(node);
          menuOptions.appendChild(node);
          this.registrationShortcutKeyMap(menu, node);
        }
      }
    }
    this.nodes.menu.appendChild(menuOptions);
  }
  renderPlugins(plugins = []) {
    plugins.forEach(plugin => {
      const node = this.render(plugin.template);
      // 有元素节点则处理样式和事件
      if (node instanceof Element) {
        if (plugin.styleNode) {
          const styleNode = document.createElement("style");
          styleNode.innerHTML = plugin.styleNode;
          document.head.appendChild(styleNode);
        } else {
          // 添加样式
          node.setAttribute("style", this.styleAnalysis(plugin.style));
        }
        // 注册事件
        if (isObject(plugin.events)) {
          for (const key in plugin.events) {
            node.addEventListener(key, e => {
              functionCall.call(node, plugin.events[key], e, this);
            });
          }
        }
        // 添加到容器
        appendChild(plugin.container, node);
      }
      // 配置初始化
      if (plugin.name) this.pluginsConfig[plugin.name] = {};
      //执行初始化
      functionCall.call(node, plugin.init, this);
    });
  }
  // 渲染模板
  render(template) {
    const temp = { current: document.createElement("div") };
    temp.current.innerHTML = template;
    const child = temp.current.firstChild;
    temp.current.remove();
    temp.current = null;
    return child;
  }
  // 渲染icon
  renderIcon(icon, classNames = [], index = 0) {
    if (icon instanceof Element) {
      return icon.innerHTML;
    } else if (isObject(icon) && typeof index === "number") {
      return this.renderIcon(icon[classNames[index]]);
    }
    return `<span>${icon}</span>`;
  }
  // 解析样式
  styleAnalysis(style) {
    if (typeof style === "string") {
      return style;
    } else if (isObject(style)) {
      // 遍历对象转字符串
      let styleText = "";
      for (const key in style) {
        styleText += `${key}:${style[key]};`;
      }
      return styleText;
    }
    return ""; // 不是对象返回空字符串
  }
  updateConfig(key, value) {
    if (key in this.config) {
      this.config[key] = value;
      localStorage.setItem("inscriptionConfig", JSON.stringify(this.config));
    }
  }
  addScript(src) {
    // 动态添加脚本
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      document.body.appendChild(script);
      script.onload = resolve;
      script.onerror = reject;
    });
  }
  loading(message = "加载中...") {
    const { toast } = this.nodes;
    toast.querySelector(".toast-box").innerHTML = message;
    toast.classList.add("show");
  }
  hideLoading() {
    const { toast } = this.nodes;
    toast.classList.remove("show");
  }
  getContent() {
    return localStorage.getItem("inscriptionContent");
  }
  setContent(context) {
    localStorage.setItem("inscriptionContent", context);
  }
  updateContent(context, isSet = true) {
    this.nodes.inscription.value = context;
    if (isSet) this.setContent(context);
  }
  registrationShortcutKey() {
    // 获取组合键
    function getCombination(event) {
      let combination = "";
      if (event.ctrlKey || event.metaKey) combination += "Ctrl+";
      if (event.shiftKey) combination += "Shift+";
      if (event.key === " ") {
        combination += "Space";
      } else {
        combination += capitalizeFirstLetter(event.key);
      }
      return combination;
    }
    // 监听键盘事件
    document.addEventListener("keydown", event => {
      const keyCombination = getCombination(event);
      if (this.keysMap[keyCombination]) {
        event.preventDefault(); // 阻止默认行为
        this.keysMap[keyCombination]();
      }
    });
  }
  registrationShortcutKeyMap(menu, node) {
    if (!menu.shortcutKey || !node) return;
    if (typeof menu.shortcutKey === "string") {
      this.keysMap[menu.shortcutKey] = () => node.click();
    } else if (isObject(menu.shortcutKey)) {
      for (const key in menu.shortcutKey) {
        this.keysMap[key] = () =>
          functionCall.call(node, menu.shortcutKey[key], this);
      }
    }
  }
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

function capitalizeFirstLetter(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function appendChild(container, node) {
  let parent = document.body;
  if (container instanceof Element) {
    parent = container;
  } else if (container && typeof container === "string") {
    parent = document.querySelector(container);
  } else if (container instanceof Function) {
    parent = container(this);
  }
  if (parent) parent.appendChild(node);
}

// 函数调用
function functionCall(func, ...rest) {
  if (typeof func === "function") return func.apply(this, rest);
}

function throttle(func, wait) {
  let timeout = null;
  let lastArgs = null;
  let lastThis = null;
  let lastCallTime = 0;

  const throttled = function (...args) {
    const now = Date.now();
    const remainingTime = wait - (now - lastCallTime);

    lastArgs = args;
    lastThis = this;

    if (remainingTime <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastCallTime = now;
      func.apply(lastThis, lastArgs);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        lastCallTime = Date.now();
        timeout = null;
        func.apply(lastThis, lastArgs);
      }, remainingTime);
    }
  };

  return throttled;
}
