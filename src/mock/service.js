const User = {
    code:1,
    msg:'',
    success:true,
    content:{"id":3,"openid":"oTZ3_wkgO7hodywCyjGkT09lvasw","city":"郑州","province":"河南","groupid":0,"subscribe":0,"subscribe_time":"1510296881","nickname":"刘江涛","sex":1,"headimgurl":"http://wx.qlogo.cn/mmopen/2wj7fGt8n7v9Ve3ib05CVhiaasWQWkwDOhMMSicfjlSNsEeia5kichstQoKfOuMjviccNmfkjJG2gDFQX7YYHb1SYn06O20yMu9g8w/0","mobile":"15617769662","level":0,"balance":106,"bp":0}
}


export default [
    {
        url:/^\/member\/addMenber/,
        data: User
    },
    {
        url:/^\/member\/updateMobile/,
        data:User
    },
    {
        url:/^\/member\/getMemberInfoByCode/,
        data:User
    },
    {
        url:/^\/member\/sendSMS/,
        data:{
            msg:'',
            success:true,
            content:''
        }
    },
    {
        url:/^\/member\/updateInfo/,
        data: User
    },
    {
        url:/^\/member\/selectPayLog/,
        data:{"success":true,"content":[{"id":36,"memberId":3,"orderNo":"201712119753843026","amount":1,"statu":1,"createTime":1512976829000},{"id":36,"memberId":3,"orderNo":"201712119753843026","amount":1,"statu":1,"createTime":1512976829000},{"id":36,"memberId":3,"orderNo":"201712119753843026","amount":1,"statu":1,"createTime":1512976829000},{"id":36,"memberId":3,"orderNo":"201712119753843026","amount":1,"statu":1,"createTime":1512976829000},{"id":36,"memberId":3,"orderNo":"201712119753843026","amount":1,"statu":1,"createTime":1512976829000},{"id":23,"memberId":3,"orderNo":"201712081019685181","amount":1,"statu":1,"createTime":1512714645000},{"id":21,"memberId":3,"orderNo":"201712087559701573","amount":1,"statu":1,"createTime":1512713267000},{"id":20,"memberId":3,"orderNo":"201712084543746228","amount":1,"statu":1,"createTime":1512712622000},{"id":19,"memberId":3,"orderNo":"201712081992869376","amount":1,"statu":1,"createTime":1512711684000},{"id":18,"memberId":3,"orderNo":"201712077533281571","amount":1,"statu":1,"createTime":1512642597000},{"id":22,"memberId":3,"orderNo":"201712089111711250","amount":100,"statu":1,"createTime":1509516690000}],"msg":"成功","code":0}
    },
    {
        url:/^\/member\/prePay/,
        data:{retCode:'000000',trans_response:{paymentURL:'http://www.baidu.com'}}
    },
    {
        url:/^\/member\/getSignature/,
        data:{}
    }
]