export function padZero(num) {
    
    num  = num > 9 ? num : '0' + num;

    return num
}