
import request from '../utils/request'

/**
 * 发送验证码
 */
export const getCode = (data) =>{
    return request.post('/get/code', data)
}

/**
 * 注册用户 -- 验证码验证
 */
export const userAuthentication = (data) =>{
    return request.post('/user/authentication', data)
}

/**
 * 登录
 */
export const login = (data) =>{
    console.log(data);
    
    return request.post('/login', data)
} 

/**
 * 权限管理api
 */
export const authAdmin = (params) =>{
    return request.get('/auth/admin', {params})
}