import { gsap } from 'gsap'

const onBeforeEnter = el => {
  el.style.opacity = 0
  el.style.height = 0
}

const onEnter = (el, done) => {
  gsap.to(el, {
    duration: 0.2,
    opacity: 1,
    height: 'auto',
    onComplete: done
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    duration: 0.2,
    opacity: 0,
    height: 0,
    onComplete: done
  })
}

export { onBeforeEnter, onEnter, onLeave}