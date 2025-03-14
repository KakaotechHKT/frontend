const 한식: string[] = ['매콤', '구수한', '뜨끈한', '칼칼한', '밥', '면', '국물', '고기']
const 중식: string[] = ['짜짱/짬뽕', '마라류', '양꼬치', '훠궈', '딤섬']
const 분식: string[] = ['김밥', '떡볶이', '핫도그']
const 일식: string[] = ['덮밥류', '초밥/사시미', '카츠', '나베', '야키토리', '튀김류', '라멘', '소바', '오마카세']
const 아시아식: string[] = ['쌀국수/팟타이', '카레', '케밥']
const 구내식당: string[] = ['구내식당']
const 패스트푸드: string[] = ['타코', '피자', '치킨', '햄버거', '편의점', '샌드위치/토스트']
const 양식: string[] = ['파스타', '스테이크', '화덕 피자', '수제 버거', '리조또', '샐러드']

type PlaceCategories = {
  한식: string[]
  중식: string[]
  분식: string[]
  일식: string[]
  아시아식: string[]
  구내식당: string[]
  패스트푸드: string[]
  양식: string[]
}

export const Categories: PlaceCategories = {
  한식,
  중식,
  분식,
  일식,
  아시아식,
  구내식당,
  패스트푸드,
  양식,
}

export const MainCategories = Object.keys(Categories) as (keyof PlaceCategories)[]
export type MainCategoriesType = (typeof MainCategories)[number]
