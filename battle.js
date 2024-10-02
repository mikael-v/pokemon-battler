class Pokemon {
  constructor(name, hitPoints, attackDMG, move) {
    this.name = name;
    this.hitPoints = hitPoints;
    this.attackDMG = attackDMG;
    this.move = move;
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
}

class Fire extends Pokemon {
  constructor(name, hitPoints, attackDMG, move) {
    super(name, hitPoints, attackDMG, move);
    this.type = "Fire";
  }
  isEffectiveAgainst(current, given) {
    if (current.type === "Fire" && given.type === "Grass") {
      return true;
    }
    return false;
  }
  isWeakTo(current, given) {
    if (current.type === "Fire" && given.type === "Water") {
      return true;
    }
    return false;
  }
}
class Grass extends Pokemon {
  constructor(name, hitPoints, attackDMG, move) {
    super(name, hitPoints, attackDMG, move);
    this.type = "Grass";
  }
  isEffectiveAgainst(current, given) {
    if (current.type === "Grass" && given.type === "Water") {
      return true;
    }
    return false;
  }
  isWeakTo(current, given) {
    if (current.type === "Grass" && given.type === "Fire") {
      return true;
    }
    return false;
  }
}
class Water extends Pokemon {
  constructor(name, hitPoints, attackDMG, move) {
    super(name, hitPoints, attackDMG, move);
    this.type = "Water";
  }
  isEffectiveAgainst(current, given) {
    if (current.type === "Water" && given.type === "Fire") {
      return true;
    }
    return false;
  }
  isWeakTo(current, given) {
    if (current.type === "Water" && given.type === "Grass") {
      return true;
    }
    return false;
  }
}
class Normal extends Pokemon {
  constructor(name, hitPoints, attackDMG, move) {
    super(name, hitPoints, attackDMG, move);
    this.type = "Water";
  }
}
class Charmander extends Fire {
  constructor(name, hitPoints, attackDMG, move, type) {
    super(name, hitPoints, attackDMG, move, type);
    this.move = "ember";
  }
}
class Squirtle extends Water {
  constructor(name, hitPoints, attackDMG, move, type) {
    super(name, hitPoints, attackDMG, move, type);
    this.move = "water gun";
  }
}
class Bulbasaur extends Grass {
  constructor(name, hitPoints, attackDMG, move, type) {
    super(name, hitPoints, attackDMG, move, type);
    this.move = "vine rip";
  }
}
class Rattata extends Normal {
  constructor(name, hitPoints, attackDMG, move, type) {
    super(name, hitPoints, attackDMG, move, type);
  }
}

// fight

// This should take the Pokemon whose turn it is,
// Attack the defending Pokemon (deducting attacker's attack damage from the defender's hit points)
// End their turn
// Should take each Pokemon's strengths and weaknesses into account
// If a defender is strong against the attacking type, the attacking type's damage should be multiplied by 0.75.
// If a defender is weak against the attacking type, the attacking type's damage should be multiplied by 1.25.
// Each attack should be followed by an attack message
// The message will vary depending on the defender's weakness/strength.
// If the defending Pokemon faints (depletes all hit points), the attacker wins.

// Function to calculate damage dealt
function damageDealt(current, opposing) {
  let num;
  if (current.isEffectiveAgainst(opposing)) {
    num = current.attackDMG * 1.25; // Super effective
    console.log(`${current.name}'s attack is super effective!`);
  } else if (current.isWeakTo(opposing)) {
    num = current.attackDMG * 0.75; // Not very effective
    console.log(`${current.name}'s attack is not very effective...`);
  } else {
    num = current.attackDMG; // Normal damage
  }
  return num;
}

// Function to handle a turn of battle
function battleTurn(attacker, defender) {
  // Attacker uses its move
  console.log(`${attacker.name} attacks ${defender.name}!`);

  // Calculate damage dealt
  let damage = damageDealt(attacker, defender);

  // Defender takes the damage
  defender.takeDamage(damage);
  console.log(
    `${defender.name} takes ${damage} damage! Remaining HP: ${defender.hitPoints}`
  );

  // Check if the defender has fainted
  if (defender.hasFainted()) {
    console.log(`${defender.name} has fainted! ${attacker.name} wins!`);
    return true; // Battle is over
  }
  return false; // Battle continues
}

// Function to start a battle between two Pokémon
function battle(pokemon1, pokemon2) {
  let battleOver = false;
  let turn = 1;

  while (!battleOver) {
    console.log(`Turn ${turn}:`);

    // pokemon1's turn to attack pokemon2
    battleOver = battleTurn(pokemon1, pokemon2);
    if (battleOver) break;

    // pokemon2's turn to attack pokemon1
    battleOver = battleTurn(pokemon2, pokemon1);
    if (battleOver) break;

    turn++;
  }
}

// Example Usage
let charmander = new Charmander("Charmander", 100, 15, "ember");
let bulbasaur = new Bulbasaur("Bulbasaur", 100, 10, "vine whip");

battle(charmander, bulbasaur);

module.exports = {
  Pokemon,
  Fire,
  Grass,
  Water,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
};
