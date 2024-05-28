const db = require("../db/connection")
const app = require("../app")
const request = require("supertest")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data")
const express = require("express")
const endpoints = require("../endpoints.json")
const { string } = require("pg-format")

beforeEach(() => seed(data))
afterAll(() => db.end())

describe('GET /api/topics', () => {
    test('GET 200: returns array of all topics', () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body: {topics}}) => {
            expect(topics.length).toBe(3)
            topics.forEach((topic) => {
                expect(topic).toEqual(
                    expect.objectContaining({
                        description: expect.any(String),
                        slug: expect.any(String),
                    })
                )
            })
        })
    })
})

describe('GET /api', () => {
    test('GET 200: returns object describing all available endpoints', () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({body}) => {
            expect(body.endpoints).toEqual(endpoints)
        })
    });
})

describe('GET /api/articles/:article_id', () => {
    test('GET 200: returns article with the article ID passed', () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({body}) => {
            expect(body.article[0]).toMatchObject(
                {
                    article_id: expect.any(Number),
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                }
            )
            console.log(body)
        })
    })
    test('GET 404: returns correct error message if passed valid but non-existant article ID number', () => {
        return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("No Article Found")
        })
    });
    test('GET 400: returns correct error message if passed invalid article ID number', () => {
        return request(app)
        .get("/api/articles/bananas")
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad Request")
        })
    });
})