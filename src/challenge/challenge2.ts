type Words = {
    [key:string]: string
}

class Word {
    constructor(
        public term:string,
        public definition:string,
    ){}
}

class Dict {
    private words: Words
    constructor() {
        this.words = {}
    }
    add(word:Word): string{
        if(this.words[word.term] === undefined)
            this.words[word.term] = word.definition;

        return `${word.definition} 단어가 추가되었습니다.`
    }

    get(term:string): string{
        if(this.words[term] === undefined)
            return "해당하는 단어가 없습니다."
        
        return this.words[term];
    }
    delete(term:string): string{
        if(this.words[term] === undefined)
            return "해당하는 단어가 없습니다."

        delete this.words[term];
        return `${term} 단어가 삭제가 완료되었습니다.`
    }
    update(word:Word): string{
        if(this.words[word.term] === undefined)
            return "해당하는 단어가 없습니다."
        
        this.words[word.term] = word.definition;
        return `${word.definition} 단어가 수정 완료되었습니다.`
    }
    showAll(): Words{
        return this.words
    }
    count(): number{
        return Object.keys(this.words).length;
    }
    upsert(word:Word): string{
        this.words[word.term] = word.definition;
        return `${word.term} 단어가 등록/수정되었습니다.`;
    }
    exists(term:string): boolean{
        if(this.words[term] === undefined)
            return false;
        else
            return true;

    }
    bulkAdd(addWords:Words): string{
        let count = 0;
        Object.entries(addWords).forEach(([term,definition]) => {
            if (this.words[term] === undefined) {
                this.words[term] = definition;
                count++;
            }
        });

        return `총 ${count}건이 등록되었습니다.`;
    }
    bulkDelete(delWords:Words): string{
        let count = 0;
        Object.entries(delWords).forEach(([term,definition]) => {
            if (this.words[term] !== undefined) {
                delete this.words[term];
                count++;
            }
        });

        return `총 ${count}건이 삭제되었습니다.`;
    }
}


const dict = new Dict();

const apple = new Word("apple", "사과");
const banana = new Word("banana", "바나나");
const updatedApple = new Word("apple", "맛있는 사과");

// add
console.log(dict.add(apple));
console.log(dict.add(banana));

// get
console.log(dict.get(apple));

// exists
console.log(dict.exists("apple"));
console.log(dict.exists("orange"));

// count
console.log("단어 개수:" + dict.count());

// update
console.log(dict.update(updatedApple));
console.log("수정 결과:", dict.get("apple"));

// upsert: 기존 단어 수정
console.log(dict.upsert(new Word("banana", "노란 바나나")));

// upsert: 새로운 단어 추가
console.log(dict.upsert(new Word("grape", "포도")));

// bulkAdd
console.log(
  dict.bulkAdd({
    strawberry: "딸기",
    watermelon: "수박",
    apple: "중복된 사과", // 이미 있으므로 추가되지 않음
  })
);

// showAll
console.log("전체 단어:", dict.showAll());

// delete
console.log(dict.delete("banana"));

// bulkDelete
console.log(
  dict.bulkDelete({
    strawberry: "딸기",
    watermelon: "수박",
  })
);

// 최종 결과
console.log("최종 단어:", dict.showAll());
console.log("최종 개수:", dict.count());