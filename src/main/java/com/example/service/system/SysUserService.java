package com.example.service.system;

import java.util.List;

import com.example.pojo.system.SysUserDO;

public interface SysUserService {

	public SysUserDO findById(String id);

	public List<SysUserDO> findAll();

	public void savaOrUpdate(SysUserDO cityCode);
}
