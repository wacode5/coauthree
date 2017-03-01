HTMLWidgets.widget({

  name: 'coauthree',

  type: 'output',

  factory: function(el, width, height) {
    coauthree.start()

    return {

      renderValue: function(x) {

        console.log(x.message);

      },

      resize: function(width, height) {
        return
      }

    };
  }
});
