import { Angular2WakeparkTeaserPage } from './app.po';

describe('angular2-wakepark-teaser App', function() {
  let page: Angular2WakeparkTeaserPage;

  beforeEach(() => {
    page = new Angular2WakeparkTeaserPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
