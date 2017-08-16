/**
 * 造轮子 轮播图
 * stage 1:
 *  need：
 *    1. html模板尽量简洁，尽可能如下：
 *      <ul>
 *        <li><img src="...."></li>
 *        ...
 *      </ul>
 *    2. 支持自动滑动，鼠标滑过停留。
 *    3. 支持 tab 小点，通过配置参数自定义是否显示。
 *    4. 支持点击 prew 和 next 进行滑动
 */

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Swiper = factory());
}(this, (function(){'use strict';
  var Slider = function() { this.initialize.apply(this, arguments) }
  Slider.prototype = {

    initialize: function(slider) {
      this.slider = slider
      this.ul = slider.children[0]
      this.li = this.ul.children

      slider.style.width = this.li[0].clientWidth + 'px'
      this.ul.style.width = (this.li[0].clientWidth * this.li.length) + 'px'

      this.currentIndex = 0
      this.total = this.li.length - 1;
      this.initPrevNext();
    },

    goTo: function(index) {
      if (index < 0) {
        this.goTo(this.total);
        return;
      }
      else if (index > this.total) {
        this.goTo(0);
        return;
      }

      // move <ul> left
      this.ul.style.left = '-' + (100 * index) + '%'

      this.currentIndex = index
    },
    goToPrev: function() {
      this.goTo(this.currentIndex - 1)
    },

    goToNext: function() {
      this.goTo(this.currentIndex + 1)
    },
    initPrevNext: function() {
      var prev = document.createElement('div')
      prev.innerHTML = 'prev'
      prev.classList.add('prev');
      this.slider.appendChild(prev)
    }
  }
  return Slider;
})));
