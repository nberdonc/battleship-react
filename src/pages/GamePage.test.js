const GamePage = require("./GamePage")

test("works", () => {
    expect(10).toBe(10);
});


test.skip("generate random direction", () => {
    GamePage.PcRotated();
    expect.toBe(1 || 0);
});

test.skip("ships get hit", () => {
    GamePage.addShip(["A1", "A2", "A3"]);
    GamePage.recieveHit("A1");
    expect(board.ships[0].coords).toEqual(["x", "A2", "A3"]);
});

test.skip("misses ships", () => {
    GamePage.addShip(["A1", "A2", "A3"]);

    expect(board.recieveHit("B1")).toBe(false);
});

test.skip("sinks ships", () => {
    GamePage.addShip(["A1", "A2", "A3"]);
    GamePage.recieveHit("A1");
    GamePage.recieveHit("A2");
    GamePage.recieveHit("A3");

    expect(board.ships[0].isSunk()).toBe(true);
});