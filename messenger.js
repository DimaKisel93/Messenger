window.addEventListener('load', function () {
  Messenger.main();
});

function Messenger(config) {

}

Messenger.main = function () {
  let mes = new Messenger();
  mes.launch();
};

Messenger.prototype.launch = function (){
  this.generate();
  this.addListeners();
};

Messenger.prototype.generate = function (){
  let msg = document.createElement('div');
  msg.className = 'msg';
  let msgForm = document.createElement('form');
  msgForm.className = 'msg__form';
  msg.append(msgForm);

  this.msgWrap = document.createElement('div');
  this.msgWrap.className = 'msg__wrap';
  this.msgWrap.style.display = 'none';
  msgForm.append(this.msgWrap);

  this.msgSkipBtn = document.createElement('button');
  this.msgSkipBtn.className = 'msg__skipBtn';
  this.msgSkipBtn.innerHTML = '[]';
  msgForm.append(this.msgSkipBtn);

  this.msgInputChat = document.createElement('div');
  this.msgInputChat.className = 'msg__inputChat';
  this.msgInputChat.style.display = 'none';

  this.msgTextArea = document.createElement('textarea');
  this.msgTextArea.className = 'msg__textArea';
  this.msgTextArea.setAttribute("cols", 65);
  this.msgTextArea.setAttribute("rows", 7);

  this.msgSendBtn = document.createElement('button');
  this.msgSendBtn.className = 'msg__sendBtn';
  this.msgSendBtn.innerHTML = 'Send';

  this.msgInputChat.append(this.msgTextArea);
  this.msgInputChat.append(this.msgSendBtn);
  msgForm.append(this.msgInputChat)
  document.body.append(msg);
}

Messenger.prototype.addListeners = function () {
  let that = this;
  this.msgSkipBtn.addEventListener('click', event => {
      event.preventDefault();
      this.slideMsg();
  });
  this.msgSendBtn.addEventListener('click', event => {
      event.preventDefault();
      let textAreaValue = this.msgTextArea.value;
      that.sendMessage(textAreaValue);
      setTimeout(function () {
          that.sendMessage(' Bot: request on \"' + textAreaValue.toUpperCase() + '\"')
      },1000);
      this.msgTextArea.value = '';
  });
};

Messenger.prototype.slideMsg = function () {
  if (this.msgWrap.style.display === 'none') {
      this.msgWrap.style.display = 'flex';
      this.msgInputChat.style.display = 'flex';
      this.msgSkipBtn.innerHTML = '–';
  } else {
      this.msgWrap.style.display = 'none';
      this.msgInputMsg.style.display = 'none';
      this.msgSkipBtn.innerHTML = '[]';
  }
};

Messenger.prototype.sendMessage = function (textAreaValue) {
  this.message = document.createElement('p');
  let date = new Date();
  this.message.innerHTML = date.getHours() + ":" + date.getMinutes() + ' ' + textAreaValue;
  this.msgWrap.prepend(this.message);
};
