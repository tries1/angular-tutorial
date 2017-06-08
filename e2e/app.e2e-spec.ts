import { FirstAngularPage } from './app.po';

describe('first-angular App', () => {
  let page: FirstAngularPage;

  beforeEach(() => {
    page = new FirstAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
