app.config([
	"$locationProvider", '$httpProvider', function ($locationProvider, $httpProvider) {
	    $locationProvider.html5Mode(true);
	}
]);

app.config([
	'usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
	    usSpinnerConfigProvider.setDefaults({ lines: 11, length: 30, width: 10, radius: 30, color: '#0071b3', position: 'fixed' });
	}
]);