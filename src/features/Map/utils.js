/* eslint-disable import/prefer-default-export */
export const coordsToPercent = ({
  width,
  height,
  x,
  y,
}) => ({
  x: x / width,
  y: y / height,
})

export const percentToCoords = ({
  width,
  height,
  x,
  y,
}) => ({
  x: x * width,
  y: y * height,
})

export const convertLinePoints = ({ points, width, height }) => {
  const convertedPoints = []

  for (let i = 0; i < points.length; i += 2) {
    const x = points[i]
    const y = points[i + 1]
    convertedPoints.push(x * width)
    convertedPoints.push(y * height)
  }

  return convertedPoints
}

export const getStraightLinePoints = ({
  x,
  y,
  points,
}) => {
  const len = points.length

  if (!len) {
    return { x, y }
  }

  const prevY = points[len - 1]
  const prevX = points[len - 2]

  const diffX = Math.abs(x - prevX)
  const diffY = Math.abs(y - prevY)

  if (diffX > diffY) {
    return { x, y: prevY }
  }
  return { x: prevX, y }
}

export const checkIfApartment = (target) => (target && Object.prototype.hasOwnProperty.call(target.attrs, 'points'))
