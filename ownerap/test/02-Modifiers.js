const truffleAssert = require('truffle-assertions');

const Ownerap = artifacts.require('Ownerap');

const {
    decimals,
    ether,
    addressZero,
    owner1,
    owner2,
    owner3,
    owner4,
    owner5,
    nonowner1,
    nonowner2,
    info1,
    info2
} = require('./dataTest');


contract('Modifiers', function() {

    let ownerap

    beforeEach('setup for each test', async () => {
        ownerap = await Ownerap.new()
    })

    describe('Modifiers', function () {

    });
})