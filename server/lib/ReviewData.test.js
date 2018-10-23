const sinon = require('sinon');
const ReviewData = require('./ReviewData');
const testDb = require('../../test/init');
//ARISZTID'S TESTS
describe('Unit Test', () => {

    describe('Create', () => {
        it('create a review with timestamp automatically put in', () => {
            const review = {
                ratings: 5,
                description: "this works sickly bra",
                user_id: 2,
                restaurant_id: "17030960"
            }
            const fakeDb = {
                query: sinon.mock().withArgs(
                    sinon.match.string,
                    sinon.match({
                        ratings: review.ratings,
                        description: review.description,
                        date_posted: sinon.match.date,
                        user_id: review.user_id,
                        restaurant_id: review.restaurant_id
                    })
                )
            }
            return ReviewData.createReview(fakeDb, {
                        ratings: review.ratings,
                        description: review.description,
                        user_id: review.user_id,
                        restaurant_id: review.restaurant_id
            })
        })
    })
    describe('Get', () => {
        it('gets a specific restaurants reviews', () => {
            const fakeDb = {
                query: sinon.mock().withArgs(
                    sinon.match.string
                )
            }
            return ReviewData.getRestaurantReviews(fakeDb)
        })
    })
})

describe('Integration Test', () => {
    let db;
    function clearDb() {return db.query('delete from reviews')}
    beforeAll(() => {
        return testDb.initDb().then(database => {
            return db = database
        })
    })
    // beforeEach(() => {
    //     return clearDb()
    // })
    describe('Create', () => {
        it('create a review with timestamp automatically put in', () => {
            const review = {
                ratings: 5,
                description: "this works sickly bra",
                user_id: 2,
                restaurant_id: "17030960"
            }
            return ReviewData.createReview(db, review).then(myAddedReview => {
                expect(myAddedReview.length).not.toEqual(0);
                expect(myAddedReview[0]).toMatchObject({
                    id: expect.any(Number),
                    ratings: expect.any(String),
                    description: expect.any(String),
                    user_id: expect.any(Number),
                    date_posted: expect.any(String),
                    restaurant_id: expect.any(String)
                })
            })
        })
    })
    describe('Get', () => {
        it('gets a specific restaurants reviews', () => {
            return ReviewData.getRestaurantReviews(db).then(reviews => {
                // expect(reviews.length).not.toEqual(0);
                expect(reviews[0]).toMatchObject({
                    id: expect.any(Number),
                    ratings: expect.any(String),
                    description: expect.any(String),
                    user_id: expect.any(Number),
                    date_posted: expect.any(String),
                    restaurant_id: expect.any(String),
                    review_id: expect.any(Number),
                    review_photos: expect.any(String)
                })
            })
        })
    })
})