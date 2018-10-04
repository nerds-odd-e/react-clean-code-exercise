export default class Promise  {
  static resolve(value){
    let promise = new Promise()
    promise.success = true
    promise.value = value
    return promise
  }
  static reject(value){
    let promise = new Promise()
    promise.success = false
    promise.value = value
    return promise
  }
  then(success, failure){
    let result = this.success ? success(this.value) : failure(this.value);
    if (result instanceof Promise){
      return result.success ? Promise.resolve(result.value) : Promise.reject(result.value)
    } else {
      return Promise.resolve(result)
    }
  }
  catch(callback){
    callback()
    return new Promise()
  }
}
