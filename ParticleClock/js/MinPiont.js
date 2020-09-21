class MinPiont {
  /**
   * 粒子对象
   * @param {Canvas} ctx canvas上下文
   * @param {Object} param1 小点的参数
   */
  constructor(ctx, { x, y, r, bottom }) {
    // 随机 参数
    const o = {
      x,
      y,
      r: r,
      vx: Utils.random(-2, 3),
      vy: Utils.random(0, 5),
      g: Utils.random(1, 2),
      color: Utils.randomColor()
    };
    // 最底部位置
    this.bottom = bottom;
    this.o = o;
    this.ctx = ctx;
    this._isOk = false;
  }
  /**
   * 移动
   */
  move() {
    // 移动
    this.o.x += this.o.vx;
    this.o.y -= this.o.vy;
    this.o.vy -= this.o.g;

    // 如果 到达了底部 就反方向跳
    if (this.o.y >= this.bottom - this.o.r * 2) {
      // 到达底部后集体往左边移动
      this.o.vx = this.o.vx && -Math.abs(this.o.vx) || -1;
      // 取反 并 减少相应
      this.o.vy = -(this.o.vy * 0.7);
      if (this.o.x <= 0) {
        // 如果x为0 说明当前对象 不在画布中 就算完成了
        this._isOk = true;
      }
    }
    this._drew();
  }
  /**
   * 渲染
   */
  _drew() {

    const { x, y, r, color } = this.o;
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, r, 0, Math.PI / 180 * 360);
    this.ctx.fill();

  }
  /**
   * 是否不需要了
   */
  isOk() {
    return this._isOk;
  }

}
