const { Pokemon, Fire, Grass, Water, Charmander } = require("../battle");

describe("pokemonBattle", () => {
  test("test that new pokemon returns an object with the correct input", () => {
    const Eevee = new Pokemon("Eevee", 55, 18, "Headbutt");
    const expected = {
      name: "Eevee",
      hitPoints: 55,
      attackDMG: 18,
      move: "Headbutt",
    };
    expect(Eevee).toEqual(expected);
  });
  test("tests takeDamage method returns correct value", () => {
    const Charmander = new Pokemon("Charmander", 100, 20, "Fire Breath");
    expect(typeof Charmander.takeDamage).toBe("function");
    Charmander.takeDamage(50);
    expect(Charmander.hitPoints).toBe(50);
  });
  test("useMove returns attack damage", () => {
    const Vaporeon = new Pokemon("Vaporeon", 45, 15, "Bubble Spray");
    expect(Vaporeon.useMove()).toBe(15);
  });
  test("hasFainted returns true if hitpoints are 0", () => {
    const Vaporeon = new Pokemon("Vaporeon", 45, 15, "Bubble Spray");
    expect(Vaporeon.hasFainted()).toBe(false);
    const Squirtle = new Pokemon("Squirtle", 0, 15, "Bubble Spray");
    expect(Squirtle.hasFainted()).toBe(true);
  });
  test("fire class should have a property set to fire", () => {
    const Torchic = new Fire("Torchic", 30, 40, "Fire Blast");
    expect(Torchic.type).toBe("Fire");
  });
  test("fire class isEffectiveAgainst method should return true when passed a grass type pokemon", () => {
    const Torchic = new Fire("Torchic", 30, 40, "Fire Blast");
    const Bulbasaur = new Grass("Bulbasaur", 40, 30, "Vine Whip");
    const input = Torchic.isEffectiveAgainst(Torchic, Bulbasaur);
    expect(input).toBe(true);
  });
  test("fire class isWeakTo method should return true when passed a water type pokemon", () => {
    const Torchic = new Fire("Torchic", 30, 40, "Fire Blast");
    const Lapras = new Water("Lapras", 15, 64, "Water Gun");
    const input = Torchic.isWeakTo(Torchic, Lapras);
    expect(input).toBe(true);
  });
  test("sub classes take all relevant information from parent classes", () => {
    const Charmander2 = new Charmander("Charmander", 50, 70, "ember", "Fire");
    const Charmander1 = new Fire("Charmander", 50, 70, "ember", "Fire");
    const input = Charmander1;
    expect(input).toEqual(Charmander2);
  });
});
