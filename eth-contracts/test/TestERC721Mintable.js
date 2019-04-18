var ERC721MintableComplete = artifacts.require('TitleTrack');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_one, 0001, {from: account_one});
            this.contract.mint(account_one, 0002, {from: account_one});
            this.contract.mint(account_one, 0003, {from: account_one});
            this.contract.mint(account_one, 0004, {from: account_one});
            this.contract.mint(account_one, 0005, {from: account_one});
        })

        it('should return total supply', async function () {
            let totalSupply = await this.contract.totalSupply();
            console.log(totalSupply);
        })

        it('should get token balance', async function () {

        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {

        })

        it('should transfer token from one owner to another', async function () {

        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {

        })

        it('should return contract owner', async function () {

        })

    });
})
