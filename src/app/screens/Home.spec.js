import Home from '@/app/screens/Home';
import Vue from 'vue';

describe('Home.vue', () => {
  let Constructor, HomeComponent;

  beforeEach(() => {
    Constructor   = Vue.extend(Home);
    HomeComponent = new Constructor().$mount();
  });
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home);
    const vm          = new Constructor().$mount();
    expect(vm.$el.textContent).to.equal('This is the home page');
  });
  /*it('should render with the correct data properties', () => {
    expect(Home.data).to.be.a('function');
    const initialData = Home.data();
    expect(initialData.pageName).to.equal('Profile');
  });*/
});
