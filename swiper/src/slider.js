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
import $ from './util'


class Slider {
  constructor(ele) {
    this.slider = ele
    this.init()
  }

  init() {
    this.setConfig()
    this.render()
    this.bindEvent()
    this.loop()
  }

  setConfig() {
    this.ul = this.slider.children[0]
    this.li = this.ul.children
    this.total = this.li.length
    this.index = 0
  }

  render() {
    const slider = this.slider;
    const width = this.li[0].clientWidth
    const height = this.li[0].clientHeight
    slider.style.width = width + 'px'
    this.ul.style.width = (width * this.li.length) + 'px'

    const prev = $.creatE('div')
    prev.style.height = height + 'px'
    prev.classList = 'prevnext prev'

    const next = $.creatE('div')
    next.style.height = height + 'px'
    next.classList = 'prevnext next'

    this.prevE = prev
    this.nextE = next
    slider.appendChild(prev)
    slider.appendChild(next)

    this.renderNav()
  }

  renderNav() {
    const nav = $.creatE('div')
    nav.classList.add('nav')
    for (let i = 0; i < this.total; i++) {
      let span = $.creatE('span')
      span.dataset.index = i
      nav.appendChild(span)
    }
    this.nav = nav
    this.slider.appendChild(nav)
    this.setActiveNav(this.index)
  }

  bindEvent() {
    this.prevE.addEventListener('click', (e) => {
      this.goPrev()
    }, false)

    this.nextE.addEventListener('click', (e) => {
      this.goNext()
    }, false)

    this.nav.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      if (!index) return
      this.go(index)
    }, false)

    this.slider.addEventListener('mouseover', (e) => {
      this.timer && clearInterval(this.timer)
    }, false)

    this.slider.addEventListener('mouseleave', (e) => {
      this.goNext()
      this.loop()
    }, false)
  }

  go(index) {
    if (index > this.total - 1) {
      index = 0
    } else if (index < 0) {
      index = this.total - 1
    }
    const left = index > 0 ? '-' + index + '00%' : ''
    this.ul.style.left = left
    this.index = index
    this.setActiveNav(index)
  }

  goPrev() {
    this.go(--this.index)
  }

  goNext() {
    this.go(++this.index)
  }

  setActiveNav(index) {
    const spans = Array.prototype.slice.call(this.nav.children)
    spans.map(span => {
      span.classList.remove('active')
    })
    spans[index].classList.add('active')
  }

  loop() {
    const time = 5000
    this.timer = setInterval(() => {
      this.goNext()
    } , time)
  }
}

export default Slider


