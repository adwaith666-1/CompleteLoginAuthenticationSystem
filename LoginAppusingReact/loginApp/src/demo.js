// let arr = [10,90,30,40,50];

// let largest = function() {
// let  max = arr[0];
// for(let i=0;i<arr.length;i++) {
//     if(arr[i]>max) {
//         max= arr[i];
//     }
// }
// return max;
// }
// console.log(largest());

// let arr = [10,90,30,40,50];
// function reverse(arr) {
//     let i=0; let j = arr.length-1;

//     while(i<j) {
//         [arr[i],arr[j]] = [arr[j],arr[i]];
//         i++;j--;
//     }
//     return arr;
// }

// console.log(reverse(arr));

// function palindrome(str) {
//     let i=0; let j=str.length-1;
//     while(i<j) {
//         if(str.charAt(i)!=str.charAt(j)) {
//             return false;
//         }
//         i++;j--;
//     }
//     return true;
// }

// let pal = palindrome("malayaldm");
// if(pal===true) {
//     console.log("palindrome");
// }
// else{
//     console.log("not");
// }



// function removeDupl(arr) {
//     let i=0;

//     for(let j=0;j<arr.length;j++) {
//         if(arr[j]!=arr[i]) {
//             i++;
//             arr[i] = arr[j];
//         }
//     }
//     return i+1;
// }

// console.log(removeDupl([1,2,2,3,4]));

// function subarraySum(arr,target) {
//     let sum = 0;
//     let left = 0;

//     for(let right = 0;right<arr.length;right++) {
//         sum+=arr[right];
//         while(sum>target) {
//             sum-=arr[left];
//             left++;
//         }
//         if(sum==target) return true;
//     }
//     return false;
// }

// function longestsub(str) {
//     let set = new Set();
//     let max = 0; let left=0;

//     for(let right=0;right<str.length;right++) {
//         while(set.has(str[right])) {
//             set.delete(set.delete);
//             left++;
//         }

//         set.add(str[right]);
//         max = Math.max(max,right-left+1);
//     }
//     return max;
// }

function validpara(str) {
    let st = [];
    for(let ch of str) {
        if(ch=='('||ch=='['||ch=='{') {
            st.push(ch);
        }
        else {
            let p = st.pop();
            if(ch == ')' && p !='(' || ch == ']' && p !='[' || ch == '}' && p !='{') {
                return false;
            }
         }
    }
    return st.length == 0;
}

let res = validpara("({{})");
if(res==true) {
    console.log("valid");
}
else {
    console.log("not valid");
}