import QnACollection from "./QnACollection";

interface Round {
  getId(): number;
  setId(id: number): void;
  getQnACollection(): QnACollection;
  setQnACollection(qac: QnACollection): void;
}

class GameRound implements Round {
  private id: number;
  private qnaCollection: QnACollection;
  constructor(id: number, qac: QnACollection) {
    this.id = id;
    this.qnaCollection = qac;
  }
  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  getQnACollection(): QnACollection {
    return this.qnaCollection;
  }

  setQnACollection(qac: QnACollection): void {
    this.qnaCollection = qac;
  }
}

export default Round;
