import { AppComponent } from '../src/app/app.component';
import { AppModule } from '../src/app/app.module';

describe('ComponentName.cy.ts', () => {
  it('intercepts and redirects to local json files', () => {
    cy.intercept('GET', '/assets/get-test.json', {}).as('getReqyest');
    cy.intercept('GET', '/assets/post-test.json', {}).as('postReqyest');
    cy.intercept('GET', '/assets/put-test.json', {}).as('putReqyest');
    cy.intercept('GET', '/assets/patch-test.json', {}).as('patchReqyest');
    cy.intercept('GET', '/assets/delete-test.json', {}).as('deleteReqyest');
    cy.intercept('GET', '/assets/head-test.json', {}).as('headReqyest');
    cy.intercept('GET', '/assets/options-test.json', {}).as('optionsReqyest');

    cy.mount(AppComponent, { imports: [AppModule] });

    cy.wait('@getReqyest');
    cy.wait('@postReqyest');
    cy.wait('@putReqyest');
    cy.wait('@patchReqyest');
    cy.wait('@deleteReqyest');
    cy.wait('@headReqyest');
    cy.wait('@optionsReqyest');
  });
});
