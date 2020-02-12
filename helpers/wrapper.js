const response =  {
    wrapper_success : (res, code, message, data) => {
      let respon = {
        'code': code,
        'success': 'true',
        'message': message,
        'data': data
      }
      return res.send(respon);
    },
  
    wrapper_error : (res, code, message) => {
      let respon = {
        'code': code,
        'success': 'false',
        'message': message
      }
      return res.send(respon);
    }
  }
  
  module.exports = response;
