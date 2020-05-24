const ProxyFactory = artifacts.require('Proxy');
const Impl = artifacts.require('ImplWithoutStorage');

contract('Proxy', function(accounts){
  beforeEach(async function(){
    this.impl = await Impl.new();
    const temp = await ProxyFactory.new(this.impl.address);
    this.proxy = await Impl.at(temp.address);
  });

  it('should return Hello World through proxy', async function(){
    const message = await this.proxy.hello();
    console.log(message);
  });
});
