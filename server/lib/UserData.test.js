const sinon         = require('sinon'),
      UserData      = require('./UserData'),
      testDB        = require('../../test/init');

//SEAN'S TESTS

describe('Unit Test', () => {
    describe('Get', () => {
        it('Should get user from db', () => {
            const fakeDB = {
                query: sinon.mock().withArgs(
                    sinon.match.string
                )
            }
            return UserData.getUser(fakeDB);
        })
    })
    describe('Create', () => {
        it('Should create a user in the db', () => {
            const user = {
                auth0_id: 'facebook|2364333683593240',
                username: 'Sean Parmar',
                email: 'sean.parmar@yahoo.com',
                created_at: new Date(),
                photos: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2364333683593240&height=50&width=50&ext=1542583011&hash=AeTN0SqI2Za8SBuz'
            }
            const fakeDB = {
                query: sinon.mock().withArgs(
                    sinon.match.string,
                    sinon.match({
                        auth0_id: user.auth0_id,
                        username: user.username,
                        email: user.email,
                        created_at: user.created_at,
                        photos: user.photos    
                    })
                )
            }
            return UserData.createUser(fakeDB, user);
        })
    })
});

// describe('Integration Test', () => {
//     let db;
//     beforeAll(() => {
//         return testDB.initDb().then(database => db = database)
//     })
//     describe('Create', () => {
//         it('Should create a user in the db', () => {
//             const user = {
//                 auth0_id: 'facebook|2364333683593240',
//                 username: 'sldfasfdasdasdfasasfdafgsgffkjakjlfdjka',
//                 email: 'alsdfjalkssdasasdfafdfdfgsgfsfdgsdgfjkla',
//                 created_at: 'prtiyesdasdfagsgfpoasdfariyiope',
//                 photos: 'lshdfksfjsaasdfassfddfgsdgfasafdakjfhaskhj'
//             }

//             return UserData.createUser(db, user).then(addedUser => {
//                 expect(addedUser.username).not.toEqual('');
//                 expect(addedUser[0]).toMatchObject({
//                     id: expect.any(Number),
//                     auth0_id: expect.any(String),
//                     username: expect.any(String),
//                     email: expect.any(String),
//                     created_at: expect.any(String),
//                     photos: expect.any(String)
//                 })
//             })
//         })
//     })
//     describe('Get', () => {
//         it('Should get user from the db', () => {
//             return UserData.getUser(db).then(user => {
//                 expect(user.length).not.toEqual(0);
//                 //Needed?
//                 expect(user[0]).toMatchObject({
//                     id: expect.any(Number),
//                     auth0_id: expect.any(String),
//                     username: expect.any(String),
//                     email: expect.any(String),
//                     created_at: expect.any(String),
//                     photos: expect.any(String)
//                 })
//             })
//         })
//     })
// })