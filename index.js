requestObj={
	get: function (url, headers) {
		var _xhr = new XMLHttpRequest();
		_xhr.open('GET', url);
		if(headers){
      for(let h_key in headers){
        _xhr.setRequestHeader(h_key, headers.h_key);
      }
    }
    _xhr.send(null);

    return {
     done : function(callback){
      _xhr.onload=function(e){
        var result = JSON.parse(e.srcElement.response);
        callback(result);
      }
    }
  };
},

post: function (url, data, headers) {
  var _xhr = new XMLHttpRequest();
  _xhr.open('POST', url);
  if(headers){
    for(let h_key in headers){
      _xhr.setRequestHeader(h_key, headers.h_key);
    }
  }
  _xhr.send(JSON.stringify(data));

  return {
    done : function(callback){
      _xhr.onload=function(e){
        var result = JSON.parse(e.srcElement.response);
        callback(result);
      }
    }
  };
},

put: function (url, headers) {
  var _xhr = new XMLHttpRequest();
  _xhr.open('PUT', url);
  if(headers){
    for(let h_key in headers){
      _xhr.setRequestHeader(h_key, headers.h_key);
    }
  }
  _xhr.send(null);

  return {
    done : function(callback){
      _xhr.onload=function(e){
        var result = JSON.parse(e.srcElement.response);
        callback(result);
      }
    }
  };
},

head: function (url, headers) {
  var _xhr = new XMLHttpRequest();
  _xhr.open('HEAD', url);
  if(headers){
    for(let h_key in headers){
      _xhr.setRequestHeader(h_key, headers.h_key);
    }
  }
  _xhr.send(null);

  return {
    done : function(callback){
      _xhr.onload=function(e){
        var result = JSON.parse(e.srcElement.response);
        callback(result);
      }
    }
  };
}

}

requestObj.get('https://api.github.com/users/dmytroroik/repos', {'Accept-Language': 'ua'}).done(function(result){
  var repos=[];
  for(var el of result){
    var repo={};
    console.log(el)
    repo.id=el.id;
    repo.name=el.name;
    repo.createdAt=el.created_at;
    repo.owner=el.owner.login;
    repo.language=el.language;
    repo.url=el.html_url;
    repos.push(repo);
  }
  showReposInList(repos);
});
function showReposInList (data) {
  var $list=document.getElementsByClassName('repoList')[0];
  var header=$list.children[0];
  $list.innerHTML='';
  $list.append(header);

  if(!data)return;
  for(var i=0;i<data.length;i++){

    var $li=document.createElement('li'),
    $listIndex=document.createElement('span'),
    $repoName=document.createElement('span'),
    $created_at=document.createElement('span'),
    $owner=document.createElement('span');
    $position=document.createElement('span');
    $lang=document.createElement('span');
    $repoUrl=document.createElement('a');

    $listIndex.classList.add('repoItem');
    $repoName.classList.add('repoItem');
    $created_at.classList.add('repoItem');
    $owner.classList.add('repoItem');
    $lang.classList.add('repoItem');
    $repoUrl.classList.add('repoItem');

    $listIndex.innerText=i+1;
    $repoName.innerText=data[i].name;
    $created_at.innerText=data[i].createdAt;
    $owner.innerText=data[i].owner;
    $lang.innerText=data[i].language;
    $repoUrl.href=data[i].url;
    $repoUrl.innerText=data[i].url;
    $repoUrl.target='blank';

    $li.append($listIndex,$repoName,$created_at,$owner,$lang,$repoUrl);

    $list.append($li);
  }
}
