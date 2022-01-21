/* eslint-disable no-underscore-dangle */
import React, { useLayoutEffect, useRef } from 'react'
import { Layer, Line } from 'react-konva'
import { convertLinePoints } from './utils'

const Polygon = ({
  stageDimensions,
  apartment,
  mapImage,
  isSelected,
}) => {
  const node = useRef()

  const { coordinates, id } = apartment

  // В обычном useEffect метод .cache() иногда работает нестабильно.
  useLayoutEffect(() => {
    if (node.current) {
      if (isSelected) {
        node.current.to({
          stroke: '#8aa7f8',
          fill: 'rgba(72, 166, 243, 0.205)',
          onUpdate() {
            if (node.current?.cache) node.current.cache()
          },
          duration: 0.2,
        })
      } else {
        node.current.to({
          stroke: 'rgba(255, 255, 255, 0)',
          fill: 'rgba(255, 255, 255, 0)',
          onUpdate() {
            if (node.current?.cache) node.current.cache()
          },
          duration: 0.2,
        })
      }
    }
  }, [isSelected, stageDimensions.width])

  return (
    <Line
      ref={node}
      key={id}
      id={id}
      strokeWidth={8 * (stageDimensions.width / mapImage.width)}
      // Координаты полигонов были установлены в процентах,
      // которые необходимо переводить в абсолютную величину
      // для канваса. Тем самым обеспечивается его адаптивность.
      points={convertLinePoints({
        points: coordinates,
        width: stageDimensions.width,
        height: stageDimensions.height,
      })}
      closed
      stroke='rgba(255, 255, 255, 0)'
      fill='rgba(255, 255, 255, 0)'
    />
  )
}

const ApartmentPolygons = ({
  apartments,
  stageDimensions,
  mapImage,
  selectedApartment,
}) => (
  <Layer
    opacity={1}
  >
    {apartments.map((apartment) => (
      <Polygon
        key={apartment.id}
        apartment={apartment}
        stageDimensions={stageDimensions}
        mapImage={mapImage}
        isSelected={apartment.id === selectedApartment}
      />
    ))}
  </Layer>
)

export default ApartmentPolygons
