function factorial(num) {
  arr = Array(num + 1);

  arr[0] = [0];
  arr[1] = [1];

  for (let i = 2; i < num; i++) {
    // console.log(i + " " + arr[i-1]);
    resarr = multiplyAndStore(arr[i - 1], i);
    arr[i] = resarr;
    console.log(resarr.length);
  }
}

function multiplyAndStore(prevarr, n) {
  lon = n.toString().length;
  oglon = lon;
  // prevarrdub = prevarr;
  // console.log(lon + " " + prevarr);
  arr2d = [];
  while (lon-- > 0) {
    mul = n % 100000;
    n = Math.floor(n / 100000);
    arr = [];
    c = 0;
    for (i = 0; i < oglon - lon - 1; i++) {
      arr.push(0);
    }
    // console.log(arr.toString());
    // console.log(n + " " + mul + prevarr);

    for (let i = prevarr.length - 1; i >= 0; i--) {
      o = (prevarr[i] * mul + c) % 100000;
      c = Math.floor((prevarr[i] * mul + c) / 100000);
      arr.push(o);
    }

    if (c > 0) {
      arr.push(c);
    }

    arr2d.push(arr);
    maxl = arr.length;
    // prevarr = prevarrdub;
  }
  // console.log(arr2d.toString());

  c = 0;

  res = [];

  for (i = 0; i < maxl; i++) {
    sum = c;
    for (j = 0; j < arr2d.length; j++) {
      if (arr2d[j].length > i) {
        sum = sum + arr2d[j][i];
      }
    }
    c = Math.floor(sum / 100000);
    res.push(sum % 100000);
  }
  while (c > 0) {
    res.push(c % 100000);
    c = Math.floor(c / 100000);
  }

  return res.reverse();
}

function factorial2(num) {
  farr = Array(num + 1);
  farr[0] = [0];
  farr[1] = [1];

  for (var i = 2; i <= num; i++) {
    c = 0;
    res = [];
    // console.log(farr[i - 1]);
    for (var j = farr[i - 1].length - 1; j >= 0; j--) {
      product = farr[i - 1][j] * i + c;
      // if(product)
      o = product % 100000;
      c = Math.floor(product / 100000);

      res.unshift(o);
    }
    while (c > 0) {
      res.unshift(c % 100000);
      c = Math.floor(c / 100000);
    }
    farr[i] = res;
  }
  str = "";
  for (var j = 0; j < farr[num].length; j++) {
    i = farr[num][j];
    l = i.toString().length;
    if (j > 0 && l < 5) {
      while (++l <= 5) {
        str = str.concat("0");
      }
    }
    str = str.concat(i.toString());
  }

  console.log(str);
}

factorial2(1000);
