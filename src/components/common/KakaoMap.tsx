import { Geo, KTB_Position } from '@app/part/page'
import { DUMMY_PLACE_DATA } from '@components/part/PlaceList'
import useKakaoLoader from '@lib/hooks/useKakaoLoader'
import { ReactNode } from 'react'
import { Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk'
import { PlaceMapMarker } from './MapPin'

// import useMapStore from '@/lib/context/mapStore'
// import { Geo } from '@/lib/types/Entity/place'
// import useKakaoLoader from '@/lib/utils/hooks/useKakaoLoader'
// import { colorSet, ColorType } from '@/public/colors/colors'

// import { MAP_MARKER_COLORS, SpriteMapMarker } from './MapPin'

type KakaoMapProps = {
  center: Geo
}

const KakaoMap = ({ center }: KakaoMapProps): ReactNode => {
  useKakaoLoader() // 카카오 지도 로딩
  // const { pins, center, focusedPlacePin } = useMapStore()

  return (
    <Map
      id='map'
      center={{
        // 카카오테크 부트캠프의 주심좌표
        lat: center.latitude,
        lng: center.longitude,
      }}
      isPanto={true}
      style={{
        width: '100%',
        height: '100%',
      }}
      level={3} // 지도의 확대 레벨
    >
      <ZoomControl position={'RIGHT'} />
      {/* 카테부 위치 */}
      <MapMarker
        position={{
          lat: KTB_Position.latitude,
          lng: KTB_Position.longitude,
        }}
      />

      {DUMMY_PLACE_DATA.map(place => (
        <PlaceMapMarker key={place.id} latitude={place.latitude} longitude={place.longitude} name={place.name} />
      ))}
    </Map>
  )
}

export default KakaoMap
