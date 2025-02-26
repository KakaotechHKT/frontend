import { ReactNode } from 'react'
import { MapMarker } from 'react-kakao-maps-sdk'

interface PlaceMapMarkerProps {
  latitude: number
  longitude: number
  name: string
}

export const PlaceMapMarker = ({ latitude, longitude, name }: PlaceMapMarkerProps): ReactNode => {
  const handleOpenKakaoMap = (startName: string, destName: string) => {
    console.log(destName)

    const kakaoMapUrl = `https://map.kakao.com/?sName=${startName}&eName=${destName}&by=FOOT`

    window.open(kakaoMapUrl, '_blank')
  }
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
      onClick={() => handleOpenKakaoMap('카카오테크 부트캠프 교육장', name)}
    />
  )
}
