import Route from '@ember/routing/route';

export default class Index extends Route {
  public redirect() {
    this.replaceWith('about');
  }
}
