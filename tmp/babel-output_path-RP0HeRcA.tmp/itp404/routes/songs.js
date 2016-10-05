define('itp404/routes/songs', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Route.extend({
        model: function model() {
            return $.ajax({
                url: 'http://itp-api.herokuapp.com/songs'
            }).then(function (json) {
                return json.songs;
            });
        }
    });
});