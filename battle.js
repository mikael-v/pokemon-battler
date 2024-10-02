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

function damageDealt(current, opposing) {
  let num;
  if (current.isEffectiveAgainst(opposing)) {
    num = current.attackDMG * 1.25;
    console.log(`${current.name}'s attack is super effective!`);
  } else if (current.isWeakTo(opposing)) {
    num = current.attackDMG * 0.75;
    console.log(`${current.name}'s attack is not very effective...`);
  } else {
    num = current.attackDMG;
  }
  return num;
}

function battleTurn(attacker, defender) {
  console.log(`${attacker.name} attacks ${defender.name}!`);
  let damage = damageDealt(attacker, defender);

  defender.takeDamage(damage);
  console.log(
    `${defender.name} takes ${damage} damage! Remaining HP: ${defender.hitPoints}`
  );

  if (defender.hasFainted()) {
    console.log(`${defender.name} has fainted! ${attacker.name} wins!`);
    return true;
  }
  return false;
}

function battle(pokemon1, pokemon2) {
  let battleOver = false;
  let turn = 1;

  while (!battleOver) {
    console.log(`Turn ${turn}:`);

    battleOver = battleTurn(pokemon1, pokemon2);
    if (battleOver) break;

    battleOver = battleTurn(pokemon2, pokemon1);
    if (battleOver) break;

    turn++;
  }
}

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
