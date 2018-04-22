import SmoothScroll from 'smooth-scroll'

const scrollToTop = () => {
  const scroll = new SmoothScroll()
  const anchor = document.querySelector('#root')
  scroll.animateScroll(anchor)
}

export default scrollToTop
