package com.example.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Dao.CityCodeDao;
import com.example.pojo.CityCodeDO;
import com.example.service.CityCodeService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class CityCodeServiceImpl implements CityCodeService {

	@Autowired
	CityCodeDao cityCodeDao;

	@Override
	public CityCodeDO findById(String id) {
		CityCodeDO cityCode = cityCodeDao.findCityCodeDOById(id);
		log.info(cityCode != null ? cityCode.getCityName() : "未查询到cityCode");

		return cityCode;
	}

	@Override
	public List<CityCodeDO> findAll() {
		return cityCodeDao.findAll();
	}

	@Override
	public void savaOrUpdate(CityCodeDO cityCode) {
		cityCodeDao.saveOrUpdate(cityCode);
	}

}
