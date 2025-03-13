#!/bin/bash
set -e

echo "🚀 Deployment started..."
echo "🔍 AWS_S3_BUCKET: $AWS_S3_BUCKET"
echo "🔍 AWS_CLOUDFRONT_DISTRIBUTION_ID: $AWS_CLOUDFRONT_DISTRIBUTION_ID"

BUILD_DIR="out"

if [ ! -d "$BUILD_DIR" ]; then
  echo "❌ Build directory '$BUILD_DIR' does not exist. Aborting deployment."
  exit 1
fi

echo "📤 Uploading files from $BUILD_DIR to S3 bucket: $AWS_S3_BUCKET"
aws s3 sync "$BUILD_DIR" "s3://${AWS_S3_BUCKET}" --exclude ".DS_Store"

echo "🌀 Invalidating CloudFront distribution: $AWS_CLOUDFRONT_DISTRIBUTION_ID"
aws cloudfront create-invalidation --distribution-id "$AWS_CLOUDFRONT_DISTRIBUTION_ID" --paths "/*"

echo "✅ Deployment finished!"
