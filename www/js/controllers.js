angular.module('starter.controllers', [])
    .controller('IssueCtrl', function ($scope, $cordovaBarcodeScanner, $cordovaToast) {
        $scope.form = {
            project: ' ',
            umbrella: ' ',
            part: ' ',
            summary: ' ',
            type: ' '
        };

        $scope.ISSUE_TYPES = [
            {'id': 'mechanical', 'title': 'Mechanical'},
            {'id': 'electrical', 'title': 'Electrical'},
            {'id': 'hydraulic', 'title': 'Hydraulic'},
            {'id': 'water-misting', 'title': 'Water-Misting'}
        ];

        $scope.result = 'Debug info: ...';

        $scope.scanJson = function () {
            $cordovaBarcodeScanner.scan().then(processBarcodeJsonResult, processBarcodeError);
        };

        $scope.scanText = function () {
            $cordovaBarcodeScanner.scan().then(processBarcodeResult, processBarcodeError);
        };

        $scope.toast = function () {
            $cordovaToast.show('toast', 'long', 'center');
        };

        function processBarcodeResult(result){
            $scope.form.part = result.text;
        }

        function processBarcodeError(result){
            $scope.result = 'Barcode error' + JSON.stringify(result);
        }

        function processBarcodeJsonResult(result){
            try {
                var json = JSON.parse(result.text);
                $scope.form.project = json.project;
                $scope.form.umbrella = json.umbrella;
            } catch (e){
                var m = 'Err: [' + result.text + '] ' + e.message;
                $cordovaToast.show('Can not read info from barcode. Try again.', 'long', 'center');
            }
        }
    })

    .controller('DashCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
