package com.example.config;

import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

import com.example.Dao.system.SysUserDao;
import com.example.common.ApplicationContextRegister;
import com.example.common.Md5Util;
import com.example.pojo.system.SysUserDO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UserRealm extends AuthorizingRealm {
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
        String userName = ((SysUserDO)SecurityUtils.getSubject().getPrincipal()).getUserName();
        // TODO 获取用户权限
        // MenusService menuService = ApplicationContextRegister.getBean(MenusService.class);
        // Set<String> perms = menuService.listPerms(userName);
        Set<String> perms = null;
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        info.setStringPermissions(perms);
        return info;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        String username = (String) token.getPrincipal();
        String password = new String((char[]) token.getCredentials());
        SysUserDO user = null;
        try {
            if (StringUtils.isEmpty(username) && StringUtils.isEmpty(password)) {
                throw new UnknownAccountException("账号或密码不正确");
            }
            SysUserDao sysUserDao = ApplicationContextRegister.getBean(SysUserDao.class);
            user = sysUserDao.findSysUserByUserName(username);
            if (user == null) {
                throw new UnknownAccountException("账号未授权，请联系管理员处理！");
            }
			String userPassword = Md5Util.MD5(password).toLowerCase();
			if (!StringUtils.equals(user.getPassword().toLowerCase(), userPassword)) {
				throw new UnknownAccountException("账号或密码不正确");
			}
        } catch (UnknownAccountException e) {
           log.error(e.getMessage(),e);
           throw new UnknownAccountException(e.getMessage());
        } catch (Exception e) {
           log.error(e.getMessage(),e);
           throw new UnknownAccountException("登录异常，请联系管理员处理！");
        }

        //不使用shiro自带的密码验证
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(user, password, getName());
        return info;
    }

}

