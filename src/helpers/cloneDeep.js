export const cloneDeep = (obj) => {
  if (obj === null) return null

  let clone = Object.assign({}, obj)

  for (let i in clone) {
    if (clone[i] != null && typeof clone[i] == "object") {
      clone[i] = cloneDeep(clone[i])
    }
  }

  if (Array.isArray(obj)) {
    clone.length = obj.length

    return Array.from(clone)
  }

  return clone
}