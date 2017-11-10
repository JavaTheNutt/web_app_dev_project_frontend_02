import Profile from '@/app/profile/components/Profile';
import Vue from 'vue';

describe('Profile.vue', () => {
  let Constructor, ProfileComponent;

  beforeEach(() => {
    Constructor = Vue.extend(Profile);
    ProfileComponent = new Constructor().$mount();
  });
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Profile);
    const vm = new Constructor().$mount();
    expect(vm.$el.textContent)
    .to.equal('This is the Profile page');
  });
  it('should render with the correct data properties', () => {
    expect(Profile.data).to.be.a('function');
    const initialData = Profile.data();
    expect(initialData.pageName).to.equal('Profile');
  });
});
