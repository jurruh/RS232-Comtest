app.controller('mainController', function($scope) {
    $scope.ports = [];
    $scope.port = {};
    $scope.portname = "sdf";

    $scope.connect = function() {
        console.log($scope.currentCom);
        $scope.port = new SerialPort($scope.currentCom);
        $scope.recieved = "";

        $scope.port.on('open', function() {
          $scope.recieved += "Connected to: " + $scope.currentCom + "\r";
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

    $scope.send = function() {
        $scope.port.write($scope.message + '\r', function(err) {
            if (err) {
                $scope.recieved += 'Error on write: ' + err.message + "\n";
            }
        });
    };


    $scope.init = function() {
        SerialPort.list($scope.initPorts);
    }

    $scope.initPorts = function(err, ports) {
        $scope.ports = ports;

        $scope.$apply();


        console.log(ports);
    }

    $scope.init();
});
