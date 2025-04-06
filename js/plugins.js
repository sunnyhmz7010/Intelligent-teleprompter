const plugins = [
  {
    name: "horizontalLine",
    template: `<div class="horizontal-line"><div class="horizontal-line-dot"></div></div>`,
    // 使用元素节点添加样式
    styleNode: `.horizontal-line {
  position: fixed;
  width: 100%;
  top: 20%;
  left: 0;
  height: 2px;
  background-color: red;
  cursor: move;
  user-select: none;
}

.horizontal-line-dot {
  position: absolute;
  width: 16px;
  height: 16px;
  right: calc(50% - var(--inscription-width) / 2 - 16px);
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 50%;
  background-color: inherit;
}`,
    events: {
      mousedown(_, tool) {
        const that = this;
        const { min, max } = tool.pluginsConfig["horizontalLine"];

        const updateTopStorage = throttle((top) => {
          localStorage.setItem("horizontalLineTop", top);
        }, 300);
        const onMouseMove = ({ clientY }) => {
          const top = clientY > min ? (clientY > max ? max : clientY) : min;
          that.style.top = `${top}px`;
          updateTopStorage(top);
        };

        const onMouseUp = () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      },
    },
    init(tool) {
      const min = 42;
      const max = window.innerHeight - min;
      tool.pluginsConfig["horizontalLine"] = { min, max };
      const horizontalLineTop = localStorage.getItem("horizontalLineTop");
      if (horizontalLineTop) {
        this.style.top = `${horizontalLineTop}px`;
      }
    },
  },
];
