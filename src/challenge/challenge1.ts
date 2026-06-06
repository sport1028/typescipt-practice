type Arg1 = <T>(a:T[]) => (T | number);
type PrependType = <T>(a:T[], b:T) => T[];
type FindIndexType = <T>(a:T[], b:T) => (number | null);
type MixType = <T>(a:T[], b:T[]) => T[];
type SliceType = <T>(a:T[], b:number, c?: number) => T[];

/**
 * last(arr): 이 함수는 배열의 마지막 요소를 반환해야 합니다.
 */
const last:Arg1 = (arr) => {
    return arr[arr.length -1];
}
/**
 * prepend(arr, item): 이 함수는 배열의 시작 부분에 item을 넣고 배열을 return해야 합니다.
 */
const prepend:PrependType = (arr, item) => [item, ...arr];

/**
 * mix(arr,arr) : 두개의 배열을 매개변수로 받아, 매개변수로 받은 두 배열을 하나의 배열로 섞어서 하나의 배열로 반환합니다.
 */
const mix:MixType = (arr1,arr2) => [...arr1, ...arr2];

/**
 * count(arr) : 배열을 매개변수로 받아, 매개변수로 받아온 배열의 길이를 반환하면됩니다.
 */
const count:Arg1 = (arr) => {
    return arr.length;
}

/**
 * findIndex(arr, item) : 첫번째 매개변수로 배열을, 두번째 매개변수로 받아온 item이 첫번째 매개변수 arr배열의 몇번째 index로 존재하는지 체크한후 존재한다면 몇번째 index인지 반환하고 존재하지않는다면 null을 반환합니다.
 */
const findIndex:FindIndexType = (arr, item) => {
    const foundIdx = arr.indexOf(item);
    return foundIdx === -1 ? null : foundIdx;
}

/**
 * slice(arr, startIndex, endIndex): 첫번째 매개변수로 배열 arr을 받고, 두번째 매개변수로 숫자 startIndex, 세번째 매개변수 숫자 endIndex를 받습니다. 
 * 첫번째 매개변수 arr을 두번째 매개변수로 받은 startIndex부터 세번째 매개변수로 받은 인덱스까지 자른 결과를 반환하면됩니다. 
 * 이때 세번째 매개변수는 필수 매개변수가 아닙니다.
 */
const slice:SliceType = (arr, startIndex, endIndex) => {
    if(endIndex)
        return arr.slice(startIndex,endIndex);

    return arr.slice(startIndex);
}

const returnLast = last([1,2,3])
const returnPrepend = prepend([2,3,4], 1);
const returnMix = mix([1,3,4],[2,3,4]);
const returnCount = count([1,2,3])
const returnFindIndex = findIndex([1,2,3,4,5], 5)
const returnSlice1 = slice([1,2,3,4,5,6,7,8,9,10], 2, 4);
const returnSlice2 = slice([1,2,3,4,5,6,7,8,9,10], 3);

console.log(returnLast);
console.log(returnPrepend);
console.log(returnMix);
console.log(returnCount);
console.log(returnFindIndex);
console.log(returnSlice1);
console.log(returnSlice2);

