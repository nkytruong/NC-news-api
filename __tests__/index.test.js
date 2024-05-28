const db = require("../db/connection")
const app = require("../app")
const request = require("supertest")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data")
const express = require("express")
const endpoints = require("../endpoints.json")

beforeEach(() => seed(data))
afterAll(() => db.end())

describe("GET /api/topics", () => {
    test("GET 200: returns array of all topics", () => {
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

describe("GET /api", () => {
    test('GET 200: returns object describing all available endpoints', () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({body}) => {
            expect(body.endpoints).toEqual(endpoints)
        })
    });
})