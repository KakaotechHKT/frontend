#!/bin/bash
set -e

echo "🚀 Deployment started..."

BUILD_DIR="out"

# 빌드 결과물 디렉터리 확인
if [ ! -d "$BUILD_DIR" ]; then
  echo "❌ Build directory '$BUILD_DIR' does not exist. Aborting deployment."
  exit 1
fi

# S3에 정적 파일 업로드 (.DS_Store 파일 제외)
echo "📤 Uploading files from $BUILD_DIR to S3 bucket: ${AWS_S3_BUCKET}"
aws s3 sync "$BUILD_DIR" "s3://${AWS_S3_BUCKET}" --exclude ".DS_Store"

# CloudFront 캐시 무효화
echo "🌀 Invalidating CloudFront distribution: ${AWS_CLOUDFRONT_DISTRIBUTION_ID}"
aws cloudfront create-invalidation --distribution-id "${AWS_CLOUDFRONT_DISTRIBUTION_ID}" --paths "/*"

echo "✅ Deployment finished!"