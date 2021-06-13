console.log('Hello')
console.log(ROSLIB)

var ros = new ROSLIB.Ros({
     url : 'wss://localhost:9090'
     });
   
var fibonacciClient = new ROSLIB.ActionClient({
       ros : ros,
       serverName : '/fibonacci',
       actionName : 'actionlib_tutorials/FibonacciAction'
    });
   
var goal = new ROSLIB.Goal({
      actionClient : fibonacciClient,
      goalMessage : {
         order : 7
       }
    });
   
goal.on('result', function(result) {
       console.log('Result: ' + result.sequence);
    });
   
ros.on('connection', function() {
       console.log('Connected to websocket server.');
    });
   
ros.on('error', function(error) {
       console.log('Error connecting to websocket server: ', error);
    });
   
ros.on('close', function() {
       console.log('Connection to websocket server closed.');
    });
   
goal.send();