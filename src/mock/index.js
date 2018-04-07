import Mock from 'mockjs';
import service from './service'

service.map(item => {
  Mock.mock(item.url,item.data)
})