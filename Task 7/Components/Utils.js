export class Utils {
    constructor() {
        console.log("hi");
    }

    indexToColumnLabel(index) {
        let label = '';
        index = index;
        while (index >= 0) {
            label = String.fromCharCode((index % 26) + 65) + label;
            index = Math.floor(index / 26) - 1;
        }
        return label;
    }

    binarySearch(value, arr, low = 0, high = arr.length - 1) {
        console.log(value);

        let ogLow = low;
        // // // // // console.log("called for", value, arr, low, high, ogLow);
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (mid == 0 || (arr[mid] >= value && (mid == 0 || arr[mid - 1] < value) && (mid == arr.length - 1 || arr[mid + 1] > value))) {
                return mid == 0 ? mid : mid - 1;
            } else if (arr[mid] > value) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ogLow;
    }
}