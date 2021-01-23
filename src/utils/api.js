const baseurl = "http://10.31.162.37:2000/api";
//城市选择
const getCities = ()=>{
  return fetch(`${baseurl}/cities`).then(res=>res.json()).then(response=>response)
}

//首页列表
//传入对象{cityId:1,areaId:1,price:'123,200',sort:1}
const getRentList = (param)=>{
  let defaultValue = {
    cityId:1,
    areaId:"",
    price:"",
    sort:1
  }
  Object.assign(defaultValue, param)
  return fetch(`${baseurl}/renting/list?cityId=${defaultValue.cityId}&areaId=${defaultValue.areaId}&price=${defaultValue.price}&sort=${defaultValue.sort}`).then(res=>res.json()).then(response=>response)
}

//区域选择列表
const getAreaList = (cityId)=>{
  if(!cityId){
    throw new Error("Missing required parameters cityId");
  }else return fetch(`${baseurl}/area/list?cityId=${cityId}`).then(res=>res.json()).then(response=>response)
}

//详情页数据
const getDetail = (cityId,roomId)=>{
  return fetch(`${baseurl}/detail/info?cityId=${cityId}&roomId=${roomId}`).then(res=>res.json()).then(response=>response)

}

export {getCities,getRentList,getAreaList,getDetail}
