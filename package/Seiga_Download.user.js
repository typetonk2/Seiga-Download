// Generated by CoffeeScript 1.8.0
(function() {
  'use strict';
  var addLink, addLink_old, download, getFileName, getFileNameSetting, getFileName_old, getImageCreator, getImageCreatorID, getImageCreatorID_old, getImageCreator_old, getImageID, getImageID_old, getImagePageURL, getImageTitle, getImageTitle_old, getImageType, getImageURL, getImageURL_old, url;

  getImagePageURL = function() {
    var tag;
    tag = $('#illust_link');
    if (tag.length > 0) {
      return tag.attr('href');
    } else {
      return null;
    }
  };

  getImageURL = function() {
    var dfd, url;
    dfd = $.Deferred();
    url = getImagePageURL();
    if (url != null) {
      chrome.extension.sendMessage({
        type: 'url',
        url: 'http://seiga.nicovideo.jp' + url
      }, function(response) {
        if (response != null) {
          return dfd.resolve('http://lohas.nicoseiga.jp' + response.image_url);
        } else {
          return dfd.reject();
        }
      });
    } else {
      dfd.reject();
    }
    return dfd.promise();
  };

  getImageType = function(url) {
    var dfd;
    dfd = $.Deferred();
    if (url != null) {
      chrome.extension.sendMessage({
        type: 'filetype',
        url: url
      }, function(response) {
        if (response != null) {
          return dfd.resolve(response.image_type);
        } else {
          return dfd.reject();
        }
      });
    } else {
      dfd.reject();
    }
    return dfd.promise();
  };

  getImageTitle = function() {
    var tag;
    tag = $('h1.title');
    if (tag.length > 0) {
      return tag.text().trim();
    } else {
      return null;
    }
  };

  getImageCreator = function() {
    var tag;
    tag = $('.user_name strong').eq(0);
    if (tag.length > 0) {
      return tag.text();
    } else {
      return null;
    }
  };

  getImageCreatorID = function() {
    var tag;
    tag = $('.user_name a').eq(0);
    if (tag.length > 0) {
      return tag.attr('href').split('/').pop();
    } else {
      return null;
    }
  };

  getImageID = function() {
    return document.URL.replace(/.*?(im\d+).*/, '$1');
  };

  getFileNameSetting = function() {
    var dfd;
    dfd = $.Deferred();
    chrome.extension.sendMessage({
      type: 'filename_setting'
    }, function(response) {
      return dfd.resolve(response);
    });
    return dfd.promise();
  };

  getFileName = function() {
    var creator, creatorID, data, dfd, id, title;
    creator = getImageCreator();
    creatorID = getImageCreatorID();
    title = getImageTitle();
    id = getImageID();
    data = {
      'member-name': creator,
      'member-id': creatorID,
      'title': title,
      'illust-id': id
    };
    if ((creator != null) && creatorID && (title != null) && (id != null)) {
      return getFileNameSetting().pipe(function(filename_setting) {
        return filename_setting.replace(/\?(.+?)\?/g, function(match, group) {
          return data[group];
        });
      });
    } else {
      dfd = $.Deferred();
      return dfd.reject();
    }
  };

  download = function(url, filename) {
    return chrome.extension.sendMessage({
      type: 'download',
      url: url,
      filename: filename
    });
  };

  addLink = function(url_dfd, filename) {
    var a, div, img, main, parent;
    img = $('<img>');
    img.attr('src', chrome.extension.getURL('download.png'));
    img.attr('draggable', false);
    a = $('<a>');
    a.append(img);
    a.attr('href', 'javascript:void(0);');
    main = function() {
      url_dfd.done(function(url) {
        return getImageType(url).done(function(type) {
          return download(url, filename + type);
        });
      });
      return false;
    };
    a.one('click', main);
    div = $('<div>');
    div.attr('id', 'SD');
    div.append(a);
    parent = $('.thum_large').eq(0);
    return parent.prepend(div);
  };

  getFileName().done(function(filename) {
    if (filename != null) {
      return addLink(getImageURL(), filename);
    }
  });

  getImageURL_old = function() {
    var tag;
    tag = $('#illust_main_top a:eq(1)');
    if (tag.length > 0) {
      return 'http://seiga.nicovideo.jp/' + tag.attr('href');
    } else {
      return null;
    }
  };

  getImageTitle_old = function() {
    var tag;
    tag = $('div.title_text');
    if (tag.length > 0) {
      return tag.text().trim();
    } else {
      return null;
    }
  };

  getImageCreator_old = function() {
    var tag;
    tag = $('.illust_user_name strong');
    if (tag.length > 0) {
      return tag.text();
    } else {
      return null;
    }
  };

  getImageCreatorID_old = function() {
    var tag;
    tag = $('.illust_user_name a').eq(0);
    if (tag.length > 0) {
      return tag.attr('href').split('/').pop().split('?')[0];
    } else {
      return null;
    }
  };

  getImageID_old = function() {
    return document.URL.replace(/.*?(im\d+).*/, '$1');
  };

  getFileName_old = function() {
    var creator, creatorID, data, dfd, id, title;
    creator = getImageCreator_old();
    creatorID = getImageCreatorID_old();
    title = getImageTitle_old();
    id = getImageID_old();
    data = {
      'member-name': creator,
      'member-id': creatorID,
      'title': title,
      'illust-id': id
    };
    if ((creator != null) && creatorID && (title != null) && (id != null)) {
      return getFileNameSetting().pipe(function(filename_setting) {
        return filename_setting.replace(/\?(.+?)\?/g, function(match, group) {
          return data[group];
        });
      });
    } else {
      dfd = $.Deferred();
      return dfd.reject();
    }
  };

  addLink_old = function(url, filename) {
    var a, div, img, main, parent;
    img = $('<img>');
    img.attr('src', chrome.extension.getURL('download.png'));
    a = $('<a>');
    a.append(img);
    a.attr('href', 'javascript:void(0);');
    main = function() {
      getImageType(url).done(function(type) {
        return download(url, filename + type);
      });
      return false;
    };
    a.one('click', main);
    div = $('<div>');
    div.attr('id', 'SD');
    div.append(a);
    parent = $('#illust_main_top td td').eq(0);
    return parent.prepend(div);
  };

  url = getImageURL_old();

  getFileName_old().done(function(filename) {
    if ((url != null) && (filename != null)) {
      return addLink_old(url, filename);
    }
  });

}).call(this);
