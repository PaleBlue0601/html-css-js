class Utils {
  /**
   * 生成  min-max 之间的随机数
   * @param {Number} min 最小值
   * @param {Number} max 最大值
   */
  static random(min, max) {
    return (Math.random() * (max - min) + min) | 0;
  }
  /**
   * 随机RGB颜色
   */
  static randomColor() {
    const r = this.random(0, 256);
    const g = this.random(0, 256);
    const b = this.random(0, 256);

    return `rgb(${r},${g},${b})`;
  }
  /**
   * 获取当前时间 转换成 数字的
   */
  static getCurrentDate() {
    const date = new Date();
    // 补全 单位 自动 前面填充0
    const hStr = new String(date.getHours()).padStart(2, "0");
    const mStr = new String(date.getMinutes()).padStart(2, "0");
    const sStr = new String(date.getSeconds()).padStart(2, "0");
    // 合并并切割
    const dateStr = (hStr + mStr + sStr).split("");
    // 时间转换int 后的数组
    const dateInt = [];

    dateStr.forEach((item, index) => {
      // 每隔两个数就在中间插入一个 ： 也就是 对应的 10
      if (index != 0 && index % 2 == 0) {
        dateInt.push(10);
      }
      dateInt.push(parseInt(item));
    });
    console.log("dateInt=>", dateInt);
    return dateInt;
  }
}
