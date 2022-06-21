package com.example.service.impl.system;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Dao.system.SysMenuDao;
import com.example.common.Result;
import com.example.enums.MenuTypeEnum;
import com.example.enums.ResultEnum;
import com.example.pojo.query.BaseQuery;
import com.example.pojo.system.SysMenuDO;
import com.example.pojo.vo.SysMenusVO;
import com.example.service.system.MenusService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class MenusServiceImpl implements MenusService {
    private final static String SUCCESS = "success";
    @Autowired
    private SysMenuDao sysMenuDao;

    @Override
    public Result listMenus(BaseQuery query) {
        PageHelper.startPage(query.getPage(), query.getLimit()); 
        List<SysMenuDO> list = sysMenuDao.findAllEnableFlag();
        //取记录总条数
        PageInfo<SysMenuDO> pageInfo = new PageInfo<SysMenuDO>(list);
        long total = pageInfo.getTotal();
        //创建一个返回值对象
        Result result = new Result(); 
        result.setData(list);
        result.setCount(total);
        return result;
    }

    @Override
    public List<SysMenuDO> list() {
        List<SysMenuDO> list = sysMenuDao.findAllEnableFlag();
        return list;
    }

    @Override
    public Result save(SysMenuDO menuDO) {
        if (menuDO.getSpread() == null) {
            menuDO.setSpread(false);
        }
        if (menuDO.getStatus() == null) {
            menuDO.setStatus(false);
        }
        menuDO.setParam("");
        SysMenuDO sysMenu = sysMenuDao.saveOrUpdate(menuDO);
        if (sysMenu != null) {
           return Result.ok();
        }
        return Result.build(ResultEnum.FAIL.getCode(), "保存菜单失败！");
    }

    @Override
    public SysMenuDO get(String id) {
    	SysMenuDO menu = sysMenuDao.findById(id);
        return menu;
    }

    @Override
    public Result update(SysMenuDO menuDO) {
        if (menuDO.getSpread() == null) {
            menuDO.setSpread(false);
        }
        if (menuDO.getStatus() == null) {
            menuDO.setStatus(false);
        }
        menuDO.setParam("");
        SysMenuDO menu = sysMenuDao.saveOrUpdate(menuDO);
        if (menu != null) {
            return Result.ok();
         }
         return Result.build(ResultEnum.FAIL.getCode(), "修改菜单失败！");
    }

    @Override
    public Result delete(String id) {
    	SysMenuDO menu =  sysMenuDao.logicDeleted(id);
        if (menu != null) {
            return Result.ok();
         }
         return Result.build(ResultEnum.FAIL.getCode(), "删除菜单失败！");
    }

    @Override
    public Result remove(SysMenuDO menuDO) {
    	SysMenuDO menu = sysMenuDao.saveOrUpdate(menuDO);
        if (menu != null) {
            return Result.ok();
         }
         return Result.build(ResultEnum.FAIL.getCode(), "修改菜单状态失败！");
    }

    @Override
    public Result listInitMenus(String userName) {
        List<SysMenusVO> menus = sysMenuDao.listInitMenus(MenuTypeEnum.DIRECTORY.getCode(),null,userName);
        for (SysMenusVO sysMenusVO : menus) {
            if (sysMenusVO.getChildrens() == true) {
                List<SysMenusVO> subMenus = sysMenuDao.listInitMenus(MenuTypeEnum.NAVIGATION.getCode(),sysMenusVO.getId(),userName);
                sysMenusVO.setChildren(subMenus);
                for (SysMenusVO subMenu : subMenus) {
                    if (subMenu.getChildrens() == true) {
                        List<SysMenusVO> threeSubMenus = sysMenuDao.listInitMenus(MenuTypeEnum.NAVIGATION.getCode(),subMenu.getId(),userName);
                        subMenu.setChildren(threeSubMenus);
                    }
                }
            }
        }
        return Result.build(1, SUCCESS, menus);
    }

    @Override
    public Result listGrantMenus(Long roleId) {
		/*List<RolesGrantVO> listGrant = sysMenuDao.listGrantMenus(roleId);
		RolesGrantVO vo = new RolesGrantVO();
		vo.setId((long)0);
		vo.setPid((long)0);
		vo.setTitle("全部");
		vo.setOpen(true);
		listGrant.add(0, vo);
		return Result.ok(listGrant);*/
    	return Result.ok();
    }

    @Override
    public Set<String> listPerms(String userName) {
		/*List<String> perms = sysMenuDao.listUserPerms(userName);
		Set<String> permsSet = new HashSet<>();
		for (String perm : perms) {
		    if (StringUtils.isNotBlank(perm)) {
		        permsSet.addAll(Arrays.asList(perm.trim().split(",")));
		    }
		}
		return permsSet;*/
    	return null;
    }

}
