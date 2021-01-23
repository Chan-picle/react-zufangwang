const storage = {
  //设置localStorage 有过期时间
  set(key,value){
    let temp = JSON.stringify({...value,overdue:Date.now() + 1*24*60*60*1000});
    localStorage.setItem(key,temp);
  },
  //取localSrorage 比较是否过期，过期删除并返回 false
  get(key){
    //如果没有,返回null JSON.parse(null) = null
    let temp = JSON.parse(localStorage.getItem(key));
    //存在且没有过期 则返回数据
    if(temp && temp.overdue > Date.now()){
      return temp;
    }else{
      return false;
    }
  }
}

export default storage;