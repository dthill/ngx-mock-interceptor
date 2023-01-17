import { AppComponent } from '../src/app/app.component';
import { AppModule } from '../src/app/app.module';

describe('ComponentName.cy.ts', () => {
  it('mounts', () => {
    cy.intercept('GET', '/assets/test.json', {}).as('mockRequest');
    cy.mount(AppComponent, { imports: [AppModule] });
    cy.wait('@mockRequest');
  });
});
