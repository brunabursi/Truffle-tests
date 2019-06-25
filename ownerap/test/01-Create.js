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


contract('Create', function() {

    let ownerap

    beforeEach('setup for each test', async () => {
        ownerap = await Ownerap.new()
    })

    describe('Constructor', function() {
        it('check if arrayApproval index 0 is 0x0', async() => {
            var response = await ownerap.arrayApproval.call(0)
            assert.equal(response, addressZero, 'arrayApproval is wrong at create')
            
        })

        it('min approval is 1', async() => {
            var response = await ownerap.minApproval()
            assert.equal(response, 1, 'minApproval is wrong at create')
        })

        it('check if creator is owner', async() => {        
            var response = await ownerap.owner(owner1)
            assert.equal(response, true, 'owner is wrong at create')
        }) 

        it('check if quantOwner is 1', async() => {
            var response = await ownerap.quantOwner()
            assert.equal(response, 1, 'quantOwner is wrong at create')      
        })
    });
})