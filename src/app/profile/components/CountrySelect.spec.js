import CountrySelect from '@/app/profile/components/CountrySelect';
import {shallow} from 'vue-test-utils';
import countryList from 'country-list';

const countries = countryList().getNames();
describe('CountrySelect.vue', () => {
  let props;
  beforeEach(() => {
    props = {
      hasButton: true,
      countries
    };
  });
  it('validCountry should default to false', () => {
    const wrapper = shallow(CountrySelect, {
      propsData: props
    });
    expect(wrapper.vm.validCountry).to.be.false;
  });
  it('validCountry should become true when selectedCountry is in the list of countries', () => {
    const wrapper = shallow(CountrySelect, {
      propsData: props
    });
    wrapper.setData({selectedCountry: 'Ireland'});
    expect(wrapper.vm.validCountry).to.be.true;
  });
  it('should emit a country when it is selected, if there is no button', () => {
    props.hasButton = false;
    const wrapper = shallow(CountrySelect,{
      propsData: props
    });
    const field = wrapper.find('v-select');
    wrapper.setData({selectedCountry: 'Ireland'});
    field.trigger('input');
    expect(wrapper.emitted().countryAdded.length).to.equal(1);
    expect(wrapper.emitted().countryAdded[0][0]).to.equal('Ireland');
  });
  it('should wait until the button has been clicked, if there is a button', () => {
    const wrapper = shallow(CountrySelect,{
      propsData: props
    });
    const field = wrapper.find('v-select');
    wrapper.setData({selectedCountry: 'Ireland'});
    field.trigger('input');
    expect(wrapper.emitted()).to.eql({});
    const button = wrapper.find('v-btn');
    button.trigger('click');
    expect(wrapper.emitted().countryAdded.length).to.equal(1);
    expect(wrapper.emitted().countryAdded[0][0]).to.equal('Ireland');
  });
});
