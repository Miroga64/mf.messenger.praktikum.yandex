const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
};


export function queryStringify(data) {
    let str = '?';
    if(typeof(data) == 'object'){
        for(let field in data){
            if(data.hasOwnProperty(field)){
                str = str + `${field}=${data[field]}&`
            }
        } 
    }
    str = str.slice(0, -1)
    return str;
}


export class HTTPTransport {
    get = (url, options: any = {}) => {	 
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };
    post = (url, options: any = {}) => {	 
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };
    put = (url, options: any = {}) => {	 
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };
    delete = (url, options: any = {}) => {	 
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };
    get_cookie = (url, options: any = {}) => {	 
      return this.request_cookie(url, {...options, method: METHODS.GET}, options.timeout);
    };
    post_cookie = (url, options: any = {}) => {	 
        return this.request_cookie(url, {...options, method: METHODS.POST}, options.timeout);
    };
    put_cookie = (url, options: any = {}) => {	 
        return this.request_cookie(url, {...options, method: METHODS.PUT}, options.timeout);
    };
    delete_cookie = (url, options: any = {}) => {	 
        return this.request_cookie(url, {...options, method: METHODS.DELETE}, options.timeout);
    };
    get_formdata = (url, options: any = {}) => {	 
      return this.request_formdata(url, {...options, method: METHODS.GET}, options.timeout);
    };
    post_formdata = (url, options: any = {}) => {	 
        return this.request_formdata(url, {...options, method: METHODS.POST}, options.timeout);
    };
    put_formdata = (url, options: any = {}) => {	 
        return this.request_formdata(url, {...options, method: METHODS.PUT}, options.timeout);
    };
    delete_formdata = (url, options: any = {}) => {	 
        return this.request_formdata(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request = (url, options, timeout = 5000) => {
      
      return new Promise((resolve, reject) => {
        
        let {headers = {}, data, method} = options;
        let xhr = new XMLHttpRequest();
        

        xhr.timeout = timeout;
        
        url = (method === METHODS.GET && !!data) ? `${url}${queryStringify(data)}`: url;
        
        xhr.open(method, url);
        
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
        
        xhr.onload = function() {
          resolve(xhr);
        };
        
        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.ontimeout = reject;
        
      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        data = JSON.stringify(data)
        xhr.send(data);
      }
    })
  };
  request_cookie = (url, options, timeout = 5000) => {
      
    return new Promise((resolve, reject) => {
      
      let {headers = {}, data, method} = options;
      let xhr = new XMLHttpRequest();
      
      xhr.withCredentials = true;

      xhr.timeout = timeout;
      
      url = (method === METHODS.GET && !!data) ? `${url}${queryStringify(data)}`: url;
      
      xhr.open(method, url);
      
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
      
      xhr.onload = function() {
        resolve(xhr);
      };
      
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      
      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        console.log(typeof data)
        data = JSON.stringify(data)
        xhr.send(data);
      }
    })
  };
  request_formdata = (url, options, timeout = 5000) =>{
    return new Promise((resolve, reject) => {
      
      let {headers = {}, data, method} = options;
      let xhr = new XMLHttpRequest();
      
      xhr.withCredentials = true;

      xhr.timeout = timeout;
      
      url = (method === METHODS.GET && !!data) ? `${url}${queryStringify(data)}`: url;
      
      xhr.open(method, url);
      
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
      
      xhr.onload = function() {
        resolve(xhr);
      };
      
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      
      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    })
  }
}

// export function fetchWithRetry(url, options: any) {
//   let count = 0;
//   const repeat = () => {
//     if(options.retries > 1 && options.retries > count ){
//       count += 1;
//       return new HTTPTransport(url, options).then(xhr => new Response(xhr.response)).catch(repeat)
//     }
//   }
//     return new HTTPTransport(url, options).then(xhr => new Response(xhr.response)).catch(repeat)
// }

