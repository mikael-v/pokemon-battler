import { rawlist, input } from "@inquirer/prompts";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class Pokemon {
  constructor(name, hitPoints, attackDMG, move, trainerName = "") {
    this.name = name;
    this.hitPoints = hitPoints;
    this.attackDMG = attackDMG;
    this.move = move;
    this.trainerName = trainerName;
  }

  takeDamage(num) {
    this.hitPoints -= num;
  }

  useMove() {
    console.log(`${this.name} used {this.move}`);
    return this.attackDMG;
  }

  hasFainted() {
    if (this.hitPoints === 0) {
      return true;
    }
    return false;
  }

  displayName() {
    return this.trainerName ? `${this.trainerName}'s ${this.name}` : this.name;
  }
}

class Fire extends Pokemon {
  constructor(name, hitPoints, attackDMG, move, trainerName) {
    super(name, hitPoints, attackDMG, move, trainerName);
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
  constructor(name, hitPoints, attackDMG, move, trainerName) {
    super(name, hitPoints, attackDMG, move, trainerName);
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
  constructor(name, hitPoints, attackDMG, move, trainerName) {
    super(name, hitPoints, attackDMG, move, trainerName);
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
  constructor(name, hitPoints, attackDMG, move, trainerName) {
    super(name, hitPoints, attackDMG, move, trainerName);
    this.type = "Normal";
  }
}

class Charmander extends Fire {
  constructor(trainerName) {
    super("Charmander", 100, 20, "ember", trainerName);
  }
}
class Squirtle extends Water {
  constructor(name, hitPoints, attackDMG, move, type, trainerName) {
    super(name, hitPoints, attackDMG, move, type, trainerName);
    this.move = "water gun";
  }
}
class Bulbasaur extends Grass {
  constructor(name, hitPoints, attackDMG, move, type, trainerName) {
    super(name, hitPoints, attackDMG, move, type, trainerName);
    this.move = "vine rip";
  }
}
class Rattata extends Normal {
  constructor(name, hitPoints, attackDMG, move, type, trainerName) {
    super(name, hitPoints, attackDMG, move, type, trainerName);
  }
}

function damageDealt(current, opposing) {
  let num;
  if (current.isEffectiveAgainst(opposing)) {
    num = current.attackDMG * 1.25;
    console.log(`${current.displayName()}'s attack is super effective!`);
  } else if (current.isWeakTo(opposing)) {
    num = current.attackDMG * 0.75;
    console.log(`${current.displayName()}'s attack is not very effective...`);
  } else {
    num = current.attackDMG;
  }
  return num;
}

const playerName = await input({ message: "Enter you name:" });

async function battleTurn(attacker, defender) {
  console.log(`${attacker.displayName()} attacks ${defender.displayName()}!`);
  await delay(1000);

  let damage = damageDealt(attacker, defender);
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
    { name: `${playerName}'s Charmander`, value: "Charmander" },
    { name: `${playerName}'s Squirtle`, value: "Squirtle" },
    { name: `${playerName}'s Bulbasaur`, value: "Bulbasaur" },
    { name: `${playerName}'s Rattata`, value: "Rattata" },
  ],
});

const opponent = await rawlist({
  message: "Choose your Opponent!",
  choices: [
    { name: "Charmander", value: "Charmander" },
    { name: "Squirtle", value: "Squirtle" },
    { name: "Bulbasaur", value: "Bulbasaur" },
    { name: "Rattata", value: "Rattata" },
  ],
});

const playerPokemon = createPokemon(choice, playerName);
const opponentPokemon = createPokemon(opponent);
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
