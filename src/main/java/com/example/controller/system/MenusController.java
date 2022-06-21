package com.example.controller.system;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.common.Result;
import com.example.controller.BaseController;
import com.example.pojo.query.BaseQuery;
import com.example.pojo.system.SysMenuDO;
import com.example.service.system.MenusService;


@Controller
@RequestMapping("/system")
public class MenusController extends BaseController{
    @Autowired
    private MenusService menusService;

    @GetMapping("/menus")
    public String page(Model model) {
        List<SysMenuDO> menus = menusService.list();
        model.addAttribute("menus", menus);
        return "system/menus";
    }
    
    @GetMapping("/menuedit")
    public String editPage(Model model,String id) {
    	SysMenuDO menuDO = menusService.get(id);
        List<SysMenuDO> menus = menusService.list();
        model.addAttribute("menus", menus);
        model.addAttribute("menu", menuDO);
        return "system/menuedit";
    }
    
    @PostMapping("/menuedit")
    @ResponseBody
    public Result edit(SysMenuDO menuDO) {
        menuDO.setLastUpdateDttm(new Date());
        menuDO.setLastUpdateUser(getUserName());
        return menusService.update(menuDO);
    }

    @PostMapping("/menus/list")
    @ResponseBody
    public Result listMenus(BaseQuery query) {
        Result result = menusService.listMenus(query);
        return result;
    }
    
    @PostMapping("/menus/add")
    @ResponseBody
    public Result saveMenus(SysMenuDO menuDO) {
        menuDO.setCrtUser(getUserName());
        menuDO.setCrtDttm(new Date());
        menuDO.setLastUpdateDttm(new Date());
        menuDO.setLastUpdateUser(getUserName());
        return menusService.save(menuDO);
    }
    
    @PostMapping("/menus/delete")
    @ResponseBody
    public Result delete(String id) {
        return menusService.delete(id);
    }
    
    @PostMapping("/menus/remove")
    @ResponseBody
    public Result remove(String id,Boolean status) {
    	SysMenuDO menuDO = new SysMenuDO();
        menuDO.setId(id);
        menuDO.setStatus(status);
        menuDO.setLastUpdateUser(getUserName());
        menuDO.setLastUpdateDttm(new Date());
        return menusService.remove(menuDO);
    }
    /**初始化菜单数据*/
    @RequestMapping("/menus/init/list")
    @ResponseBody
    public Result initMenus() {
        Result result = menusService.listInitMenus(getUserName());
        return result;
    }
    
    /**授权菜单数据*/
    @RequestMapping("/menus/grant/list")
    @ResponseBody
    public Result grantMenus(Long roleId) {
        Result result = menusService.listGrantMenus(roleId);
        return result;
    }
}
