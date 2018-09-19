package com.cloudfy.controller.pay;

import java.util.Map;
import java.util.Random;
import java.util.SortedMap;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cloudfy.controller.common.tools.StringUtil;
import com.cloudfy.controller.common.tools.XMLUtil;
import com.cloudfy.model.common.PaymentPo;
import com.cloudfy.service.common.Constants;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * [功能说明]：微信小程序支付接口
 * 
 * @author wanchanghuang
 * @date 2018年9月18日9:57:03
 * 
 * */
@RestController
@RequestMapping("pay")
public class WeChatPayController {

	private static Logger log = Logger.getLogger(WeChatPayController.class);

	/**
	 * [功能说明]：获取openId
	 *   1.通过微信小程序登录Code，得到 openId
	 *   2.封装一些列参数，统一下单
	 *   3.得到返回集合，又封装返回前端
	 *   4.前端调用返回的参数，直接调用微信支付
	 * @author wanchanghuang
	 * @date 2018年9月18日14:20:29
	 * */
	@RequestMapping(value = "/prePay", method = RequestMethod.POST)
	public String prePay(@RequestBody PaymentPo param, ModelMap model,HttpServletRequest request) {
		//1.获取URL请求结果
		String url = "https://api.weixin.qq.com/sns/jscode2session?appid="+ Constants.APP_ID + "&secret=" + Constants.APP_SECRET+ "&js_code=" + param.getCode() + "&grant_type=authorization_code";
		String urlRet=StringUtil.httpRequest(url, "POST", null);//{"session_key":"0RemMIxyHZPP11++PducGg==","openid":"o4wxs5fdf4zHBWGnlfNHAKOkRUpY"}
		log.error(urlRet);
        //2.解析返回值，获得openID
		JsonParser jp = new JsonParser();
        JsonObject jo = jp.parse(urlRet).getAsJsonObject();//将json字符串转化成json对象
        String openid = jo.get("openid").getAsString();//获取openId对应的值
        log.error(openid);
		//3.定义参数
		int fee =param.getAllPrice()*100;//得到价钱（自定义）,将总价(元)*100=分 
		String goodsid=param.getGoodSid();//得到商品的ID（自定义）
		String title = param.getTitle();//订单标题（自定义）
		String times = System.currentTimeMillis() + "";//时间戳
		Random random = new Random();
		String did = times+random.nextInt(1000);//订单编号（自定义 这里以时间戳+随机数）
		//4.封装
		SortedMap<Object, Object> packageParams = new TreeMap<Object, Object>();
		packageParams.put("appid",  Constants.APP_ID);//微信小程序ID
		packageParams.put("mch_id", Constants.MCH_ID);//商户ID
		packageParams.put("nonce_str", times);//随机字符串（32位以内） 这里使用时间戳
		packageParams.put("body", title);//支付主体名称 自定义
		packageParams.put("out_trade_no", did+goodsid);//编号 自定义以时间戳+随机数+商品ID
		packageParams.put("total_fee", fee);//价格 自定义
		//packageParams.put("spbill_create_ip", remoteAddr);//这里之前加了ip，但是总是获取sign失败，原因不明，之后就注释掉了
		packageParams.put("notify_url", Constants.URL_NOTIFY);//支付返回地址要外网访问的到， localhost不行，调用下面buy方法。（订单存入数据库）
		packageParams.put("trade_type", "JSAPI");//这个api有，固定的
		packageParams.put("openid", openid);//用户的openid 可以要 可以不要
		String sign = StringUtil.createSign("UTF-8", packageParams, Constants.APP_KEY);//最后这个是自己在微信商户设置的32位密钥
		packageParams.put("sign", sign);//获取sign签名
		log.error(sign);
		//6.将封装转成XML
		String requestXML = StringUtil.getRequestXml(packageParams);
		log.error(requestXML);
		//7.统一下单请求
		String resXml = StringUtil.httpRequest(Constants.URL_UNIFIED_ORDER, "POST", requestXML);
		try {
			//8.将返回json字符串转换成 map
			Map map = XMLUtil.doXMLParse(resXml);
			log.error(map);
			//得到prepay_id
			String prepay_id = (String) map.get("prepay_id");
			SortedMap<Object, Object> packageP = new TreeMap<Object, Object>();
			packageP.put("appId", Constants.APP_ID);//！！！注意，这里是appId,上面是appid
			packageP.put("nonceStr", times);//时间戳
			packageP.put("package", "prepay_id=" + prepay_id);//必须把package写成 "prepay_id="+prepay_id这种形式
			packageP.put("signType", "MD5");//paySign加密
			packageP.put("timeStamp", (System.currentTimeMillis() / 1000) + "");
			//得到paySign
			String paySign = StringUtil.createSign("UTF-8", packageP, Constants.APP_KEY);
			packageP.put("paySign", paySign);
			//将packageP数据返回给小程序
			Gson gson = new Gson();
			String json = gson.toJson(packageP);
			return json;
		} catch (Exception e) {
			log.error("ERROR:微信支付异常");
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 功能说明：微信支付回调，异步
	 * 
	 * */
	@RequestMapping(value = "/buyOrder", method = RequestMethod.POST)
	public void buyOrder(@RequestBody String param, ModelMap model,HttpServletRequest request) {
		log.error("支付回调"+param);
	}
	
}
