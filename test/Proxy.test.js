const ProxyStorageFactory = artifacts.require('ProxyWithStorage');
const ProxyImmutableFactory = artifacts.require('ProxyWithImmutable');
const MinimalProxyFactory = artifacts.require('MinimalProxyFactory');
const Impl = artifacts.require('Impl');

const { expect } = require('chai');

function debug(message) {
  console.log("\t\t" + message);
}

contract('Proxy', function(accounts){
  context('Deployment Gas', function(){
    context('Non Proxy', function(){
      beforeEach(async function(){
        this.impl = await Impl.new();
        this.deployment = (await web3.eth.getTransactionReceipt(this.impl.transactionHash)).gasUsed;
      });
      it('deploy gas usage', async function(){
        debug(this.deployment);
      });
      it('function call gas usage', async function(){
        const receipt = await this.impl.store(100);
        debug(receipt.receipt.gasUsed);
      });
    });

    context('storage', function(){
      beforeEach(async function(){
        this.impl = await Impl.new();
        const temp = await ProxyStorageFactory.new(this.impl.address);
        this.deployment = (await web3.eth.getTransactionReceipt(temp.transactionHash)).gasUsed;
        this.proxy = await Impl.at(temp.address);
      });
      it('deploy gas usage', async function(){
        debug(this.deployment);
      });

      it('should return Hello World through proxy', async function(){
        const message = await this.proxy.hello();
        expect(message).to.be.equal('Hello World');
      });
      it('function call gas usage', async function(){
        const receipt = await this.proxy.store(100);
        debug(receipt.receipt.gasUsed);
      });
    });

    context('Immutable', function(){
      beforeEach(async function(){
        this.impl = await Impl.new();
        const temp = await ProxyImmutableFactory.new(this.impl.address);
        this.deployment = (await web3.eth.getTransactionReceipt(temp.transactionHash)).gasUsed;
        this.proxy = await Impl.at(temp.address);
      });

      it('deploy gas usage', async function(){
        debug(this.deployment);
      });

      it('should return Hello World through proxy', async function(){
        const message = await this.proxy.hello();
        expect(message).to.be.equal('Hello World');
      });

      it('function call gas usage', async function(){
        const receipt = await this.proxy.store(100);
        debug(receipt.receipt.gasUsed);
      });
    });

    context('MinimalProxy', function(){
      beforeEach(async function(){
        this.impl = await Impl.new();
        const factory = await MinimalProxyFactory.new();
        const receipt = await factory.deploy(this.impl.address);
        const address = receipt.logs[0].args[0];
        this.deployment = receipt.receipt.gasUsed;
        this.proxy = await Impl.at(address);
      });

      it('deploy gas usage', async function(){
        debug(this.deployment);
      });

      it('should return Hello World through proxy', async function(){
        const message = await this.proxy.hello();
        expect(message).to.be.equal('Hello World');
      });

      it('function call gas usage', async function(){
        const receipt = await this.proxy.store(100);
        debug(receipt.receipt.gasUsed);
      });
    });
  });
});
