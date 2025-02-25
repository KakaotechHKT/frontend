import useKakaoLoader from '@lib/hooks/useKakaoLoader'
import { ReactNode } from 'react'
import { Map } from 'react-kakao-maps-sdk'

// import useMapStore from '@/lib/context/mapStore'
// import { Geo } from '@/lib/types/Entity/place'
// import useKakaoLoader from '@/lib/utils/hooks/useKakaoLoader'
// import { colorSet, ColorType } from '@/public/colors/colors'

// import { MAP_MARKER_COLORS, SpriteMapMarker } from './MapPin'

type KakaoMapProps = {
  modalLat?: number
  modalLng?: number
}

const KakaoMap = ({ modalLat, modalLng }: KakaoMapProps): ReactNode => {
  useKakaoLoader() // 카카오 지도 로딩
  // const { pins, center, focusedPlacePin } = useMapStore()

  return (
    <Map // 지도를 표시할 Container
      id='map'
      center={{
        // 지도의 중심좌표
        lat: 37.40031,
        lng: 127.1067144,
      }}
      isPanto={true}
      style={{
        width: '100%',
        height: '100%',
      }}
      level={6} // 지도의 확대 레벨
    >
      {/* {modalLat && modalLng && <SpriteMapMarker geo={{ latitude: modalLat, longitude: modalLng }} order={0} id='focus' />}
      {pins?.map((dayPin, dayPinIndex) =>
        dayPin.map((pin, index) => <SpriteMapMarker key={index} geo={pin} day={dayPinIndex} order={index} id='pins' />),
      )}
      {focusedPlacePin && <SpriteMapMarker geo={focusedPlacePin} order={0} id='focus' />} */}
      {/* 경로 */}
      {/* {pins?.map((dayPin, dayPinIndex) => (
        <Polyline
          key={dayPinIndex}
          path={getPath(dayPin)}
          strokeColor={colorSet[MAP_MARKER_COLORS[dayPinIndex] as ColorType]}
          strokeStyle='shortdot'
          strokeWeight={4}
        />
      ))} */}
    </Map>
  )
}

export default KakaoMap
