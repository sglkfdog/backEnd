import Qs from 'qs'
import axios from 'axios';
import {store} from '@/core/store';
import { AxiosCanceler } from "./axiosCanceler"
import { ElNotification, ElMessageBox } from 'element-plus'

const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_API_TAG = import.meta.env.VITE_API_TAG;
console.log("VITE_API_URL=", VITE_API_URL)
console.log("VITE_API_TAG=", VITE_API_TAG)
// 设置全局的请求次数 - 全局超时重新请求
axios.defaults.retry = 4
const http = axios.create({
  withCredentials: false, // 不允许携带cookie
  timeout: 1000 * 60, // 设置接口超时时间
  // timeout: 0, // 禁用超时
  // timeout: 120000, // 设置超时时间为2分钟
  baseURL: VITE_API_TAG,
  headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type': 'application/json'
  }
});


const canceler = new AxiosCanceler()

/**
 * 
- A. 前端向后端传输数据时，如果是get传输，直接传在url后；如果是post传输，则在请求体body中传输。
在body中的数据格式又有两种，一种是  json  数据格式，另一种是 字符串。具体要用哪种格式取决于后端入参的格式。
如果后端接收json数据类型，post 的 headers 需要设置 { ‘content-type’: ’application/json’ }，传给后端的数据就形如  { ‘name’:’edward’, ‘age’:’25’ } 
如果后端接收的是（表单）字符串类型，post 的 headers 需设置  { ‘content-type’: ’application/x-www-form-urlencoded’ }，
，传输给后端的数据就形如   ‘name=edward&age=25’ 
- B. qs.stringfy() 将对象序列化成URL的形式
axios默认数据格式为json,所以：
1.当后端需要接收json格式的数据时,post请求头不需要设置请求头，数据格式也不需要我们去转换(若数据已经是json)；
2.当后端需要接收字符串格式的数据时，我们需要给post请求头设置{ ‘content-type’: ’application/x-www-form-urlencoded’ }，
这个时候如果我们传的入参是一个 js 对象，这时候我们就需要用 qs 转换数据格式，qs具体用法如下：
安装模块：npm  i  qs  -S
- C. 【区分】： JSON.stringfy()  和 qs.stringfy() 
let  data = { name: 'edward', age: '25' }
前者：JSON.stringfy(data)  //  ”{ 'name' : 'edward' , 'age' : '25' }”
后者：qs.stringfy(data)  // 'name=edward&age=25'
*/

//http request 拦截器
http.interceptors.request.use(

  config => {
    // let custom = config?.custom ? config.custom : ''
    // let noNeedToken = custom?.noNeedToken ? custom.noNeedToken : false
    // let token = noNeedToken ? ''  : store.state.base.token
    console.log("http-request-1=", config.data)
    // let _data = config.data
    // console.log("_data=", _data, Qs.stringify(_data))
    // x-www-form-urlencoded格式的数据就像get请求一样需要拼接到url里面的
    // if (Qs.stringify(config.data)) {
    //   config.data = Qs.stringify(config.data)
    // }
    let custom = config?.custom ?? {}
    // 默认设置ignoreCancel=false，代表不忽视请求中断设置即需要设置请求中断
    let { ignoreToken, ignoreCancel } = custom
    console.log("http-custom=", custom)
    console.log("http-VITE_API_URL=", VITE_API_URL)
    console.log("http-ignoreToken=", ignoreToken, ignoreCancel)
    // let token = store.state.base.token
    let token = store.state.userStore.token
    // 配置请求头 Authorization
    // config.headers['poc-token'] = token 
    !ignoreToken && token ? config.headers['Authorization'] = 'Bearer ' + token : ''
    console.log("config=", config)
    !ignoreCancel && canceler.addPending(config)

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// http.post('/admin/role/save', _params)
// http.get('/admin/role/del', { params: _params })
//http response 拦截器
http.interceptors.response.use(
  async response => {
    response && canceler.removePending(response.config)
    console.log("response-2=", response)
    let data = response.data
    let result = response.data
    let code = data.code
    // switch (code) {
    //   case 200:
    //     result = data.data
    //     return Promise.resolve(result)
    //     break;
    
    //   default:
    //     break;
    // }
    if (result.code == 200) {
      return Promise.resolve(result.data)
      // return Promise.resolve(result.data);
      // return data.data;
    } else {
      // return data.data;
      // return showNormalMessage(data, data.code, data.msg);
      ElNotification({
        message: result.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject("error")
    }
    // return data;
    console.log("result=", result)
    // return Promise.resolve(result)
  },
  async error => {
    console.log("response-error=", error)
    const {response} = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      // showMessage(response.status);          
      let code = response.status
      switch (code) {
        case 100003:
          // Token过期或Token无效则清除
          store.dispatch("userStore/action_resetState")
          store.dispatch("permissionStore/action_resetState")
          break;
      
        default:
          break;
      }
      console.log("response.status=", response.status)
    } else {
      console.log('网络连接异常,请稍后再试!');
      // noticeToast('网络连接异常,请稍后再试!');
    }
    return Promise.reject(error);
  }
);

export default http