export const motionTokens = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    page: 0.35,
  },
  easing: {
    smooth: [0.22, 1, 0.36, 1],
    sharp: [0.4, 0, 0.2, 1],
    spring: [0.34, 1.56, 0.64, 1],
  },
  distance: {
    sm: 8,
    md: 16,
    lg: 32,
  },
}

export const pageVariants = {
  initial: { opacity: 0, y: motionTokens.distance.md },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -motionTokens.distance.sm },
}

export const pageTransition = {
  duration: motionTokens.duration.page,
  ease: motionTokens.easing.smooth,
}

export const cardVariants = {
  hidden: { opacity: 0, y: motionTokens.distance.sm },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.normal,
      ease: motionTokens.easing.smooth,
      delay: Math.min(i * 0.03, 0.25),
    },
  }),
}

export const panelVariants = {
  hidden: { opacity: 0, scale: 0.97, y: motionTokens.distance.sm },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.normal,
      ease: motionTokens.easing.smooth,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: -motionTokens.distance.sm,
    transition: { duration: motionTokens.duration.fast },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: motionTokens.distance.sm },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.normal,
      ease: motionTokens.easing.smooth,
    },
  },
}
