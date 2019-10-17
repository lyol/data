package com.example.Dao.system;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Dao.AbstractDao;
import com.example.Dao.repo.system.SysUserRepo;
import com.example.pojo.system.SysUserDO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SysUserDao extends AbstractDao{

	@PersistenceContext
	protected EntityManager	em;

	@Autowired
	SysUserRepo			sysUserRepo;
	
	@Override
	protected EntityManager getEntityManager() {
		return em;
	}
	
	public SysUserDO findSysUserById(String id) {
		SysUserDO cityCode = sysUserRepo.getOne(id);
		return cityCode;
	}

	public List<SysUserDO> findAll() {
		return sysUserRepo.findAll();
	}


	public void saveOrUpdate(SysUserDO sysUser) {
		sysUserRepo.save(sysUser);
	}

	
	@SuppressWarnings("unchecked")
	public SysUserDO findSysUserByUserName(String userName) {
		DetachedCriteria dc = DetachedCriteria.forClass(SysUserDO.class);
		dc.add(Restrictions.eq("userName", userName));
		List<SysUserDO> list = super.findByCriteriaWithEnableFlag(dc);
		return list.isEmpty() ? null : list.get(0);
	}
}
