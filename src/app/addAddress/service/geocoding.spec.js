import axios from 'axios';
import * as geocoding from './geocoding';
const sandbox = sinon.sandbox.create();
describe('geocoding', () => {
  describe('fetch geocoded address',  () => {
    let getStub;
    beforeEach(() => {
      getStub = sandbox.stub(axios, 'get');
    });
    afterEach(() => {
      sandbox.restore();
    });

    it('should return the addresses when there is only one line',async () => {
      getStub.resolves({data:{formatted_address: '1233 some arbitrary address, waterford, ireland'}});
      const result = await geocoding.fetchGeocodedAddress({address01: 'some arbitrary address', country: 'ireland'});
      expect(result).to.eql({formatted_address: '1233 some arbitrary address, waterford, ireland'});
    });
    it('should return the addresses when there are multiple lines',async () => {
      getStub.resolves({data:{formatted_address: '1233 some arbitrary address, waterford, ireland'}});
      const result = await geocoding.fetchGeocodedAddress({address01: 'some arbitrary address', address02: 'waterford', country: 'ireland'});
      expect(result).to.eql({formatted_address: '1233 some arbitrary address, waterford, ireland'});
    });
  });
  describe('format address', () => {
    it('should return an error when there is no address01 field', () => {
      const result = geocoding.formatAddress({country: 'ireland'});
      expect(result.error).to.exist;
      expect(result.error).to.eql('missing data');
    });
    it('should return an error when there is no country field', () => {
      const result = geocoding.formatAddress({address01: 'ireland'});
      expect(result.error).to.exist;
      expect(result.error).to.eql('missing data');
    });
    it('should correctly format when there is only one address line and country', () => {
      const result = geocoding.formatAddress({address01: 'waterford', country: 'ireland'});
      expect(result.error).to.not.exist;
      expect(result).to.eql('waterford, ireland');
    });
    it('should correctly format when there are two address lines and country', () => {
      const result = geocoding.formatAddress({address01: 'barrack street',address02: 'waterford', country: 'ireland'});
      expect(result.error).to.not.exist;
      expect(result).to.eql('barrack street, waterford, ireland');
    });
    it('should correctly format when there are three address lines and country', () => {
      const result = geocoding.formatAddress({address01: '20',address02: 'barrack street',address03: 'waterford', country: 'ireland'});
      expect(result.error).to.not.exist;
      expect(result).to.eql('20, barrack street, waterford, ireland');
    });
  });
  describe('create params', () => {
    it('should return the correct data', () => {
      const result = geocoding.createParams('this is an address');
      expect(result).to.eql({address:'this is an address', key: process.env.MAPS_API_KEY});
    });
  });
});
