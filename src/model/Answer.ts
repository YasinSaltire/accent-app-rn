import AccentClip from "./Accent";

class Answer implements AccentClip {
  private id: number;
  private value: string;
  constructor(id: number, value: string) {
    this.id = id;
    this.value = value;
  }

  getId(): number {
    return this.id;
  }

  getvalue(): string {
    return this.value;
  }

  setId(id: number): void {
    this.id = id;
  }

  setValue(value: string): void {
    this.value = value;
  }
}

export default Answer;
