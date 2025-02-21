import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImport from 'eslint-plugin-unused-imports'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    // https://www.npmjs.com/package/eslint-plugin-simple-import-sort
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-import': unusedImport,
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // React를 import하지 않아도 사용 가능
      'simple-import-sort/imports': 'error', // import exports 정렬
      'simple-import-sort/exports': 'error',
      'no-var': 'error', // var 사용 금지
    },
  },
]

export default eslintConfig
