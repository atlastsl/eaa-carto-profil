import { test } from '@japa/runner'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import app from '@adonisjs/core/services/app'

test.group('Project structure', () => {
  const requiredDirs = [
    'app/modules/members',
    'app/modules/directory_search',
    'app/modules/map',
    'app/modules/reports',
    'app/modules/admin',
    'app/modules/auth',
    'app/modules/audit',
    'app/middleware',
    'app/policies',
    'app/models',
    'app/services',
    'app/shared',
    'inertia/pages/public',
    'inertia/pages/admin',
    'inertia/components',
    'inertia/hooks',
    'inertia/layouts',
  ]

  for (const dir of requiredDirs) {
    test(`directory ${dir} exists`, ({ assert }) => {
      const rootPath = fileURLToPath(app.appRoot)
      const fullPath = join(rootPath, dir)
      assert.isTrue(existsSync(fullPath), `Expected directory ${dir} to exist`)
    })
  }
})
