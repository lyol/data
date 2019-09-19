package com.example.Dao;

import java.util.List;

import com.example.pojo.CityCodeDO;

public interface CityCodeDao {

	public CityCodeDO findCityCodeDOById(String id);

	public List<CityCodeDO> findAll();

	public void saveOrUpdate(CityCodeDO cityCode);
}
