const templates = {
  button({ onClick, icon, toggleClass, onToggle = [], title, tool } = {}) {
    const template = `<div class="menu-option" data-type="button" title="${title}">
       ${tool.renderIcon(icon, toggleClass)}
      </div>`;
    const menu = tool.render(template);
    const handleToggle = useToggle(menu, toggleClass);
    menu.addEventListener("click", () => {
      functionCall.call(this, onClick, tool);
      const onEnd = () =>
        handleToggle((index, pervIndex) => {
          menu.innerHTML = tool.renderIcon(icon, toggleClass, index);
          functionCall.call(this, onToggle[pervIndex], tool, onEnd);
        });
      onEnd();
    });
    return menu;
  },
  input({
    icon,
    onChange,
    type = "input",
    inputType = "text",
    value = "",
    attr = {},
    style = "",
    showValue = true,
    tool,
    title = "",
    onInit,
  } = {}) {
    const currentValue = functionCall(value, tool) || value;
    const styleText = tool.styleAnalysis(style);
    const template = `<div class="menu-option" data-type="${type}">
        <label>
          <span class="menu-option-title" title="${title}">
            ${tool.renderIcon(icon)}
          </span>
          <input type="${inputType}" value="${currentValue}" style="${styleText}" />
            ${
              showValue
                ? `<span class='input-value'>${currentValue}</span>`
                : ``
            } 
        </label>
      </div>`;
    // dom元素整理
    const menu = tool.render(template);
    const input = menu.querySelector("input");
    functionCall.call(input, onInit, tool);
    // 属性添加
    for (const key in attr) {
      input.setAttribute(key, attr[key]);
    }
    const span = menu.querySelector(".input-value");
    const setValue = () => {
      span && (span.innerText = input.value);
    };
    // 事件绑定
    changeValueListener(input, function () {
      setValue();
      functionCall.call(this, onChange, tool);
    });
    return menu;
  },
  progress: (params = {}) =>
    templates.input({
      ...params,
      type: "progress",
      inputType: "range",
    }),
  file: (params = {}) =>
    templates.input({
      ...params,
      type: "file",
      inputType: "file",
    }),
  color: (params = {}) =>
    templates.input({
      ...params,
      type: "color",
      inputType: "color",
    }),
};

// 切换样式
function useToggle(dom, classNames = []) {
  const indexRef = { current: 0 };

  if (!classNames.length) return () => {};
  return function (callback) {
    if (!(dom instanceof Element)) return;
    const pervIndex = indexRef.current;
    if (Array.isArray(classNames)) {
      // 循环切换
      if (indexRef.current === classNames.length - 1) {
        indexRef.current = 0;
      } else {
        indexRef.current++;
      }
      dom.classList.remove(classNames[pervIndex]);
      dom.classList.add(classNames[indexRef.current]);
    } else {
      dom.classList.toggle(classNames);
      indexRef.current = Number(!indexRef.current);
    }
    callback && callback(indexRef.current, pervIndex);
  };
}

// 监听input的value值
function changeValueListener(element, callback) {
  element.addEventListener("input", callback);
  if (!Array.isArray(element.callbacks)) {
    element.callbacks = [];
    var valueDes = Object.getOwnPropertyDescriptor(
      element.constructor.prototype,
      "value"
    );
    Object.defineProperty(element, "value", {
      set: function (v) {
        valueDes.set.apply(this, arguments);
        element.callbacks.forEach(function (callback) {
          callback.call(element, v);
        });
      },
      get: function () {
        return valueDes.get.apply(this, arguments);
      },
    });
  }
  element.callbacks.push(callback);
  return element;
}
