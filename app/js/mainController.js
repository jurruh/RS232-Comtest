app.controller('mainController', function($scope) {
    $scope.ports = [];
    $scope.port = {};
    $scope.portname = "";
    $scope.baudRate = 19200;

    $scope.connect = function() {
        $scope.port = new SerialPort($scope.currentCom, {
          baudRate : $scope.baudRate
        });
        $scope.recieved = "";

        $scope.port.on('open', function() {
          $scope.writeLog("Connected to: " + $scope.currentCom);
          $scope.$apply();

        });

        // open errors will be emitted as an error event
        $scope.port.on('error', function(err) {
            console.log('Error: ', err.message);
        })

        $scope.port.on('data', function(data) {
            $scope.recieved += data;
            $scope.$apply();
            document.getElementById("recievedField").scrollTop = document.getElementById("recievedField").scrollHeight
        });
    }

    $scope.writeLog = function(str){
        $scope.recieved += str + "\r";
        $scope.$apply();
    }

    $scope.refresh = function(){
      SerialPort.list($scope.initPorts);
    }

    $scope.send = function() {
        $scope.port.write($scope.message + '\r', function(err) {
            if (err) {
                $scope.writeLog("Error on write " + err);
            }
        });
    };

    $scope.init = function() {
      $scope.refresh();
    }

    $scope.initPorts = function(err, ports) {
        $scope.ports = ports;

        $scope.$apply();
    }

    $scope.init();
});
