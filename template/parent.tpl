<!DOCTYPE html>
<html>
  <head>
    <title>
    {%block title%}{%endblock%}  人人贷 - 中国最大最安全的P2P网络投资理财、网络贷款平台
    </title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="content-type" content="text/html" charset="utf-8">
    <meta name="google-site-verification" content="oQXrGa_mTgxg7joO0himE0QuFeqOVmm-SDC1H2dzT4c">
    <meta name="keywords" content="人人贷|网络理财|个人理财|投资理财|P2P理财|互联网金融|投资理财|债权转让|理财计划|优选计划|网络贷款|工薪贷|生意贷|网商贷|网贷|小额贷款" />
    <meta name="description" content="人人贷(www.renrendai.com)是目前中国互联网金融中P2P信贷行业中最大、最安全的平台，为投资理财用户和贷款用户两端提供公平、透明、安全、高效的互联网金融服务。投资理财用户可以通过人人贷平台进行投标、加入优选理财计划、购买债权等方式进行投资获得高收益；贷款用户可以通过平台申请工薪贷、生意贷、网商贷等小额贷款。" />
    <script src="/static/js/seajs/2.1.0/sea.js"></script>
    <script src="/static/js/config.js"></script>
    {%block script%}{%endblock%}
    <link rel="stylesheet" href="/static/css/one.css">
    <!--[if lt IE 9]>
    <link rel="stylesheet" type="text/css" href="/static/css/ie8-and-lower.css" />
    <![endif]-->
    <!--[if lt IE 7]>
    <link rel="stylesheet" type="text/css" href="/static/css/ie6-and-lower.css" />
    <![endif]-->
    {%block link%}{%endblock%}
  </head>
  <body>
    <div class="pg-container  ">
      <div class="ui-header" id="header">
        <div class="ui-header-top ">
          <div class="container_12 fn-clear">
            <div class="grid_12 fn-clear">
              <div class="ui-nav fn-right">
                <a class="ui-nav-item fn-left" href="/">首页</a>
                <a class="ui-nav-item fn-left" href="/event/app.action" target="_blank"><i class="icon icon-app mr5"></i>移动客户端</a>
                <a class="ui-nav-item fn-left" href="/account/index.action">我的人人贷</a>
                
                <a class="ui-nav-item fn-left" href="/help/index.action" target="_blank">帮助</a>
                <a class="ui-nav-item fn-left" href="http://bbs.renrendai.com" target="_blank">论坛</a>
              </div>
            </div>
          </div>
        </div>
        <div class="ui-header-main">
          <div class="container_12 fn-clear">
            <div class="grid_2 ui-header-grid">
              <a class="ui-header-logo fn-left" href="/"></a>
            </div>
            <div class="grid_7 ui-header-grid">
              <div class="fn-hide no-nav-text"></div>
              <ul class="ui-nav ">
                <li class="ui-nav-item ui-nav-item-x">
                  <a class="ui-nav-item-link rrd-dimgray" href="/lend/index.action">
                    <span>我要理财</span>
                    <span class="arrow-down"></span>
                  </a>
                  <ul class="ui-nav-dropdown ui-nav-dropdown-invest" style="display: none;">
                    <li class="ui-nav-dropdown-angle"><span></span></li>
                    
                    <li class="ui-nav-dropdown-item"><a class="rrd-dimgray" href="/financeplan/listPlan.action">优选理财计划</a></li>
                    <li class="ui-nav-dropdown-item"><a class="rrd-dimgray" href="/lend/loanList.action">散标投资列表</a></li>
                    <li class="ui-nav-dropdown-item"><a class="rrd-dimgray" href="/transfer/transferList.action">债权转让列表</a></li>
                  </ul>
                </li>
                <li class="ui-nav-item ui-nav-item-x">
                  <a class="ui-nav-item-link rrd-dimgray" href="/borrow/index.action">
                    <span>我要借款</span>
                    <span class="arrow-down"></span>
                  </a>
                  <ul class="ui-nav-dropdown ui-nav-dropdown-borrow" style="display: none;">
                    <li class="ui-nav-dropdown-angle"><span></span></li>
                    <li class="ui-nav-dropdown-item"><a class="rrd-dimgray" href="/borrow/prodWork.action">工薪贷</a></li>
                    <li class="ui-nav-dropdown-item"><a class="rrd-dimgray" href="/borrow/prodBiz.action">生意贷</a></li>
                    <li class="ui-nav-dropdown-item"><a class="rrd-dimgray" href="/borrow/prodEcomm.action">网商贷</a></li>
                  </ul>
                </li>
                <li class="ui-nav-item">
                  <a class="ui-nav-item-link rrd-dimgray" href="/guide/invest.action">新手指引</a>
                </li>
                <li class="ui-nav-item ui-nav-item-x">
                  <a class="ui-nav-item-link rrd-dimgray" href="/about/about.action?flag=intro">
                    <span>关于我们</span>
                    <span class="arrow-down"></span>
                  </a>
                  <ul class="ui-nav-dropdown ui-nav-dropdown-invest" style="display: none;">
                    <li class="ui-nav-dropdown-angle"><span></span></li>
                    <li class="ui-nav-dropdown-item"><a class="rrd-dimgray" href="/about/about.action?flag=team">管理团队</a></li>
                    <li class="ui-nav-dropdown-item"><a class="rrd-dimgray" href="/about/about.action?flag=news">最新动态</a></li>
                    <li class="ui-nav-dropdown-item"><a class="rrd-dimgray" href="/about/about.action?flag=invite">招贤纳士</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="grid_3 ui-header-grid">
              <ul class="ui-nav fn-right  ">
                
                
                <li class="ui-nav-item ">
                  <a class="ui-nav-item-link reg-link" href="/regPage.action">注册</a>
                </li>
                <li class="ui-nav-item ">
                  <a class="ui-nav-item-link gray login-link" href="/loginPage.action">登录</a>
                </li>
                
              </ul>
              <!--
              <ul class="ui-nav fn-right fn-hide">
                <li class="ui-nav-item">
                  <a class="ui-nav-item-link login-link" href="/loginPage.action">登录</a>
                </li>
              </ul>
              <ul class="ui-nav fn-right fn-hide">
                <li class="ui-nav-item">
                  <a class="ui-nav-item-link reg-link" href="/regPage.action">注册</a>
                </li>
              </ul>
              -->
            </div>
          </div>
        </div>
        
        
        <div id="header-helper" style="display: none;">
          <span id="header-helper-authenticated">
          
          false
          </span>
        </div>
      </div>
      <script>
      seajs.use(['components/components'], function(Components) {
      new Components.Header().init();
      });
      </script>
      <div class="pg-container-content">
        {%block content%}
        {%endblock%}
      </div>
      
      <div class="ui-footer" id="footer">
        <div class="container_12">
          <div class="grid_12">
            <div class="ui-footer-section ui-footer-narrow-hide fn-clear">
              <h4 class="color-gray-text text-big fn-left w85">友情链接</h4>
              <ul class="ui-footer-links fn-left w850">
                <li class="fn-left">
                  <a class="gray" target="_blank" href="http://credit.hc360.com/dk_index/hc_dk.html">慧聪金融</a>
                </li>
                <li class="fn-left">
                  <a class="gray" target="_blank" href="http://www.enfodesk.com/">易观智库</a>
                </li>
                <li class="fn-left">
                  <a class="gray" target="_blank" href="http://www.haodai.com/">好贷网</a>
                </li>
                <li class="fn-left">
                  <a class="gray" target="_blank" href="http://www.yinhang.com/">银率网</a>
                </li>
                <li class="fn-left">
                  <a class="gray" target="_blank" href="http://bank.hexun.com/">和讯银行</a>
                </li>
                <li class="fn-left">
                  <a class="gray" target="_blank" href="http://www.gome.com.cn/">国美在线</a>
                </li>
                <li class="fn-left">
                  <a class="gray" target="_blank" href="http://www.cjdao.com/index.jsp">财经道</a>
                </li>
                <li class="fn-left">
                  <a class="gray" target="_blank" href="http://www.siilu.com/">电商服务</a>
                </li>
                <li class="fn-left">
                  <a class="gray" target="_blank" href="http://www.shopex.cn/">ShopEx</a>
                </li>
                <li class="fn-left">
                  <a class="gray" target="_blank" href="http://bj.58.com/danbaobaoxiantouzi/">58投资担保</a>
                </li>
                <li class="fn-left">
                  <a class="gray" target="_blank" href="http://www.wangdaizhijia.com/">网贷之家</a>
                </li>
                <li class="fn-left">
                  <a class="gray" target="_blank" href="http://bbs.wacai.com">挖财社区</a>
                </li>
                <li class="fn-left">
                  <a class="gray" target="_blank" href="http://www.feidee.com/money/">随手记</a>
                </li>
                <li class="fn-left">
                  <a class="gray" target="_blank" href="http://www.rong360.com/licai/">融360理财</a>
                </li>
              </ul>
            </div>
            <div class="ui-footer-section ui-footer-narrow-hide fn-clear">
              <div class="ui-footer-links grid_9 alpha">
                <ul class="fn-clear">
                  <li class="fn-left">
                    <a class="gray" target="_blank" href="/about/about.action?flag=intro">公司介绍</a>
                  </li>
                  <li class="fn-left">
                    <a class="gray" target="_blank" href="/guide/investSecurity.action">安全保障</a>
                  </li>
                  <li class="fn-left">
                    <a class="gray" target="_blank" href="/about/about.action?flag=report">媒体报道</a>
                  </li>
                  <li class="fn-left">
                    <a class="gray" target="_blank" href="/about/about.action?flag=responsibility">社会责任</a>
                  </li>
                  <li class="fn-left">
                    <a class="gray" target="_blank" href="/about/about.action?flag=invite">招贤纳士</a>
                  </li>
                  <li class="fn-left">
                    <a class="gray" target="_blank" href="/sitemap.action">网站地图</a>
                  </li>
                  <li class="fn-left">
                    <a class="gray" target="_blank" href="/help/index.action">帮助中心</a>
                  </li>
                  <li class="fn-left">
                    <a class="gray" target="_blank" href="/about/about.action?flag=contact">联系我们</a>
                  </li>
                </ul>
                <ul class="fn-clear icons">
                  <li class="fn-left">
                    <h4 class="color-gray-text text-big">客户服务</h4>
                  </li>
                  <li class="fn-left"><a class="ui-footer-img-link weibo" target="_blank" href="http://e.weibo.com/renrendai?ref=http%3A%2F%2Fwww.renrendai.com%2F">人人贷新浪微博</a></li>
                  <li class="fn-left"><a class="ui-footer-img-link qq-weibo" target="_blank" href="http://t.qq.com/renrendai">人人贷腾讯微博</a></li>
                  <li class="fn-left"><a class="ui-footer-img-link we-chat" tabindex="-1" href="#">人人贷微信</a></li>
                  <li class="fn-left"><a class="ui-footer-img-link online-customer-service cursor-pointer" target="_blank" onclick="javascript:window.open('http://b.qq.com/webc.htm?new=0&sid=4000278080&eid=218808P8z8p8R8y8q8y8Q&o=www.renrendai.com&q=7&ref='+document.location, '_blank', 'height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');">人人贷在线客服</a></li>
                </ul>
              </div>
              <div class="grid_3 omega">
                <p class="color-gray-text text-right">客服电话</p>
                <h4 class="color-gray-text text-right ui-footer-phone-number">400-027-8080</h4>
                <p class="color-gray-text text-right">9:00 - 21:00</p>
              </div>
            </div>
            <div class="ui-footer-section last">
              <div class="ui-footer-copyright">
                <span class="ui-footer-contact-link color-gray-text">© 2014 人人贷 All rights reserved</span>
                <span class="ui-footer-contact-link color-gray-text has-separator">人人贷商务顾问(北京)有限公司</span>
                <span class="ui-footer-contact-link color-gray-text has-separator last"><a class="gray" target="_blank" href="/icp/icp.html">京ICP证 100953号</a></span>
              </div>
              <div class="ui-footer-verification ui-footer-narrow-hide fn-clear">
                <a class="ui-footer-verification-item fn-left credibility" title="人人贷荣获中国电子商务协会“诚信网站”认证殊荣" href="https://search.szfw.org/cert/l/CX20140315003612003651" target="_blank"></a>
                <a class="ui-footer-verification-item fn-left trust" title="人人贷已通过中网权威数据库对比，获得“可信网站”身份验证，您可放心使用。" href="https://ss.knet.cn/verifyseal.dll?sn=e13042311010040288j4wq000000&ct=df&a=1&pa=931969" target="_blank"></a>
                <a class="ui-footer-verification-item fn-left itrust" title="人人贷已经成为中国互联网信用评价中心网络诚信联盟成员，并且完成企业信用评级 " href="http://www.itrust.org.cn/yz/pjwx.asp?wm=2554879344" target="_blank"></a>
                <a class="ui-footer-verification-item fn-left norton" title="人人贷已引入VeriSign SSL加密技术，您的隐私及个人资料安全已受最高级别的保护。" href="https://trustsealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=www.renrendai.com&lang=zh_cn" target="_blank"></a>
                <a class="ui-footer-verification-item fn-left police" title="人人贷已经完成在公安机关的信息备案，您可了解网站相关备案信息。" href="http://gawa.bjchy.gov.cn/websearch/" target="_blank"></a>
                <a class="ui-footer-verification-item fn-left gongshang" title="人人贷已经完成在北京市工商局网站备案，您可了解网站相关备案信息。" href="http://www.hd315.gov.cn/beian/view.asp?bianhao=010202013052900002" target="_blank"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fn-hide">
        <div id="weixin-content" class="p20 text-center">
          <img src="/static/img/weixin_l.jpg?rrdversion=20140414" />
          <p>微信“发现”扫一扫，人人贷里动态全知道！</p>
        </div>
      </div>
      <script>
      seajs.use(['components/components'], function(Components) {
      new Components.Footer().init();
      });
      </script>
      <div id="pg-server-message" data-status="" data-message="" style="display: none;"></div>
    </div>
    
    <script id="dialog-message" type="text/x-handlebars-template">
    <div class="ui-message-content">
      <div class="fn-clear">
        <div class="ui-message-icon fn-left">
          {{# if info }}
          <i class="iconfont fn-left info" title="提示">&#xF046;</i>
          {{/ if }}
          {{# if success }}
          <i class="iconfont fn-left success" title="成功">&#xF049;</i>
          {{/ if }}
          {{# if warning }}
          <i class="iconfont fn-left warning" title="警告">&#xF047;</i>
          {{/ if }}
          {{# if error }}
          <i class="iconfont fn-left error" title="错误">&#xF045;</i>
          {{/ if }}
        </div>
        <div class="ui-message-text fn-left">
          {{# if title }}
          <h3>{{ title }}</h3>
          {{/ if }}
          <p class="text-big">{{{ message }}}</p>
          {{# if link }}
          <p><a href="{{ link }}">{{ linkText }}</a></p>
          {{/ if }}
        </div>
      </div>
      <div class="ui-message-operation text-center mt20">
        <a class="ui-button ui-button-blue ui-button-mid ui-message-close-button" {{# if button }}href="{{ button.link }}"{{/ if }}>{{# if button }}{{ button.text }}{{ else }}关闭{{/ if }}</a>
      </div>
    </div>
    </script>
    <script>seajs.use(['page']);</script>
    {%block after%}
    {%endblock%}
    
    <textarea style="display:none" id="J_stat_js_1">
    var _agt=_agt||[];
    _agt.push(['_atscu','AG_148085_IKDD']);
    _agt.push(['_atsdomain','renrendai.com']);
    (function(){
    var ag=document.createElement('script');
    ag.type='text/javascript';
    ag.async = true;
    ag.src=(document.location.protocol=='https:'?'https':'http')+'://'+'t.agrantsem.com/js/ag.js';
    var s=document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ag,s);})();
    </textarea>
    <script type='text/javascript'>
    /*window.onload= function(){
    var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    var bduidArr = ['71ce3105a964d0c3748e04584e5af0b9','efa929f55e0b175f5657fd1d1d809be6','2547238860b5ae69d69cae60a725236c','b7b6d41754885a6ae7f79431068d7b57'];
    
    for(i = 0; i<bduidArr.length; i++){
    var scriptbd = document.createElement("script");
    scriptbd.type = "text/javascript";
    scriptbd.async = true;
    scriptbd.src = _bdhmProtocol +"hm.baidu.com/h.js?"+bduidArr[i];
    document.body.appendChild(scriptbd);
    }
    
    for(i = 1; i<=1; i++){
    var sid = 'J_stat_js_'+i.toString();
    var element = document.getElementById(sid);
    var scrObj = document.createElement("script");
    scrObj.type = "text/javascript";
    scrObj.async = true;
    scrObj.text = element.innerHTML;
    document.body.appendChild(scrObj);
    element.parentNode.removeChild(element);
    }
    };*/
    </script>
  </body>
</html>