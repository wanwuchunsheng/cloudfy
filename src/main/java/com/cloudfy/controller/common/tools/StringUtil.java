package com.cloudfy.controller.common.tools;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.SortedMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;

/**
 * 字符串工具类 <li>@author Leejean <li>@create 2014-6-24 下午04:13:19
 */
public class StringUtil {

	/**
	 * 获取字符串img src路径
	 * 
	 * */
	public static Set<String> getImgStr(String htmlStr) {
		Set<String> pics = new HashSet<>();
		String img = "";
		Pattern p_image;
		Matcher m_image;
		// String regEx_img = "<img.*src=(.*?)[^>]*?>"; //图片链接地址
		String regEx_img = "<img.*src\\s*=\\s*(.*?)[^>]*?>";
		p_image = Pattern.compile(regEx_img, Pattern.CASE_INSENSITIVE);
		m_image = p_image.matcher(htmlStr);
		while (m_image.find()) {
			// 得到<img />数据
			img = m_image.group();
			// 匹配<img>中的src数据
			// http://zhangt.java.cdnjsp.org/images/editor/a7248cd8-c8ff-466b-838a-00d5ff31c28f.jpeg
			Matcher m = Pattern.compile("src\\s*=\\s*\"?(.*?)(\"|>|\\s+)")
					.matcher(img);
			while (m.find()) {
				pics.add(m.group(1));
			}
		}
		return pics;
	}

	/**
	 * 生成随机数当作getItemID n ： 需要的长度
	 * 
	 * @return
	 */
	public static String getItemId(int n) {
		String val = "";
		Random random = new Random();
		for (int i = 0; i < n; i++) {
			String str = random.nextInt(2) % 2 == 0 ? "num" : "char";
			if ("char".equalsIgnoreCase(str)) { // 产生字母
				int nextInt = random.nextInt(2) % 2 == 0 ? 65 : 97;
				// System.out.println(nextInt + "!!!!"); 1,0,1,1,1,0,0
				val += (char) (nextInt + random.nextInt(26));
			} else if ("num".equalsIgnoreCase(str)) { // 产生数字
				val += String.valueOf(random.nextInt(10));
			}
		}
		return val;
	}
	
	/**
	 * 【功能说明】：获取客户端的IP
	 * 
	 * */
	public static String getClientIp(HttpServletRequest request) {
	        String ip = request.getHeader("X-Forwarded-For");
	        if(StringUtils.isNotEmpty(ip) && !"unKnown".equalsIgnoreCase(ip)){
	            //多次反向代理后会有多个ip值，第一个ip才是真实ip
	            int index = ip.indexOf(",");
	            if(index != -1){
	                return ip.substring(0,index);
	            }else{
	                return ip;
	            }
	        }
	        ip = request.getHeader("X-Real-IP");
	        if(StringUtils.isNotEmpty(ip) && !"unKnown".equalsIgnoreCase(ip)){
	            return ip;
	        }
	        return request.getRemoteAddr();
	 }
	
	

	/**
	 * 获取随机字符串 (采用截取8位当前日期数 + 4位随机整数)
	 * 
	 * @return
	 */
	public static String getNonceStr() {
		// 获得当前日期
		Date now = new Date();
		SimpleDateFormat outFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		String currTime = outFormat.format(now);
		// 截取8位
		String strTime = currTime.substring(8, currTime.length());
		// 得到4位随机整数
		int num = 1;
		double random = Math.random();
		if (random < 0.1) {
			random = random + 0.1;
		}
		for (int i = 0; i < 4; i++) {
			num = num * 10;
		}
		num = (int) random * num;
		return strTime + num;
	}
	
	
	/** 
	 * 是否签名正确,规则是:按参数名称a-z排序,遇到空值的参数不参加签名。 
	 * @return boolean 
	 */  
	public static boolean isTenpaySign(String characterEncoding, SortedMap<Object, Object> packageParams, String API_KEY) {  
		StringBuffer sb = new StringBuffer();  
		Set es = packageParams.entrySet();  
		Iterator it = es.iterator();  
		while(it.hasNext()) {  
			Map.Entry entry = (Map.Entry)it.next();  
			String k = (String)entry.getKey();  
			String v = (String)entry.getValue();  
			if(!"sign".equals(k) && null != v && !"".equals(v)) {  
				sb.append(k + "=" + v + "&");  
			}  
		}  
 
		sb.append("key=" + API_KEY);  
 
		//算出摘要  
		String mysign = MD5.MD5Encode(sb.toString(), characterEncoding).toLowerCase();  
		String tenpaySign = ((String)packageParams.get("sign")).toLowerCase();  
 
		//System.out.println(tenpaySign + "    " + mysign);  
		return tenpaySign.equals(mysign);  
	}  
 
	/** 
	 * @author 
	 * @Description：sign签名 
	 * @param characterEncoding 
	 *            编码格式 
	 * @param parameters 
	 *            请求参数 
	 * @return 
	 */  
	public static String createSign(String characterEncoding, SortedMap<Object, Object> packageParams, String API_KEY) {  
		StringBuffer sb = new StringBuffer();  
		Set es = packageParams.entrySet();  
		Iterator it = es.iterator();  
		while (it.hasNext()) {  
			Map.Entry entry = (Map.Entry) it.next();  
			String k = entry.getKey().toString();  
			String v = entry.getValue().toString();  
			if (null != v && !"".equals(v) && !"sign".equals(k) && !"key".equals(k)) {  
				sb.append(k + "=" + v + "&");  
			}  
		}  
		sb.append("key=" + API_KEY);  
		String sign = MD5.MD5Encode(sb.toString(), characterEncoding).toUpperCase();  
		return sign;  
	}  
	public static String createLinkString(Map<String, String> params) {     
		List<String> keys = new ArrayList<String>(params.keySet());     
		Collections.sort(keys);     
		String prestr = "";     
		for (int i = 0; i < keys.size(); i++) {     
			String key = keys.get(i);     
			String value = params.get(key);     
			if (i == keys.size() - 1) {// 拼接时，不包括最后一个&字符     
				prestr = prestr + key + "=" + value;     
			} else {     
				prestr = prestr + key + "=" + value + "&";     
			}     
		}     
		return prestr;     
	}     
	/** 
	 * @author 
	 * @Description：将请求参数转换为xml格式的string 
	 * @param parameters 
	 *            请求参数 
	 * @return 
	 */  
	public static String getRequestXml(SortedMap<Object, Object> parameters) {  
		StringBuffer sb = new StringBuffer();  
		sb.append("<xml>");  
		Set es = parameters.entrySet();  
		Iterator it = es.iterator();  
		while (it.hasNext()) {  
			Map.Entry entry = (Map.Entry) it.next();  
			String k = entry.getKey().toString();  
			String v = entry.getValue().toString();   
			if ("attach".equalsIgnoreCase(k) || "body".equalsIgnoreCase(k) || "sign".equalsIgnoreCase(k)) {  
				sb.append("<" + k + ">"  + v + "</" + k + ">");  
			} else {  
				sb.append("<" + k + ">" + v + "</" + k + ">");  
			}  
		}  
		sb.append("</xml>");  
		return sb.toString();  
	}  
 
	/** 
	 * 取出一个指定长度大小的随机正整数. 
	 *  
	 * @param length 
	 *            int 设定所取出随机数的长度。length小于11 
	 * @return int 返回生成的随机数。 
	 */  
	public static int buildRandom(int length) {  
		int num = 1;  
		double random = Math.random();  
		if (random < 0.1) {  
			random = random + 0.1;  
		}  
		for (int i = 0; i < length; i++) {  
			num = num * 10;  
		}  
		return (int) ((random * num));  
	}  
 
	
	public static boolean verify(String text, String sign, String key, String input_charset) {
		text = text + key;     
		String mysign =MD5.MD5Encode(text, input_charset).toUpperCase();  
		System.out.println(mysign);	System.out.println(mysign);	System.out.println(mysign);	System.out.println(mysign);
		if (mysign.equals(sign)) {     
			return true;     
		} else {     
			return false;     
		}     
	}  


	/**
	 * 元转换成分
	 * 
	 * @param money
	 * @return
	 */
	public static String getMoney(String amount) {
		if (amount == null) {
			return "";
		}
		// 金额转化为分为单位
		String currency = amount.replaceAll("\\$|\\￥|\\,", ""); // 处理包含, ￥
																// 或者$的金额
		int index = currency.indexOf(".");
		int length = currency.length();
		Long amLong = 0l;
		if (index == -1) {
			amLong = Long.valueOf(currency + "00");
		} else if (length - index >= 3) {
			amLong = Long.valueOf((currency.substring(0, index + 3)).replace(
					".", ""));
		} else if (length - index == 2) {
			amLong = Long.valueOf((currency.substring(0, index + 2)).replace(
					".", "") + 0);
		} else {
			amLong = Long.valueOf((currency.substring(0, index + 1)).replace(
					".", "") + "00");
		}
		return amLong.toString();
	}

	

	/**
	 * 
	 * @param requestUrl请求地址
	 * @param requestMethod请求方法
	 * @param outputStr参数
	 */
	public static String httpRequest(String requestUrl, String requestMethod,
			String outputStr) {
		// 创建SSLContext
		StringBuffer buffer = null;
		InputStream is =null;
		InputStreamReader isr=null;
		try {
			URL url = new URL(requestUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod(requestMethod);
			conn.setDoOutput(true);
			conn.setDoInput(true);
			conn.connect();
			// 往服务器端写内容
			if (null != outputStr) {
				OutputStream os = conn.getOutputStream();
				os.write(outputStr.getBytes("utf-8"));
				os.close();
			}
			// 读取服务器端返回的内容
			is = conn.getInputStream();
			isr = new InputStreamReader(is, "utf-8");
			BufferedReader br = new BufferedReader(isr);
			buffer = new StringBuffer();
			String line = null;
			while ((line = br.readLine()) != null) {
				buffer.append(line);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			try {
				if (isr != null) {
                    isr.close();
                }
                if (is != null) {
                    is.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
		}
		return buffer.toString();
	}
	
	
}
