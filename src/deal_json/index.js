export default {
    // json去重
    uniqueArray(array, key){
        var result = [array[0]];
        for(var i = 1; i < array.length; i++){
          var item = array[i];
          var repeat = false;
          for (var j = 0; j < result.length; j++) {
            if (item[key] == result[j][key]) {
              repeat = true;
              break;
            }
          }
          if (!repeat) {
            result.push(item);
          }
        }
        return result;
    },
    // json删除
    removeArray(array, key){
      for(var i = 0; i < array.length; i++){
      if(array[i].userid == key.userid) 
       return array.splice(i,1) 
      }
    },
    // 模拟jquery的hasClass
    hasClass(ele,cls){
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      
     if(ele.className.match(reg))
      return true;
   
      return false;
    },
    // 模拟jquery的addClass
    addClass(ele,cls){
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      if(!ele.className.match(reg))
              //两类名中间需要使用空格进行隔开
      ele.className += ' ' + cls;
      
      return ele;
    },
    // 模拟jquery的removeClass
    removeClass(ele,cls){
       //两种可能，一种可能是删除最原始的className，一种可能是删除新加的className
       var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
       
           if(ele.className.match(reg)){
              ele.className = ele.className.replace(' ' + cls,'');
             
           } 
       
       return ele;
    }
}    