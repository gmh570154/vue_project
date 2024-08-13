/**
 * 全局配置文件
 */
export default {
  title: "saber",
  indexTitle: 'Saber Admin',
  clientId: 'saber', // 客户端id
  clientSecret: 'saber_secret', // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  tokenTime: 6000,
  //http的status默认放行不才用统一处理的,
  statusWhiteList: [],
 
}
