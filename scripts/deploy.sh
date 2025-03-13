#!/bin/bash
set -e

echo "🚀 Deployment started..."

BUILD_DIR="out"

# 빌드 결과물 디렉터리 확인
if [ ! -d "$BUILD_DIR" ]; then
  echo "❌ Build directory '$BUILD_DIR' does not exist. Aborting deployment."
  exit 1
fi

# 현재 브랜치 확인
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "🔎 Current branch: $BRANCH"

# 환경 변수 설정
if [ "$BRANCH" == "dev-test" ]; then
  TARGET_S3_BUCKET="${AWS_DEV_S3_BUCKET}"
  TARGET_CLOUDFRONT_ID="${AWS_DEV_CLOUDFRONT_DISTRIBUTION_ID}"
  echo "🌱 Deploying to Dev environment..."
else
  TARGET_S3_BUCKET="${AWS_S3_BUCKET}"
  TARGET_CLOUDFRONT_ID="${AWS_CLOUDFRONT_DISTRIBUTION_ID}"
  echo "🚀 Deploying to Prod environment..."
fi

# S3에 정적 파일 업로드 (.DS_Store 파일 제외)
echo "📤 Uploading files from $BUILD_DIR to S3 bucket: $TARGET_S3_BUCKET"
aws s3 sync "$BUILD_DIR" "s3://${TARGET_S3_BUCKET}" --exclude ".DS_Store"

# CloudFront 캐시 무효화
echo "🌀 Invalidating CloudFront distribution: $TARGET_CLOUDFRONT_ID"
aws cloudfront create-invalidation --distribution-id "$TARGET_CLOUDFRONT_ID" --paths "/*"

echo "✅ Deployment finished!"