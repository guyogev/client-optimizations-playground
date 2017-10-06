const randomString = (length) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

const timeConsumingTask = (arr) => {
  arr.forEach((item, i) => {
    arr[i] = randomString(56);
  });
};

onmessage = (e) => {
  console.log('Message received from main script', e.data);
  timeConsumingTask(arr);
  postMessage('done');
}