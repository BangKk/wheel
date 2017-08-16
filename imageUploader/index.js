(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.imageUploader = factory());
}(this, (function(){'use strict';
  function imageUploader(config) {
    this.defaultConf = {
      element: '',
      uploadBtn: '',
      url: '',
      type: ''
    };
    var baseConf = Object.assign({}, this.defaultConf, config);

    this.domRef = {
      input: document.querySelector(baseConf.element),
      uploadBtn: document.querySelector(baseConf.uploadBtn),
      imgWrap: document.querySelector('.imgWrapPreview'),
      box: document.querySelector('#box')
    }
    if (!baseConf.element || typeof baseConf.element === 'undefined') {
      console.error('option element should be defined');
      return;
    }
    // 所选图片数组
    var filesArr = [];

    this.init = function(){

      this.bindEvent();
    }

    this.bindEvent = function() {
      var _this = this;
      this.domRef.input.addEventListener('change',function(e) {
        var files = Array.prototype.slice.call(e.target.files);
        files = checkImgType(files);
        filesArr = filesArr.concat(files);

        for (var i = 0; i< files.length; i++){
          readAsURl(files[i], _this.domRef.imgWrap);
        }
      })
      this.domRef.uploadBtn.addEventListener('click',function() {
        var files = filesArr;
        if (files.length === 0) {
          alert('请先选择图片~');
          return false;
        }
        var formdata= new FormData();
        for (var i = 0; i < files.length; i++) {
          formdata.append('files', files[i]);
        }
        fetch(baseConf.url, {
          method: 'post',
          body: formdata
        }).then(function(data){
          return data.json();
        }).then(function(data){
          if (data.success === 'ok') {
            baseConf.success(data);
          }
        })
      })
      this.domRef.box.addEventListener('dragover',function(e){
        e.preventDefault()
        _this.domRef.box.classList.add('dragover');
      }, false)

      this.domRef.box.addEventListener('dragleave',function(e){
        e.preventDefault()
        _this.domRef.box.classList.remove('dragover');
      }, false)

      this.domRef.box.addEventListener('drop', function(e){
        e.preventDefault()
        var files = e.dataTransfer.files;
        _this.domRef.box.classList.remove('dragover');

        files = Array.prototype.slice.call(files);
        files = checkImgType(files);
        filesArr = filesArr.concat(files);

        for (var i = 0; i< files.length; i++){
          readAsURl(files[i], _this.domRef.imgWrap);
        }

      }, false)
    }

    function checkImgType(files) {
      var Reg = baseConf.type.toLowerCase();
      if (Reg) {
        files = files.filter(function(item) {
          var type = item.type.split('/')[1];
          Reg.indexOf(type) < 0 ? alert('图片 ' + item.name + '不符合图片类型，已过滤') : null;
          return Reg.indexOf(type) > -1;
        })
      }
      return files;
    }
    function readAsURl(file, imgWrap){
      var _this = this;
      var reader = new FileReader();
      reader.onload = function(e) {
        var imgItem = document.createElement('div');
        imgItem.classList.add('imgItem');
        var delImg = document.createElement('span');
        delImg.classList.add('delImg');
        delImg.dataset.fileId = file.name + '_' + file.size;
        delImg.innerHTML = '&#10006;';
        delImg.addEventListener('click',function(e) {
          filesArr = filesArr.filter(function(item) {
            return item.name + '_' + item.size !== delImg.dataset.fileId;
          });
          e.target.parentNode.remove();
        })
        var img = document.createElement('img');
        img.src = e.target.result;
        imgItem.appendChild(img);
        imgItem.appendChild(delImg);
        imgWrap.appendChild(imgItem);
      }
      reader.readAsDataURL(file);
    }

    this.init();
  }
  return imageUploader;
})));
