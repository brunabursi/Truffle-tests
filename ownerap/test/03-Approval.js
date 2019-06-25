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

contract('Approval', function() {

    let ownerap

    beforeEach('setup for each test', async () => {
        ownerap = await Ownerap.new()
    })

    describe('Check approval', function() {
        it('should be an owner for approval', async() => {
            await ownerap.doApproval({from: owner1 });
            let result = await ownerap.checkApproval(owner1);
            assert.equal(result, 1, 'not returned an owner for approval');
        })
    })

    describe('Address approval', function () {
        it('owner can doApproval', async() => {
            await truffleAssert.passes(ownerap.doApproval({from: owner1 }))            
        })

        it('nononwer cannont doApproval', async() => {
            await truffleAssert.reverts(
                ownerap.doApproval({from: nonowner1 }),
                'address must be owner');
        })

        it('get listApproval', async () => {           
            result = await truffleAssert.passes(ownerap.listApproval())
        })
    })

    // describe('MinApproval change', function () {
    //     it('change minApproval is valid', async() => {
    //         var response = await ownerap.minApproval()
    //         assert.equal(response, 1, 'less than minApproval')
    //     })

    //     it('change minApproval is less than minimum', async() => {
    //         var response = await ownerap.minApproval()
    //         assert.reverts(response, 1, 'minApproval is more than minimum')
    //     })
    // })

    describe('Cancel approval', function() {
        it('cancel approval', async() => {
            await truffleAssert.passes(ownerap.doApproval({from: owner1 }))
            await truffleAssert.passes(ownerap.cancelApproval({from: owner1 }))
        })

        it('reset all approval', async() => {
            await truffleAssert.passes(ownerap.doApproval({from: owner1 }))
            await truffleAssert.passes(ownerap.resetAllApproval({from: owner1 }))
        })
    })
})