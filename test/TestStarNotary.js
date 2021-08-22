//const { debug } = require("console");
const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

// // test case 1
// it('1. can Create a Star', async() => {
//     let tokenId = 1;
//     let instance = await StarNotary.deployed();
//     await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
//     assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
// });

// it('2. lets user1 put up their star for sale', async() => {
//     let instance = await StarNotary.deployed();
//     let user1 = accounts[1];
//     let starId = 2;
//     let starPrice = web3.utils.toWei(".01", "ether");
//     await instance.createStar('awesome star', starId, {from: user1});
//     await instance.putStarUpForSale(starId, starPrice, {from: user1});
//     assert.equal(await instance.starsForSale.call(starId), starPrice);
// });

// it('3. lets user1 get the funds after the sale', async() => {
//     let instance = await StarNotary.deployed();
//     let user1 = accounts[1];
//     let user2 = accounts[2];
//     let starId = 3;
//     let starPrice = web3.utils.toWei("10", "ether");
//     let balance = web3.utils.toWei("50", "ether");
//     await instance.createStar('awesome star', starId, {from: user1});
//     await instance.putStarUpForSale(starId, starPrice, {from: user1});
//     let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
//     await instance.buyStar(starId, {from: user2, value: balance});
//     let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
//     let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
//     let value2 = Number(balanceOfUser1AfterTransaction);
//     console.log("value1 " + value1);
//     console.log("value2 " + value2);
//     assert.equal(value1, value2);
// });

// it('4. lets user2 buy a star, if it is put up for sale', async() => {
//     let instance = await StarNotary.deployed();
//     let user1 = accounts[1];
//     let user2 = accounts[2];
//     let starId = 4;
//     let starPrice = web3.utils.toWei(".01", "ether");
//     let balance = web3.utils.toWei(".05", "ether");
//     await instance.createStar('awesome star', starId, {from: user1});
//     await instance.putStarUpForSale(starId, starPrice, {from: user1});
//     let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
//     await instance.buyStar(starId, {from: user2, value: balance});
//     assert.equal(await instance.ownerOf.call(starId), user2);
// });

// it('5. lets user2 buy a star and decreases its balance in ether', async() => {
//     let instance = await StarNotary.deployed();
//     let user1 = accounts[1];
//     let user2 = accounts[2];
//     let starId = 5;
//     let starPrice = web3.utils.toWei(".01", "ether");
//     let balance = web3.utils.toWei(".05", "ether");
//     await instance.createStar('awesome star', starId, {from: user1});
//     await instance.putStarUpForSale(starId, starPrice, {from: user1});
//     let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
//     const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
//     await instance.buyStar(starId, {from: user2, value: balanceOfUser2BeforeTransaction, gasPrice:0});
//     const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
//     let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
//     assert.equal(value, starPrice);
// });

// // Implement Task 2 Add supporting unit tests

// it('6. can add the star name and star symbol properly', async() => {
//     // 1. create a Star with different tokenId
//     let instance = await StarNotary.deployed();
//     let user3 = accounts[3];
//     let starId = 3;    
//     await instance.createStar('more awesome star', starId, {from: user3});    
    
//     //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
//     assert.equal(await instance.name(), "SmittyMarketPlace");
//     assert.equal(await instance.symbol(), "SMP");
// });

it('7. lets 2 users exchange stars', async() => {
    // 1. create 2 Stars with different tokenId
    // let instance = await StarNotary.deployed();
    // let ownerOfExhange =  accounts[3];
    // let user4 = accounts[4];
    // let starId4 = 4;  
    // let user5 = accounts[5];
    // let starId5 = 5;      

    // console.log(user4);
    // console.log(user5);
    // await instance.createStar('awesome star 4', starId4, {from: user4});
    // await instance.createStar('awesome star 5', starId5, {from: user5});

    // // 2. Call the exchangeStars functions implemented in the Smart Contract
    // await debug(instance.exchangeStars(starId4, starId5,{from:user5}));
    //await debug(instance.exchangeStars(starId5, starId4,{from:user5}));

    // 3. Verify that the owners changed
    //assert.equal(await instance.ownerOf.call(user4), user5);
    //assert.equal(await instance.ownerOf.call(user5), user4);
});

it('8. lets a user transfer a star', async() => {
    // 1. create a Star with different tokenId
    let instance = await StarNotary.deployed();    

    let user6 = accounts[6];
    let starId6 = 6;  

    let user7 = accounts[7];
    let starId7 = 7;  

    //console.log('owner of star 6: ' + user6)
    //console.log('owner of star 7: ' + user7)

    await instance.createStar('awesome star 6', starId6, {from: user6});
    await instance.createStar('awesome star 7', starId7, {from: user7});

    //transfer star6 to user7
    //console.log('before the transfer : ' + await instance.ownerOf(starId6));   
    
    // 2. use the transferStar function implemented in the Smart Contract   
    await debug(instance.transferStar(user7,starId6, { from:user6}))    

    // 3. Verify the star owner changed.
    assert.equal(await instance.ownerOf.call(starId6), user7);
    //console.log('after the transfer : ' + await instance.ownerOf(starId6));
});

it('9. lookUptokenIdToStarInfo test', async() => {
    // 1. create a Star with different tokenId
    let instance = await StarNotary.deployed();    
    let user8 = accounts[8];
    let starId8 = 8;  
    await instance.createStar('awesome star 8', starId8, {from: user8});

    // 2. Call your method lookUptokenIdToStarInfo
    var starName = await instance.lookUptokenIdToStarInfo(starId8);
    console.log(starName);

    // 3. Verify if you Star name is the same
    assert.equal(starName, 'awesome star 8');
});