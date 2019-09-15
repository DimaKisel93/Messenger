/**
 * Constructor for chat configurations
 * @param config - chat configuration
 * @constructor
 */
function AppConfig (config) {
  this.configurations = config;
}
/**
* Create chat configuration object
* @param config
*/
AppConfig.main = function (config) {
  let chatConfig = new AppConfig(config);
  chatConfig.launch();
};

/** Launch the chat configuration page scripts*/
AppConfig.prototype.launch = function () {
  this.getConfigPage();
  this.addListeners();
};

/**Add configuration to page*/
AppConfig.prototype.getConfigPage = function () {
  document.getElementById('chatTitle').value = this.configurations.chatTitle;
  document.getElementById('botName').value = this.configurations.botName;
  document.getElementById('chatUrl').value = this.configurations.chatUrl;
  document.getElementById('cssClass').value = this.configurations.cssClass;
  document.getElementById('allowMinimize').checked = this.configurations.allowMinimize;
  document.getElementById('allowDrag').checked = this.configurations.allowDrag;
  document.getElementById('showDateTime').checked = this.configurations.showDateTime;
  document.getElementById('requireName').checked = this.configurations.requireName;
  document.getElementById(this.configurations.position).selected = true;
  document.getElementById(this.configurations.network).checked = true;
  this.code = document.getElementById('config__code');
  this.code.innerHTML = this.addCodePage();

};

/**
* Add code page
* @returns {string}
*/
AppConfig.prototype.addCodePage = function () {
  return '<p>chatTitle: ' + this.configurations.chatTitle + '</p>' +
      '<p>botName: ' + this.configurations.botName + '</p>' +
      '<p>chatUrl: ' + this.configurations.chatUrl + '</p>' +
      '<p>cssClass: ' + this.configurations.cssClass + '</p>' +
      '<p>position: ' + this.configurations.position + '</p>' +
      '<p>allowMinimize: ' + this.configurations.allowMinimize + '</p>' +
      '<p>allowDrag: ' + this.configurations.allowDrag + '</p>' +
      '<p>showDateTime: ' + this.configurations.showDateTime + '</p>' +
      '<p>requireName: ' + this.configurations.requireName + '</p>' +
      '<p>network: ' + this.configurations.network + '</p>';
};

/** Add listeners to configuration page element */
AppConfig.prototype.addListeners = function () {
  let that = this;
  let formChatConfig = document.getElementById('config__form');
  formChatConfig.addEventListener('change', function (event) {
      let target = event.target;
      if (target.tagName === 'INPUT' && that.addInputData(target)) {
          that.setDataToConfig();
      } else if (target.tagName === 'SELECT') {
          that.addSelectData(target);
      }
  });
};

/**
* Add input data on the page
* @param target - input element
* @returns {boolean} - return true if configuration was changed
*/
AppConfig.prototype.addInputData = function (target) {
  if (target.type === 'text') {
      this.configurations[target.id] = target.value;
      return true;
  } else if (target.type === 'checkbox') {
      this.configurations[target.id] = target.checked;
      return true;
  } else if (target.type === 'radio') {
      this.configurations[target.name] = target.id;
      return true;
  } else {
      return false;
  }
};

/**
* Add select data on the page
* @param select - select element
*/
AppConfig.prototype.addSelectData = function (select) {
  this.configurations[select.id] = select.options[select.selectedIndex].value;
  this.setDataToConfig();
};

/** Send configuration changes to the object */
AppConfig.prototype.setDataToConfig = function () {
  this.code.innerHTML = this.addCodePage();
  console.log(this.configurations);
  fetch("/config/setConfig",
      {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(this.configurations)
      });
};

/** Get chat configuration, start AppConfig.main */
window.addEventListener('load', function () {
  fetch("/config/getConfig",
      {
          method: "GET",
          headers: {"Content-Type": "application/json"}
      }).then(function (response) {
      return response.json();
  }).then(function (configData) {
      AppConfig.main(configData);
  }).catch(function (e) {
      console.log(e);
      alert('Can\'t load config.json');
  });
});