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

contract('Owners', function() {

    let ownerap

    beforeEach('setup for each test', async () => {
        ownerap = await Ownerap.new()
    })

    describe('Owner functions - add', function () {
        beforeEach('setup approval', async() => {
                    await ownerap.doApproval({from: owner1 })
                })
        
                it('add owner exist failed', async() => {
                    await truffleAssert.reverts(ownerap.addOwner(owner1),'owner exists');
                })

                it('add owner failed by numb of approvals', async() => {
                    await truffleAssert.passes(ownerap.changeMinApproval(1))
                    await truffleAssert.reverts(ownerap.addOwner(nonowner1),'current approvals is less then minimum');
                })

                it('add new owner success', async() => {
                    await truffleAssert.passes(ownerap.addOwner(nonowner1))
                })
    })

    describe('Owner functions - del', function () {
        it('delete owner', async() => {
            await truffleAssert.passes(ownerap.doApproval({from: owner1 }))
            await truffleAssert.passes(ownerap.addOwner(owner2))
            await truffleAssert.passes(ownerap.doApproval({from: owner2 }))
            await truffleAssert.passes(ownerap.delOwner(owner2, {from: owner1}))
        })
    })
})