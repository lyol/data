package com.example.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

import com.example.pojo.system.SysUserDO;

public class BaseController {
    public static Subject getSubjct() {
        return SecurityUtils.getSubject();
    }
    public static SysUserDO getUser() {
        Object object = getSubjct().getPrincipal();
        return (SysUserDO)object;
    }
    public static String getUserId() {
        return getUser().getId();
    }
    public static String getUserName() {
        return getUser().getUserName();
    }
    public static void logout() {
        getSubjct().logout();
    }
}
