const Tether = artifacts.require('Tether');
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
.use(require("chai-as-promised"))
.should()

contract("DecentralBank", ([owner, customer]) => {
    let tether, rwd, decentralBank

    function tokens(number) {
        return web3.utils.toWei(number, "ether");
    }

    before(async ()=> {
        tether = await Tether.new();
        rwd = await RWD.new();
        decentralBank = await DecentralBank.new(rwd.address, tether.address);

        // transfer all tokens to decentralBank 
        await rwd.transfer(decentralBank.address, tokens('1000000'))

        //transfer 100 Kemi tether token to customer
        await tether.transfer(customer, tokens("100"), {from: owner})
    })

    describe("Kemi Tether Token", async() =>{
        it("matches name successfully", async()=> {
            const name = await tether.name();
            assert.equal(name, "Kemi Tether Token");
        })
    })

    describe("Kemi Reward Token Deployment",  async() => {
        it("matches name successfully", async()=> {
            const name = await rwd.name();
            assert.equal(name, "Kemi Reward Token");
        })
    })

    describe("Decentral Bank Deployment",  async() => {
        it("matches name successfully", async()=> {
            const name = await decentralBank.name();
            assert.equal(name, "Kemi's Decentral BanK");
        })

        it("contract has token", async ()=> {
            let balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance, tokens("1000000"))
        })
    })

    describe('Yield Farming', async() => {
        it("reward tokens for staking", async() =>{
            let result

            //check investors balance 
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens("100"), "investor kemi tether wallet balance before staking")
        

            // check staking
            await tether.approve(decentralBank.address, tokens("100"), {from: customer})
            await decentralBank.deposit(tokens("100"), {from: customer})

            //check updated balance of customers
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens("0"), "customer Kemi token wallet balance after staking")

            //check updated balance of Decentral bank
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens("100"), "dectral bank Kemi token wallet balance after staking")

            //is staking balance
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), "true", "customer is staking status after staking to be true")

            // issue tokens
            await decentralBank.issueTokens({from: owner})

            //Ensure only the owner can issue tokens
            await decentralBank.issueTokens({from: customer}).should.be.rejected;
            
            // unstake tokens 
            await decentralBank.withdraw({from: customer})

            //check unstaking balance
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens("100"), "customer Kemi token wallet balance after unstaking")

            //check updated balance of Decentral bank
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens("0"), "dectral bank Kemi token wallet balance after Unstaking")

            //is staking update
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), "false", "customer is no longer staking after unstaking")
        })
    })
})