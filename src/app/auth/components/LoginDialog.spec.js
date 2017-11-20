import LoginDialog from './LoginDialog';
import Bus from '@/app/events/bus';
import Vue from 'vue';

Vue.config.silent = true;

const sandbox     = sinon.sandbox.create();
describe('LoginDialog.vue', () => {
  afterEach(() => {
    sandbox.restore();
  });
  it('should be closed by default', () => {
    expect(typeof LoginDialog.data).to.equal('function');
    const initial = LoginDialog.data();
    expect(initial.loginShown).to.be.false;
  });
  it('should have a created hook', () => {
    expect(typeof LoginDialog.created).to.equal('function');
  });
  it('should register two event listeners upon creation', () => {
    const Constructor          = Vue.extend(LoginDialog);
    const onStub               = sandbox.stub(Bus, '$on');
    const LoginDialogComponent = new Constructor().$mount();
    expect(onStub).to.be.calledTwice;
    expect(onStub.getCall(0).args[0]).to.equal('login_clicked');
    expect(onStub.getCall(1).args[0]).to.equal('hide_login');
  });
});
