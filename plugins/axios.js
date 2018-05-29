// import * as axios from 'axios'
import axios from 'axios'
// let options = {}
// // The server-side needs a full url to works
// // console.log(process.server,'111111')
// if (process.server) {
//   // options.baseURL = `http://${process.env.HOST || '172.28.194.29'}:${process.env.PORT || 8030}`
//   options.baseURL = 'http://172.28.195.125/api'
// }
// let options = {}
// options.baseURL = 'http://172.28.195.125/api';

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// export default axios.create(options)
// let apiURL = 'http://172.28.195.125/api/usercenter';
let apiURL = `http://172.28.194.26:8887`;
// if(process.env.NODE_ENV=='test') {
// 	apiURL = 'https://ts.shop.tiancaixing.com/api/usercenter';
// }
// if(process.env.NODE_ENV=='production') {
// 	apiURL = 'https://user.tiancaixing.com/api/usercenter';
// }



let options = {
	// 5分钟超时
	timeout: 300000
}
export default function({error, req, isServer}, inject){
	// let loginOptions = {
	// 	timeout: 300000
	// };

	// loginOptions.baseURL = '';
	// let loginRequest = axios.create(loginOptions);

	let proxyHost = `${apiURL}`;

	let proxyOptions = Object.assign({});

	// proxyOptions.baseURL = `${process.server ? proxyHost : 'http://172.28.194.29:8030/proxy'}`;
	proxyOptions.baseURL = proxyHost;
	let proxyRequest = axios.create(proxyOptions);
	proxyRequest.defaults.withCredentials = true;
	// 请求回调拦截，得到data
	proxyRequest.interceptors.response.use(function (res) {
		let data = res.data;
		if (data.code!=30100&& data.code!=30104) {
          return Promise.reject(new Error(data.code));
        }
        if (data.code == 30104) {
          location.href="/login"
          return;
        }
        return data.result;
	},function(error){
		return Promise.reject(new Error(error));
	});
	inject('axios', proxyRequest);
	// inject('login', loginRequest);
}
