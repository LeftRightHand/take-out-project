import axios from 'axios'

export function getGoodsList() {
  const url = '/api/goods';
  return axios.get(url, {}).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getSeller() {
  const url = '/api/seller';
  return axios.get(url, {}).then((res)=>{
    return Promise.resolve(res.data)
  })
}
