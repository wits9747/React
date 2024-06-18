// Set 생성
const set = new Set ()

// 요소 추가
set.add("타바스코 버거")
set.add('진도 대파 버거')
set.add('차바스코 버거')


// 원조 조회
console.log(set.has('차바스코 버거'))

// 원소 삭제
set.delete('진도 대파 버거')

console.log(set.size);

//초기화 생성
const set2 = new Set(['모짜렐라 인더버거', '한우불고기', '불새버거'])

console.log(set2);

//set 반복
console.log("set 반복");
set.forEach((value) => {
    console.log(value);
})

console.log("set2 반복")
for (const value of set2){
    console.log(value)
}