package com.example.Dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Dao.AbstractDao;
import com.example.Dao.CityCodeDao;
import com.example.Dao.repo.CityCodeRepo;
import com.example.pojo.CityCodeDO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CityCodeDaoImpl extends AbstractDao implements CityCodeDao {

	@PersistenceContext
	protected EntityManager	em;

	@Autowired
	CityCodeRepo			cityCodeRepo;

	@Override
	public CityCodeDO findCityCodeDOById(String id) {
		CityCodeDO cityCode = cityCodeRepo.getOne(id);

		log.info(cityCode != null ? cityCode.getCode() : "未查询到");

		return cityCode;
	}

	@Override
	public List<CityCodeDO> findAll() {
		return cityCodeRepo.findAll();
	}

	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

	@Override
	public void saveOrUpdate(CityCodeDO cityCode) {
		cityCodeRepo.save(cityCode);
	}

}
