const { describe, test, expect } = require('@jest/globals');

const GamePage = require("./GamePage")

test("Adds a ship", () => {
    GamePage.drop(["A1", "A2", "A3"]);
    expect(board.ships.length).toBe(1);
});

test("ships get hit", () => {
    GamePage.addShip(["A1", "A2", "A3"]);
    GamePage.recieveHit("A1");
    expect(board.ships[0].coords).toEqual(["x", "A2", "A3"]);
});

test("misses ships", () => {
    GamePage.addShip(["A1", "A2", "A3"]);

    expect(board.recieveHit("B1")).toBe(false);
});

test("sinks ships", () => {
    GamePage.addShip(["A1", "A2", "A3"]);
    GamePage.recieveHit("A1");
    GamePage.recieveHit("A2");
    GamePage.recieveHit("A3");

    expect(board.ships[0].isSunk()).toBe(true);
});