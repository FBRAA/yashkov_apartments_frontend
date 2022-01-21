import React, {
  useContext, useEffect, useRef, useState,
} from 'react'
import {
  Image as KonvaImage,
  Layer,
  Stage,
} from 'react-konva'
import styled from 'styled-components'
import InvisibleLink from '../../components/InvisibleLink'
import Loader from '../../components/Loader'
import useResizeObserver from '../../hooks/useResizeObserver'
import ApartmentPolygons from './ApartmentPolygons'
import DarkOverlayContext from './DarkOverlayContext'
import { checkIfApartment } from './utils'
import FLOOR_PLAN from '../../assets/floor_plan.png'

const Container = styled.div`
  // Высота без calc() от элементов сверху здесь для того,
  // чтобы на странице по факту всегда присутсвовал скроллбар.
  // Иначе в теории useResizeObserver может сойти с ума и бесконечно
  // дергать туда-сюда размер карты из-за появляющегося/пропадающего
  // скроллбара.
  // + нужно для адекватного отображение фильтра brightness()
  // на ховере над квартирой.
  min-height: 100vh;
  padding: 4rem 20%;

  @media only screen and (max-width: 801px) {
    padding: 4rem 4%;
  }
`

const MapWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;
  overflow: hidden;
`

// Закоменнтированный код в этом компоненте использовался
// для изначального определения границ каждой квартиры.
// Я решил его оставить, чтобы было понятно, откуда
// взялись координаты для отрисовки полигонов квартир :)
const Map = ({ apartments }) => {
  const [mapImage, setMapImage] = useState(null)
  const [stageDimensions, setStageDimensions] = useState({ width: null, height: null })
  const [selectedApartment, setSelectedApartment] = useState(null)
  // const [points, setPoints] = useState([])

  const wrapRef = useRef(null)
  const linkRef = useRef(null)

  const setIsDarkOverlay = useContext(DarkOverlayContext)

  // ResizeObserver с троттлингом, чтобы не было
  // миллион рендеров в секунду.
  const { width } = useResizeObserver(wrapRef, 500)

  useEffect(() => {
    const img = new Image()
    img.src = FLOOR_PLAN
    img.onload = () => {
      setMapImage(img)
    }
  }, [])

  useEffect(() => {
    if (width && mapImage) {
      const newWidth = width
      const newHeight = (mapImage.height / mapImage.width) * newWidth;
      setStageDimensions({ width: newWidth, height: newHeight })
    }
  }, [width, mapImage])

  // const handleStageClick = ({ target }) => {
  //   const stage = target.getStage()
  //   const point = stage.getPointerPosition()

  //   const { x: rawX, y: rawY } = coordsToPercent({
  //     height: stageDimensions.height,
  //     width: stageDimensions.width,
  //     x: point.x,
  //     y: point.y,
  //   })

  //   const { x, y } = getStraightLinePoints({
  //     x: rawX,
  //     y: rawY,
  //     points,
  //   })

  //   setPoints((prevState) => [
  //     ...prevState,
  //     x,
  //     y,
  //   ])
  // }

  const handleLeave = () => {
    setSelectedApartment(null)
    setIsDarkOverlay(false)
  }

  const handleClick = ({ target }) => {
    if (checkIfApartment(target)) {
      linkRef.current.click()
    }
    handleLeave()
  }

  const handleMove = ({ target }) => {
    if (checkIfApartment(target)) {
      if (selectedApartment !== target.attrs.id) {
        setSelectedApartment(target.attrs.id)
        setIsDarkOverlay(true)
      }
    } else if (selectedApartment) {
      setSelectedApartment(null)
      setIsDarkOverlay(false)
    }
  }

  const isMapReady = !!mapImage && !!stageDimensions.width

  return (
    <Container>
      <InvisibleLink
        forwardRef={linkRef}
        to={`/apartments/${selectedApartment}`}
      />
      <MapWrapper ref={wrapRef}>
        {isMapReady
          ? (
            <Stage
              width={stageDimensions.width}
              height={stageDimensions.height}
              // onClick={handleStageClick}
              onClick={handleClick}
              onTouchEnd={handleClick}
              onMouseLeave={handleLeave}
              onMouseMove={handleMove}
              onTouchStart={handleMove}
              onTouchMove={handleMove}
            >
              <Layer>
                <KonvaImage
                  image={mapImage}
                  width={stageDimensions.width}
                  height={stageDimensions.height}
                />
              </Layer>
              <ApartmentPolygons
                apartments={apartments}
                selectedApartment={selectedApartment}
                stageDimensions={stageDimensions}
                mapImage={mapImage}
              />
              {/* <Layer
                opacity={0.7}
              >
                <Line
                  stroke='#e44a4a'
                  strokeWidth={5 * (stageDimensions.width / mapImage.width)}
                  points={convertLinePoints({
                    points,
                    width: stageDimensions.width,
                    height: stageDimensions.height,
                  })}
                  closed
                  fill='#cf6060'
                />
              </Layer> */}
            </Stage>
          ) : <Loader />}
      </MapWrapper>
    </Container>
  )
}

export default Map
