import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImport from 'eslint-plugin-unused-imports'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  { ignores: ['.next'] },
  {
    plugins: { 'simple-import-sort': simpleImportSort, 'unused-imports': unusedImport }, // 플러그인 추가

    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\w'], // 1. 기본 라이브러리
            ['^@'], // 2. @로 시작하는 alias (예: @public, @react-spring 등)
            ['^\\.\\./', '^\\./'], // 3. 상대 경로 import (예: ./ 또는 ../)
            ['^'], // 4. 빈 줄로 구분한 기타 모든 import
          ],
        },
      ],
      'simple-import-sort/exports': 'error', // export 자동 정렬
      'no-unused-vars': 'off', // 기본 no-unused-vars 비활성화
      'unused-imports/no-unused-imports': 'error', // 사용되지 않은 import에 대한 경고
      '@typescript-eslint/no-unused-vars': 'off', // TypeScript 관련 unused-vars 비활성화
    },
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
  },
]

export default eslintConfig
