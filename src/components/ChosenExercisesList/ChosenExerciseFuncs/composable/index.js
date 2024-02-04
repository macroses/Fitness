import { gsap } from 'gsap'

const onBeforeEnter = el => {
  el.style.scale = 0.5
  el.style.transformOrigin = '300px 0'
}

const onEnter = (el, done) => {
  gsap.to(el, {
    duration: 0.2,
    scale: 1.05,

    onComplete: () => {
      gsap.to(el, {
        duration: 0.1,
        scale: 1,
        onComplete: done
      })
    }
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    duration: 0.2,
    scale: 1.05,
    onComplete: () => {
      gsap.to(el, {
        duration: 0.1,
        scale: 0,
        onComplete: done
      })
    }
  })
}

export { onBeforeEnter, onEnter, onLeave }