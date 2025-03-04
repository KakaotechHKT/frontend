#!/bin/bash

read -e -p "> Do you want to deploy (y/N)? " deploy

if [ "$deploy" = "y" ]; then
    echo "> Deploy starts..."

    # S3 업로드
    aws s3 sync ./out s3://$AWS_S3_BUCKET --exclude ".DS_Store"

    # CloudFront 캐시 무효화
    aws cloudfront create-invalidation --distribution-id $AWS_CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

    echo "> Deploy finished!"
    echo ""
else
    echo "> Deploy canceled."
    echo ""
fi