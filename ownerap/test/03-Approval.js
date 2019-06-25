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

        it('nononwer cannont doApproval', async() => {
            await truffleAssert.reverts(ownerap.doApproval({from: nonowner1 }), 'address must be owner');
        })

        it('owner can doApproval', async() => {            
            await truffleAssert.passes(ownerap.doApproval({from: owner1 }));         
        })

        it('get listApproval', async () => {           
            result = await truffleAssert.passes(ownerap.listApproval())            
        })
    })

    describe('MinApproval', function () {
        it('minApproval less than quantOwner', async() => {
            await ownerap.doApproval({from: owner1 })
            await truffleAssert.reverts(ownerap.changeMinApproval(0), 'minApproval must be equal or greater than quantOwner');
        })

        it('minApproval equal or greater quantOwner', async() => {
            await ownerap.doApproval({from: owner1 })
            await truffleAssert.passes(ownerap.changeMinApproval(1)
            );
        })
    })

    describe('Cancel approval', function() {
        it('fail cancel approval by nonowner', async() => {
            await truffleAssert.reverts(ownerap.cancelApproval({from: nonowner1 }), 'address must be owner');
        })

        it('fail cancel approval by isApproved', async() => {
            await truffleAssert.reverts(ownerap.cancelApproval({from: owner1 }), 'address not approved yet');
        })

        it('cancel approval', async() => {
            await truffleAssert.passes(ownerap.doApproval({from: owner1 }))
            await truffleAssert.passes(ownerap.cancelApproval({from: owner1 }))
        })

        it('reset all approval fail by nonowner', async() => {
            await truffleAssert.passes(ownerap.doApproval({from: owner1 }))
            await truffleAssert.reverts(ownerap.resetAllApproval({from: nonowner1 }), 'address must be owner')
        })

        it('reset all approval', async() => {
            await truffleAssert.passes(ownerap.doApproval({from: owner1 }))
            await truffleAssert.passes(ownerap.resetAllApproval({from: owner1 }))
        })
    })
})