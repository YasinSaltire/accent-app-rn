import pickRandomIndexFromArray from "./pickRandomIndexFromArray";

const pickNRandomIndicesFromArray =<T>(N: number, A: T[]) => {
    const initArray: number[] = [];
    let index = -1; 
    while(initArray.length !== N) {
        // pick an index and populate initArray
        let index = pickRandomIndexFromArray(A);
        while (initArray.includes(index)) {
            index = pickRandomIndexFromArray(A);
        }
        initArray.push(index);
    }
    return initArray;
}

export default pickNRandomIndicesFromArray;