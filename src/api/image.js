// 素材请求模块

import request from '@/utils/request'

// 上传图片素材
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 上传文件的接口要求把请求头中的Content-Type 设置为 multipart/form-data
    // 使用axios上传文件不需要手动设置, 只需要给data FormDate
    data
  })
}

// 获取图片素材
export const getImage = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

// 收藏图片素材
export const collectImage = (ImageId, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${ImageId}`,
    data: {
      collect
    }
  })
}

// 删除素材
export const deleteImage = ImageId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${ImageId}`
  })
}
