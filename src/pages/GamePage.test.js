const GamePage = require("./GamePage")

test("works", () => {
    expect(10).toBe(10);
});


test.skip("generate random direction", () => {
    GamePage.generateRandomDirection();
    expect.toBe(1 || 0);
});

test.skip("ships get hit", () => {
    GamePage.addShip(["1", "2", "3"]);
    GamePage.recieveHit("1");
    expect(board.ships[0].coords).toEqual(["x", "2", "3"]);
});

test.skip("misses ships", () => {
    GamePage.addShip(["1", "2", "3"]);

    expect(board.recieveHit("1")).toBe(false);
});

test.skip("sinks ships", () => {
    GamePage.addShip(["1", "2", "3"]);
    GamePage.recieveHit("1");

    expect(board.ships[0].isSunk()).toBe(true);
});