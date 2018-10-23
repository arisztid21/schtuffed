const sinon = require('sinon')
const TestimonyData = require('./TestimoniesData')
const testDb = require('../../test/init')

// JORDAN'S TEST

describe('Unit Test', () => {
    describe('Get', () => {
        it ('Should get testimony data from database', () => {
            const fakeDb = {
                query: sinon.mock().withArgs(
                    sinon.match.string
                )
            }
            return TestimonyData.getTestimony(fakeDb)
        })
    })

    describe('Create', () => {
        it ('Should create testimony data from database', () => {
            const testimony = {
                user_id: 1, 
                title: 'Test Title', 
                description: 'Test description', 
                ratings: 5, 
                date_posted: new Date()
            }
                
            const fakeDb = {
                query: sinon.mock().withArgs(
                    sinon.match.string, 
                    sinon.match({
                        user_id: testimony.user_id, 
                        title: testimony.title, 
                        description: testimony.description, 
                        ratings: testimony.ratings, 
                        date_posted: testimony.date_posted
                    })
                )
            }
            return TestimonyData.createTestimony(fakeDb, testimony);
        })
    })


});

describe('Integration Test', () => {
    let db;
    beforeAll( () => {
        return testDb.initDb().then( (res) => {
            return db = res
        })
    })
    describe('Create', () => {
        it('Should create testimony from database', () => {
            const testimony = {
                user_id: 10,
                title: 'kjksjdksjdksjd', 
                description: 'kjkjkjaada', 
                ratings: 4, 
                date_posted: 'kjkjkajkjad'
            }

            return TestimonyData.createTestimony(db, testimony).then(addedTestimony => {
                expect (addedTestimony.description).not.toEqual('');
                expect (addedTestimony[0]).toMatchObject({
                    id: expect.any(Number), 
                    user_id: expect.any(Number), 
                    title: expect.any(String), 
                    description: expect.any(String), 
                    ratings: expect.any(Number), 
                    date_posted: expect.any(String)
                })
            })
        })
    })
    describe ('Get', () => {
        it('Should get testimony from the database', () => {
            return TestimonyData.getTestimony(db).then(testimony => {
                expect(testimony.length).not.toEqual(0);
                expect(testimony[0]).toMatchObject({
                    id: expect.any(Number), 
                    user_id: expect.any(Number), 
                    title: expect.any(String), 
                    description: expect.any(String), 
                    ratings: expect.any(Number), 
                    date_posted: expect.any(String)
                })
            })
        })
    })
})