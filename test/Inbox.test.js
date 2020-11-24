const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const {interface, bytecode} = require('../compile');

let web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
    // get list of all accounts from provider ganache
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(interface)
        .deploy({
            data : bytecode, arguments: ['Hi there!']
        })
        .send({from : accounts[0], gas : '1000000'})
});


describe('Inbox', () => {
    it('deploys a contract', () => {
        // is the adress present
        assert.ok(inbox.options.address);
    });

    it('default message', async () => {
        assert.equal(await inbox.methods.getMessage().call(), 'Hi there!');
    });

    it('setting new message', async () => {
        await inbox.methods.setMessage('fuck you').send({ from : accounts[0]});
        let message = await inbox.methods.message().call();
        assert.equal(message,'fuck you');
    });
});

