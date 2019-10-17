/**
 * @name : 框架后台界面主文件
 */
var larryTab;
layui.define(['jquery', 'configure', 'larryTab','form'], function(exports) {
  var $ = layui.$,
    configure = layui.configure,
    layer = layui.layer,
    laytpl = layui.laytpl,
    larryms = layui.larryms,
    common = layui.common,
    form = layui.form,
    $win = $(window),
    $body = $('body'),
    $larrymsElemBox = $('#larry_layout'),
    Themestyles = configure.basePath + 'lib/templets/style/theme.css',
    ThemeUrl = 'lib/templets/theme';
  larryTab = layui.larryTab({
    tab_elem: '#larry_tab',
    tabSession: false,
    autoRefresh: false,
    tabMax: 30,
    spreadOne: true
    //,isPageEffect:configure.animations //去掉此处注释可以让全局配置文件控制动画生效
  });
  var _initialize = function() {
    if (layui.data('larryms').topMenuSet === undefined) {
      layui.data('larryms', {
        key: 'topMenuSet',
        value: true
      });
    }
    //菜单初始化
    larryTab.menuSet({
      type: 'GET',
      //url: layui.cache.menusUrl,
      url: '/system/menus/init/list',
      data: layui.cache.menuData,
      left_menu: '#larryms_left_menu',
      leftFilter: 'LarrySide',
      // top_menu: configure.topMenuSet !== false ? '#larryms_top_menu' : false //让全局配置文件优先
      top_menu: layui.data('larryms').topMenuSet !== false ? '#larryms_top_menu' : false
    });
    larryTab.menu();
    var tabCaches = layui.data('larryms').systemSet === undefined ? false : layui.data('larryms').systemSet.tabCache;
    if (tabCaches) {
      larryTab.session(function(session) {
        if (session.getItem('tabMenu')) {
          $('#larry_tab_title li.layui-this').trigger('click');
        }
      });
    }

  };
  //主框架菜单Tab相关操作
  if (window.top == window.self) {
    _initialize();
  }

  //主页框架
  $('#larryms_version').text(larryms.version);
  // 菜单折叠
  $('#menufold').on('click', function() {
    if ($('#larry_layout').hasClass('larryms-fold')) {
      $('#larry_layout').addClass('larryms-unfold').removeClass('larryms-fold');
      $(this).children('i').addClass('larry-fold7').removeClass('larry-unfold');
    } else {
      $('#larry_layout').addClass('larryms-fold').removeClass('larryms-unfold');
      $(this).children('i').addClass('larry-unfold').removeClass('larry-fold7');
    }
  });

  // 主题设置
  $('#larryTheme').on('click', function() {
    if ($('#larrymsThemes').length > 0) {
      return false;
    }
    var index = layer.open({
      type: 1,
      id: 'larry_theme_R',
      title: false,
      anim: Math.ceil(Math.random() * 6),
      offset: 'r',
      closeBtn: false,
      shade: 0.2,
      shadeClose: true,
      skin: 'layui-anim layui-anim-rl larryms-layer-right',
      area: '320px',
      success: function(layero, index) {
        layui.link(Themestyles);
        larryms.htmlRender(ThemeUrl, layero);
      },
    });
  });

  var MainFrame = function() {
    this.themeColor = {
      defaults: {
        topColor: '#1b8fe6',
        topThis: '#1958A6',
        topBottom: '#01AAED',
        leftColor: '#2f3a4f',
        leftRight: '#258ED8',
        navThis: '#1492DD',
        titBottom: '#1E9FFF',
        footColor: '#245c87',
        name: 'defaults'
      },
      deepBlue: {
        topColor: '#1b8fe6',
        topThis: '#1958A6',
        topBottom: '#01AAED',
        leftColor: '#2f3a4f',
        leftRight: '#258ED8',
        navThis: '#1492DD',
        titBottom: '#1E9FFF',
        footColor: '#245c87',
        name: 'deepBlue'
      },
      green: {
        topColor: '#2a877b',
        topThis: '#5FB878',
        topBottom: '#50A66F',
        leftColor: '#343742',
        leftRight: '#50A66F',
        navThis: '#56a66c',
        titBottom: '#50A66F',
        footColor: '#3e4e63',
        name: 'green'
      },
      navy: {
        topColor: '#2f4056',
        topThis: '#0d51a9',
        topBottom: '#01AAED',
        leftColor: '#393d49',
        leftRight: '#1E9FFF',
        navThis: '#1E9FFF',
        titBottom: '#01AAED',
        footColor: '#343742',
        name: 'navy'
      },
      orange: {
        topColor: '#F39C34',
        topThis: '#CD7013',
        topBottom: '#FF5722',
        leftColor: '#1d1f26',
        leftRight: '#FFB800',
        navThis: '#df7700',
        titBottom: '#FFB800',
        footColor: '#f2f2f2',
        footFont: '#666',
        name: 'orange'
      }
    }

  };

  MainFrame.prototype.theme = function(options) {
    var id = 'Larryms_theme_style',
      style = document.createElement('style'),
      local = layui.data('larryms'),
      styleText = laytpl([
        // 框架主题颜色配置
        '.layui-header{background-color:{{d.topColor}} !important;border-bottom:3px solid {{d.topBottom}};}',
        '.larryms-extend{border-left:1px solid {{d.topThis}} }',
        '.larryms-nav-bar{background-color:{{d.topBottom}} !important;}',
        '.larryms-extend .larryms-nav li.larryms-this{background:{{d.topThis}} !important; }',
        '.larryms-extend .larryms-nav li.larryms-nav-item:hover{background:{{d.topThis}} !important; }',
        '.larryms-extend .larryms-nav li.larryms-this:hover{background:{{d.topThis}} }',
        '.larryms-fold .larryms-header .larryms-topbar-left .larryms-switch{border-left:1px solid {{d.topThis}} !important;}',
        '.larryms-extend  ul.layui-nav li.layui-nav-item:hover{background:{{d.topThis}} !important;}',
        '.larryms-topbar-right .layui-nav-bar{background-color: {{d.navThis}} !important;}',
        // 左侧
        '.larryms-nav-tree .larryms-this,',
        '.larryms-nav-tree .larryms-this>a{background-color:{{d.navThis}} !important;}',
        '.larryms-body .larryms-left{border-right:2px solid {{d.leftRight}} !important;}',
        '.layui-bg-black{background-color:{{d.leftColor}} !important;}',
        '.larryms-body .larryms-left{background:{{d.leftColor}} !important;}',
        //body
        'ul.larryms-tab-title .layui-this{background:{{d.navThis}} !important;}',
        '.larryms-right .larryms-tab .larryms-title-box{border-bottom:1px solid  {{d.titBottom}};}',
        '.larryms-right .larryms-tab .larryms-title-box .larryms-tab-title{border-bottom:1px solid  {{d.titBottom}};}',
        //footer
        '.larryms-layout .larryms-footer{background:{{d.footColor}} !important;color:{{d.footFont}} !important;}',
      ].join('')).render(options),
      styleElem = document.getElementById(id);
    // 向主体框架中追加主题样式表
    if ('styleSheet' in style) {
      style.setAttribute('type', 'text/css');
      style.styleSheet.cssText = styleText;
    } else {
      style.innerHTML = styleText;
    }
    style.id = id;

    styleElem && $body[0].removeChild(styleElem);
    $body[0].appendChild(style);
    local.theme = local.theme || {};
    layui.each(options, function(k, v) {
      local.theme[k] = v;
    });
    layui.data('larryms', {
      key: 'theme',
      value: local.theme
    });
  };
  var treeMobile = $('.site-tree-mobile'),
    shadeMobile = $('.site-mobile-shade'),
    topMenuMobile = $('#larrymsMobileMenu'),
    topMenuShade = $('#larrymsMobileShade'),
    topbarR = $('#rightMenuButton'),
    topbarRshade = $('#larrymsMobileShadeRmenu');

  treeMobile.on('click', function() {
    $body.addClass('mobile-side-show');
    $('#larry_left').removeClass('pt-page-moveToLeftFade');
    $('#larry_left').addClass('pt-page-moveFromLeft');
  });
  shadeMobile.on('click', function() {
    $body.removeClass('mobile-side-show');
    $('#larry_left').removeClass('pt-page-moveFromLeft');
    $('#larry_left').addClass('pt-page-moveToLeftFade');
  });
  //顶部导航菜单显示
  var TPMflag = false;
  topMenuMobile.on('click', function() {
    if (!TPMflag) {
      $('#larryms_top_menu').show();
      $('#larryms_top_menu').addClass('pt-page-moveFromTop');
      $('#larryms_top_menu').removeClass('pt-page-moveToLeftFade');
      topMenuShade.show();
      TPMflag = true;
      console.log(TPMflag);
    } else {
      $('#larryms_top_menu').removeClass('pt-page-moveFromTop');
      $('#larryms_top_menu').addClass('pt-page-moveToLeftFade');
      topMenuShade.hide();
      TPMflag = false;
      console.log(TPMflag);
    }
    if ($('#larryms_top_menu').hasClass('pt-page-moveFromTop')) {
      if ($('#larry_left').hasClass('pt-page-moveFromLeft')) {
        $('#larry_left').removeClass('pt-page-moveFromLeft');
        $('#larry_left').addClass('pt-page-moveToLeftFade');
        $('.site-mobile-shade').click();
      }
    }
  });
  //顶级导航点击时触发左侧菜单展现 仅移动端有效
  $('#larryms_top_menu').on('click', function() {
    if (TPMflag) {
      topMenuMobile.click();
      treeMobile.click();
    }
  });
  topMenuShade.on('click', function() {
    $(this).hide();
    topMenuMobile.click();
  });
  var rightMenuFlag = false;
  topbarR.on('click', function() {
    var h = $('#topbarRMenu').height();
    if (!rightMenuFlag) {
      $("#topbarR").animate({
        'height': h
      });
      rightMenuFlag = true;
      topbarRshade.show();
    } else {
      $("#topbarR").animate({
        'height': '50px'
      });
      rightMenuFlag = false;
      topbarRshade.hide();
    }
  });
  topbarRshade.on('click', function() {
    $(this).hide();
    topbarR.click();
  });
  $('#topbarRMenu li').on('click', function() {
    if (rightMenuFlag) {
      topbarR.click();
    }
  });


  //主框架响应适配
  MainFrame.prototype.responeDevice = function() {
    var that = this,
      devicesType = larryms.deviceType();
    // 针对larryms主框架页面
    if (devicesType.devices == 'mobile') {
      $body.addClass('larryms-mobile');
      $body.removeClass('larryms-pad');
      // $('#larry_left').addClass('pt-page-moveToLeftFade');


      $('#larry_layout').removeClass('larryms-fold');
      $('#larry_layout').removeClass('larryms-unfold');


    } else if (devicesType.devices == 'pad') {
      $body.addClass('larryms-pad');
      $body.removeClass('larryms-mobile');
      $('#larryms_top_menu').removeClass('pt-page-moveToLeftFade');

      $('#larry_left').addClass('pt-page-moveFromLeft');
      $('#larry_left').removeClass('pt-page-moveToLeftFade');

      $('#larry_layout').removeClass('larryms-mobile-layout');
      $('#larry_layout').addClass('larryms-fold').removeClass('larryms-unfold');
      $('#menufold').children('i.larry-icon').addClass('larry-unfold').removeClass('larry-fold7');

    } else if (devicesType.devices == 'pc') {
      $body.removeClass('larryms-mobile');
      $body.removeClass('larryms-pad');

      $('#larryms_top_menu').removeClass('pt-page-moveToLeftFade');
      $('#larry_left').removeClass('pt-page-moveToLeftFade');
      $('#larry_layout').removeClass('larryms-mobile-layout');
      $('#larry_layout').addClass('larryms-unfold').removeClass('larryms-fold');
      $('#menufold').children('i.larry-icon').addClass('larry-fold7').removeClass('larry-unfold');
    }
  };
  //主题框架主题初始化
  MainFrame.prototype.init = function() {
    var that = this,
      myTheme = layui.data('larryms').theme,
      systemSet = layui.data('larryms').systemSet,
      mobileTabSwitch = layui.data('larryms').mobileTabSwitch;

    that.responeDevice();
    //1、检查系统主题配置是否存在
    if (myTheme !== undefined) {
      that.theme(myTheme);
      if (myTheme.name == 'defaults') {
        $('#Larryms_theme_style').empty();
      }
    }
    //针对移动端
    if (larryms.deviceType().devices == 'mobile') {
      if (mobileTabSwitch == false) {
        that.mobileTab();
      } else if (mobileTabSwitch == undefined) {
        that.mobileTab();
      } else {
        $('#mTabswitch').attr('checked', 'checked');
        $('#larryms_body').addClass('tab-box-show');
        form.render();
      }
    }
    //读取系统设置
    if (systemSet !== undefined) {
      larryTab.tabSet({
        tabSession: systemSet.tabCache,
        autoRefresh: systemSet.tabRefresh,
        isPageEffect: systemSet.pageAnim
      });
      $('#larry_footer').data('show', systemSet.footSet);
    } else {
      //未设置过主题时将larryTab默认配置写入本地存储
      layui.data('larryms', {
        key: 'systemSet',
        value: {
          tabCache: configure.tabSession,
          tabRefresh: configure.tabRefresh,
          topMenuSet: configure.topMenuSet,
          fullScreen: false,
          pageAnim: configure.animations,
          footSet: $('#larry_footer').data('show')
        }
      });
    }

    footerCheck();

  };
  MainFrame.prototype.footInit = function(value) {
    $('#larry_footer').data('show', value);
    footerCheck();
  };
  MainFrame.prototype.fScreen = function(value) {
    if (value) {
      larryms.fullScreen.entry();
    } else {
      larryms.fullScreen.exit();
    }
  }
  MainFrame.prototype.pageAnimInit = function(value) {
    var that = this;
    that.init();
  }
  MainFrame.prototype.menuInit = function() {
    if (layui.data('larryms').topMenuSet !== undefined) {
      top.location.reload(true);
    }
  }
  MainFrame.prototype.mobileTab = function() {
    var mobileTabSwitch = layui.data('larryms').mobileTabSwitch;
    if (mobileTabSwitch) {
      $('#mTabswitch').click();
      $('#larryms_body').addClass('tab-box-show');
      form.render();
    } else {
      $('#mTabswitch').removeAttr("checked");
      form.render();
      $('#larryms_body').removeClass('tab-box-show');
    }
  }
  form.on('switch(mTabswitch)', function(data) {
    if (data.elem.checked) {
      layui.data('larryms', {
        key: 'mobileTabSwitch',
        value: true
      });
      $('#larryms_body').addClass('tab-box-show');
    } else {
      layui.data('larryms', {
        key: 'mobileTabSwitch',
        value: false
      });
      $('#larryms_body').removeClass('tab-box-show');
    }
  });

  function footerCheck() {

    // 页脚开启或关闭
    if ($('#larry_footer').data('show') !== 'on') {
      $('#larry_footer').hide();
      $('#larry_right').css({
        bottom: '0px'
      });
      $('.site-tree-mobile').css({
        bottom: '16px'
      });
    } else {
      $('#larry_footer').show();
      $('#larry_right').css({
        bottom: '40px'
      });
      $('.site-tree-mobile').css({
        bottom: '51px'
      });
    }
  }



  var larryMain = new MainFrame();
  larryMain.init();



/*  //清除缓存
  $('#clearCached').off('click').on('click', function() {
    larryms.cleanCached.clearAll();
    layer.alert('缓存清除完成!本地存储数据也清理成功！', {
      icon: 1,
      title: '系统提示',
      end: function() {
        top.location.href = location.href; //刷新
      }
    });
  });*/
  // 退出系统
  $('#logout').off('click').on('click', function() {
    var url = $(this).data('url');
    layer.confirm('确定退出系统吗?', {
        }, function(){
            top.location.href = url;
        }, function(){
          
        });
  });

  // 键盘按键监听
  $(document).keydown(function() {
    return key(arguments[0]);
  });

  function key(e) {
    var keynum;
    if (window.event) {
      keynum = e.keyCode;
    } else if (e.which) {
      keynum = e.which;
    }
  }

  function startTimer() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    $('#time').html(h + ":" + m + ":" + s);
    t = setTimeout(function() {
      startTimer()
    }, 500);
  }

  //onload之后动态加载主页控制台界面
  function createHomePage() {
    var ifrContent = '<iframe src="' + layui.cache.homeUrl + '" id="ifr-0" data-group="0" data-id="ifr0" lay-id="" name="ifr_0" class="larryms-iframe"></iframe>';
    $('#homePage').append(ifrContent);
  }
  if (window.addEventListener) {
    window.addEventListener('load', createHomePage());
  } else if (window.attachEvent) {
    createHomePage()
  } else {
    window.onload = createHomePage();
  }

  window.onresize = function() {
    larryMain.responeDevice();
  }
  exports('index', larryMain);
});