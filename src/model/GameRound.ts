import QnACollection from "./QnACollection";

interface Round {
  getId(): number;
  setId(id: number): void;
  getQnACollection(): QnACollection;
  setQnACollection(qac: QnACollection): void;
}

export default Round;
