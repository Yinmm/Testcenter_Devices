const isPro = Object.is(process.env.NODE_ENV, 'production')
 
//console.log(isPro);
 
module.exports = {
  baseUrl: isPro ? 'http://10.0.10.246:8091' : 'http://10.0.12.165:8091'  //'http://10.0.12.165:8091' 
}