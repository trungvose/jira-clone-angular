import { defineConfig } from 'cypress'
import { devServer } from 'cypress-angular-dev-server';

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}'
  },
  component: {
    devServer,
    specPattern: 'src/app/**/*.component.cy.ts'
  }
})
