const formPath = (baseUrl, params) => {
  let resultUrl = baseUrl

  Object.entries(params).forEach(([key, value], index) => {
    if (index === 0) {
      resultUrl = `${resultUrl}?`
    } if (value) {
      resultUrl = `${resultUrl}${key}=${value}&`
    }
  })

  return resultUrl
}

export default formPath
