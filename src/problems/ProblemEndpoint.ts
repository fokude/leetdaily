import problems, { Category, Problem } from "./__data__/Problems";

export class ProblemEndpoint {
  problems = problems;
  listOfAllProblems: Problem[] = [];
  constructor() {
    Object.values(problems).forEach((problemList) => {
      this.listOfAllProblems = this.listOfAllProblems.concat(problemList);
    });
  }

  getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getRandomProblem(category: Category): Problem {
    if (category === Category.ALL) {
      return this.listOfAllProblems[
        this.getRndInteger(0, this.listOfAllProblems.length)
      ];
    }
    let p: Problem[] = [];
    Object.entries(this.problems).map(([cat, probs]) => {
      if (cat === category) {
        p = probs;
      }
    });

    return p[this.getRndInteger(0, p.length)];
  }
}
