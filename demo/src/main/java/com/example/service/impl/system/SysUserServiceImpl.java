package com.example.service.impl.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Dao.system.SysUserDao;
import com.example.pojo.system.SysUserDO;
import com.example.service.system.SysUserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class SysUserServiceImpl implements SysUserService {

	@Autowired
	SysUserDao sysUserDao;

	@Override
	public SysUserDO findById(String id) {
		SysUserDO sysUser = sysUserDao.findSysUserById(id);
		return sysUser;
	}

	@Override
	public List<SysUserDO> findAll() {
		return sysUserDao.findAll();
	}

	@Override
	public void savaOrUpdate(SysUserDO sysUser) {
		sysUserDao.saveOrUpdate(sysUser);
	}

}
