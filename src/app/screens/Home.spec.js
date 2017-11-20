import Home from '@/app/screens/Home';
import Vue from 'vue';
Vue.config.silent = true;

describe('Home.vue', () => {
  let Constructor, HomeComponent;

  beforeEach(() => {
    Constructor   = Vue.extend(Home);
    HomeComponent = new Constructor().$mount();
  });
  it('should render the header', () => {
    expect(HomeComponent.$el.textContent).to.contain('Welcome to Finance Tracker');
  });
  /*it('should render with the correct data properties', () => {
    expect(Home.data).to.be.a('function');
    const initialData = Home.data();
    expect(initialData.pageName).to.equal('Profile');
  });*/
});
