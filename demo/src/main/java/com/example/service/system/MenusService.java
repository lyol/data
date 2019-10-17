package com.example.service.system;

import java.util.List;
import java.util.Set;

import com.example.common.Result;
import com.example.pojo.query.BaseQuery;
import com.example.pojo.system.SysMenuDO;

public interface MenusService {
    Result listMenus(BaseQuery query);

    List<SysMenuDO> list();

    Result save(SysMenuDO menuDO);
    
    SysMenuDO get(String id);
    /**物理删除*/
    Result delete(String id);
    /**逻辑删除*/
    Result remove(SysMenuDO menuDO);

    Result update(SysMenuDO menuDO);
    /**初始化菜单数据*/
    Result listInitMenus(String userName);
    /**授权菜单数据*/
    Result listGrantMenus(Long roleId);
    /**查询客户拥有的菜单权限*/
    Set<String> listPerms(String userName);
}
