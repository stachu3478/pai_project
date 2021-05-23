export default {
  afterBuild: (model) => {
    Object.keys(model).forEach(k => {
      const meth = model[k]
      if (typeof meth === 'function')
        model[k] = meth()
    })
    return model
  }
}