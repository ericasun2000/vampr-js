class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    if (!this.creator) {
      return 0;
    }
    return 1 + this.creator.numberOfVampiresFromOriginal;

    /* without recursion:
    let number = 0; 
    let current = this; 
    while (current.creator) {
      current = current.creator; 
      number++; 
    }
    return number; 
    */
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    // function defined with get therefore acts like a property 
    const current = this.numberOfVampiresFromOriginal;
    const other = vampire.numberOfVampiresFromOriginal;
    return current < other;  
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    // base case: if this === vampire return ture
    if (this === vampire) {
      return vampire; 
    } 
    if (this.numberOfVampiresFromOriginal === vampire.numberOfVampiresFromOriginal) {
      return this.creator.closestCommonAncestor(vampire.creator);
    }
    if (this.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal) {
      return this.creator.closestCommonAncestor(vampire);
    }
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return this.closestCommonAncestor(vampire.creator);
    }
  }
}

module.exports = Vampire;

