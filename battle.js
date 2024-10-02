class Pokemon {
    constructor(name, hitPoints, attackDMG, move){
        this.name = name
        this.hitPoints = hitPoints
        this.attackDMG = attackDMG
        this.move = move
    }

    takeDamage(num){
         this.hitPoints -= num
    }

    useMove(){
        console.log(`${this.name} used {this.move}`)
        return this.attackDMG
    }

    hasFainted(){
        if(this.hitPoints === 0){
            return true
        }return false
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

class Pokeball {
    constructor(pokemon = {}){
        this.pokemon = pokemon
     }

    
    //empty pokemon and youre catching a pokemon
    //full but trying to catch one
    //empty and trying to throw
    //full and returning the pokemon (go bulbasaur)

     throw(pokemon){
         if (this.pokemon.hasOwnProperty(pokemon)){
             return "There's a pokemon sleeping in here!"
        }
        // else if (Object.keys(this.pokemon).length === 0){
            return "Empty..."
        // }
     }

}

module.exports = { Pokemon, Fire, Grass, Water, Charmander, Squirtle, Bulbasaur, Rattata, Pokeball }