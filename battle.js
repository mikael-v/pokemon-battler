import { rawlist, input } from "@inquirer/prompts";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class Pokemon {
  constructor(name, hitPoints, moves, trainerName = "") {
    this.name = name;
    this.hitPoints = hitPoints;
    this.moves = moves;
    this.trainerName = trainerName;
  }

  takeDamage(num) {
    this.hitPoints -= num;
    if (this.hitPoints < 0) {
      this.hitPoints = 0;
    }
  }

  hasFainted() {
    if (this.hitPoints <= 0) {
      return true;
    }
    return false;
  }

  displayName() {
    return this.trainerName ? `${this.trainerName}'s ${this.name}` : this.name;
  }
}

class Fire extends Pokemon {
  constructor(name, hitPoints, moves, trainerName) {
    super(name, hitPoints, moves, trainerName);
    this.type = "Fire";
  }

  isEffectiveAgainst(opposing) {
    return this.type === "Fire" && opposing.type === "Grass";
  }

  isWeakTo(opposing) {
    return this.type === "Fire" && opposing.type === "Water";
  }
}

class Grass extends Pokemon {
  constructor(name, hitPoints, moves, trainerName) {
    super(name, hitPoints, moves, trainerName);
    this.type = "Grass";
  }

  isEffectiveAgainst(opposing) {
    return this.type === "Grass" && opposing.type === "Water";
  }

  isWeakTo(opposing) {
    return this.type === "Grass" && opposing.type === "Fire";
  }
}

class Water extends Pokemon {
  constructor(name, hitPoints, moves, trainerName) {
    super(name, hitPoints, moves, trainerName);
    this.type = "Water";
  }

  isEffectiveAgainst(opposing) {
    return this.type === "Water" && opposing.type === "Fire";
  }

  isWeakTo(opposing) {
    return this.type === "Water" && opposing.type === "Grass";
  }
}

class Normal extends Pokemon {
  constructor(name, hitPoints, moves, trainerName) {
    super(name, hitPoints, moves, trainerName);
    this.type = "Normal";
  }
  isEffectiveAgainst() {
    return false;
  }

  isWeakTo() {
    return false;
  }
}

class Charmander extends Fire {
  constructor(trainerName) {
    super(
      "Charmander",
      100,
      [
        { name: "Ember", damage: 20 },
        { name: "Flamethrower", damage: 30 },
        { name: "Fire Fang", damage: 40 },
        { name: "Fire Spin", damage: 35 },
      ],
      trainerName
    );
  }
}
class Squirtle extends Water {
  constructor(trainerName) {
    super(
      "Squirtle",
      100,
      [
        { name: "Water Gun", damage: 20 },
        { name: "Water Pulse", damage: 30 },
        { name: "Aqua Tail", damage: 40 },
        { name: "Hydro Pump", damage: 35 },
      ],
      trainerName
    );
  }
}
class Bulbasaur extends Grass {
  constructor(trainerName) {
    super(
      "Bulbasaur",
      100,
      [
        { name: "Vine Whip", damage: 20 },
        { name: "Seed Bomb", damage: 30 },
        { name: "Power Whip", damage: 40 },
        { name: "Solar Beam", damage: 35 },
      ],
      trainerName
    );
  }
}

class Rattata extends Normal {
  constructor(trainerName) {
    super(
      "Rattata",
      100,
      [
        { name: "Tackle", damage: 20 },
        { name: "Quick Attack", damage: 30 },
        { name: "Take Down", damage: 40 },
        { name: "Double-Edge", damage: 35 },
      ],
      trainerName
    );
  }
}

function damageDealt(current, opposing, selectedMove) {
  let damage = selectedMove.damage;
  if (current.isEffectiveAgainst(opposing)) {
    damage *= 1.25;
    console.log(
      `${current.displayName()} used ${
        selectedMove.name
      }, it's super effective!`
    );
  } else if (current.isWeakTo(opposing)) {
    damage *= 0.75;
    console.log(
      `${current.displayName()} used ${
        selectedMove.name
      }, it's not very effective...`
    );
  } else {
    console.log(`${current.displayName()} used ${selectedMove.name}.`);
    damage = damage;
  }
  return damage;
}

const playerOneName = await input({ message: "Player 1, enter you name:" });
const playerTwoName = await input({ message: "Player 2, enter you name:" });

async function battleTurn(attacker, defender) {
  console.log(`${attacker.displayName()} attacks ${defender.displayName()}!`);
  await delay(1000);

  const moveChoice = await rawlist({
    message: `${attacker.trainerName ? attacker.trainerName + "'s " : ""}${
      attacker.name
    }, choose your move:`,
    choices: attacker.moves.map((move) => ({ name: move.name, value: move })),
  });

  let damage = damageDealt(attacker, defender, moveChoice);
  defender.takeDamage(damage);

  console.log(
    `${defender.displayName()} takes ${damage} damage! Remaining HP: ${
      defender.hitPoints
    }`
  );
  console.log(" ");
  await delay(1000);

  if (defender.hasFainted()) {
    console.log(
      `${defender.displayName()} has fainted! ${attacker.displayName()} wins!`
    );
    console.log(" ");
    return true;
  }

  return false;
}

async function battle(pokemon1, pokemon2) {
  let battleOver = false;
  let turn = 1;

  while (!battleOver) {
    console.log(`Turn ${turn}:`);
    await delay(1000);

    battleOver = await battleTurn(pokemon1, pokemon2);
    if (battleOver) break;

    battleOver = await battleTurn(pokemon2, pokemon1);
    if (battleOver) break;

    turn++;
  }
}

function createPokemon(choice, trainerName = "") {
  switch (choice) {
    case "Charmander":
      return new Charmander(trainerName);
    case "Squirtle":
      return new Squirtle(trainerName);
    case "Bulbasaur":
      return new Bulbasaur(trainerName);
    case "Rattata":
      return new Rattata(trainerName);
    default:
      throw new Error("Unknown Pokémon");
  }
}

const choice = await rawlist({
  message: "Choose your fighter!",
  choices: [
    { name: `${playerOneName}'s Charmander`, value: "Charmander" },
    { name: `${playerOneName}'s Squirtle`, value: "Squirtle" },
    { name: `${playerOneName}'s Bulbasaur`, value: "Bulbasaur" },
    { name: `${playerOneName}'s Rattata`, value: "Rattata" },
  ],
});

const opponent = await rawlist({
  message: "Choose your Opponent!",
  choices: [
    { name: `${playerTwoName}'s Charmander`, value: "Charmander" },
    { name: `${playerTwoName}'s Squirtle`, value: "Squirtle" },
    { name: `${playerTwoName}'s Bulbasaur`, value: "Bulbasaur" },
    { name: `${playerTwoName}'s Rattata`, value: "Rattata" },
  ],
});

const playerPokemon = createPokemon(choice, playerOneName);
const opponentPokemon = createPokemon(opponent, playerTwoName);
battle(playerPokemon, opponentPokemon);

export {
  Pokemon,
  Fire,
  Grass,
  Water,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
};
