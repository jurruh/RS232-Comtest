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
        });
    }

    $scope.send = function() {
        $scope.port.write($scope.message + '\r', function(err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written');
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