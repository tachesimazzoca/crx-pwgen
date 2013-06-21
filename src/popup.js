document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("jsGenerateButton").onclick = function() {
    var target = document.getElementById("jsTargetInput").value;
    var secret = document.getElementById("jsMasterPasswordInput").value;
    var passwd = App.PasswordGenerator.generate("MD5", target, secret).toBase64(8);
    document.getElementById("jsGeneratedPasswordInput").value = passwd;
  };

  var App = {};

  App.PasswordGenerator = {};
  App.PasswordGenerator.generate = function(algorithm, target, secret) {
    return new App.ByteArray.initWithHexString(App.Hasher[algorithm](target, secret));
  };

  App.ByteArray = function(b) {
    this.bytes = b || [];
  };
  App.ByteArray.initWithHexString = function(hexStr) {
    var obj = new App.ByteArray();
    obj.bytes = [];
    var len = hexStr.length / 2;
    if (len % 2 !== 0) { return ""; }
    for (var i = 0; i < len; i++) {
      var byteStr = hexStr.substr(i * 2, 2);
      var uc = 0;
      for (var j = 0; j < 2; j++) {
        var bc = byteStr.charCodeAt(1 - j);
        if (bc >= 48 && bc <= 57) {
          bc -= 48;
        } else if (bc >= 97 && bc <= 102) {
          bc -= 87;
        } else {
          return "";
        }
        if (j > 0) {
          uc += bc * (j * 0x10);
        } else {
          uc += bc;
        }
        uc &= 0xff;
      }
      obj.bytes.push(String.fromCharCode(uc));
    }
    return obj;
  };
  App.ByteArray.prototype = {
    toBase64: function(len) { return btoa(this.bytes.join("")).substr(0, len); }
  };

  App.Hasher = {};
  App.Hasher.MD5 = function(target, secret) {
      return CryptoJS.MD5("" + secret + target).toString(CryptoJS.enc.Hex);
  };
});
