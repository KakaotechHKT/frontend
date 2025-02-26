import { ReactNode } from 'react'
import { MapMarker } from 'react-kakao-maps-sdk'

interface PlaceMapMarkerProps {
  latitude: number
  longitude: number
}

export const PlaceMapMarker = ({ latitude, longitude }: PlaceMapMarkerProps): ReactNode => {
  return (
    <MapMarker
      position={{
        lat: latitude,
        lng: longitude,
      }}
      image={{
        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
        size: {
          width: 24,
          height: 35,
        }, // 마커이미지의 크기입니다
      }}
    />
  )
}
