import QuestionAndAnswer from "./QuestionAndAnswer";

abstract class QACollection extends Array<QuestionAndAnswer> {
  retrieveQWithId(id: number) {}
  initCollection() {}
}

class QnACollection extends QACollection {
  retrieveQWithId(id: number): QuestionAndAnswer {
    return {} as QuestionAndAnswer;
  }

  initCollection(): void {}
}

export default QnACollection;
