class ParticleClock {
  /**
   * 创建一个 粒子时钟
   * @param {Object} param0 初始化参数
   */
  constructor({ el, width, height, color, bgColor }) {
    this.el = el;
    if (!this.el) {
      throw new Error("el is not defined");
    }
    // 获取 2d 上下文
    this.ctx = this.el.getContext("2d");
    // 初始化宽高 颜色 背景颜色
    this.width = this.el.width = width || window.innerWidth;
    this.height = this.el.height = height || window.innerHeight;
    this.color = color || "#fff";
    this.el.style.backgroundColor = bgColor || "#64e7ff";
    // 初始化 粒子 空间
    this.minPionts = [];
    // 初始化 最大的 map
    this.ALL_MAPS = ALL_MAPS;
    // 新建一个空间用于存储 上一个时间
    this.oldDate = [];
    // 初始化
    this._init();
  }
  /**
   * 内部初始化
   */
  _init() {
    // 被除数n 的由来 一个字符表示1.2共 冒号为0.5共1 左右分别距离为1.2共2
    const n = 6 * 1.2 + 2 * 0.6 + 2 * 1.2;
    this.left_start = (this.width / n) | 0;
    this.top_start = (this.height / 3) | 0;
    this.r = (this.left_start / 20) | 0;
    // 每个字体的大小
    this.charSize = 1.2 * this.left_start;
    // 每个 符号的大小
    this.symbolSize = 0.6 * this.left_start;

  }
  /**
   * 渲染
   */
  render() {
    
    setInterval(() => {
      this._frame();
      this._dropPoint();
    }, 30);
  }
  /**
   * 渲染每一帧
   */
  _frame() {

    this._clearCanvas();
    // 当前左边位置
    let c_left = this.left_start;
    // 当前时间
    const currentData = Utils.getCurrentDate();

    for (let i = 0; i < currentData.length; i++) {
      const inx = currentData[i];
      // 如果当前时间不等于 旧的时间 就为真 开始生成粒子
      const flag = this.oldDate[i] != inx; 
      this._drew(c_left, inx, flag);
      if (inx != 10) {
        c_left += this.charSize;
      } else {
        c_left += this.symbolSize;
      }
    }
    this.oldDate = currentData;
  }
  /**
   * 清空画布
   */
  _clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  /**
   * 绘制
   * @param {Number} start 开始位置
   * @param {Number} inx 当前绘制的数字
   * @param {Boolean} flag 是否生成粒子
   */
  _drew(start, inx, flag) {

    const current_map = this.ALL_MAPS[inx];
    const ctx = this.ctx;

    for (let y = 0; y < current_map.length; y++) {
      const element = current_map[y];
      for (let x = 0; x < element.length; x++) {

        if (element[x] == 1) {
          // 获得计算好的 x y 
          const {
            cx, cy, r
          } = this._getXY(start, x, y);
          // 为真开启粒子收集
          if (flag) {
            this._addMinPiont({ ctx, cx, cy, r });
          }
          // 绘制 时间粒子
          this._drewPiont({
            color: this.color,
            x: cx,
            y: cy,
            r
          });

        }

      }
    }
  }
  /**
   * 收集粒子
   * @param {Object} param0 当前粒子信息
   */
  _addMinPiont({ cx, cy, r }) {

    const mp = new MinPiont(this.ctx, { x: cx, y: cy, r, bottom: this.height });
    this.minPionts.push(mp);

  }
  /**
   * 绘制时间粒子
   * @param {Object} param0 当前粒子信息
   */
  _drewPiont({ color, x, y, r }) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, Math.PI / 180 * 360);
    ctx.fill();
  }
  /**
   * 
   * @param {Number} start 开始坐标
   * @param {Number} x 当前x坐标
   * @param {Number} y 当前y坐标
   */
  _getXY(start, x, y) {
    const r = this.r;
    const cx = x * (r * 2 + 1) + start;
    const cy = y * (r * 2 + 1) + this.top_start;
    return { cx, cy, r };
  }
  /**
   * 跌落粒子
   */
  _dropPoint() {
    // 需要删除的 最后下标
    let delete_index = 0;
    const len = this.minPionts.length;

    for (let i = 0; i < len; i++) {
      const piont = this.minPionts[i];
      piont.move();
      // 得到最后一颗以及完工了的粒子坐标
      if (piont.isOk()) {
        delete_index = i;
      }
    }
    // 清空一部分
    this.minPionts.splice(0, delete_index);
  }
}
