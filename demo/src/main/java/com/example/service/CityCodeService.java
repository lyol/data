package com.example.service;

import java.util.List;

import com.example.pojo.CityCodeDO;

public interface CityCodeService {

	public CityCodeDO findById(String id);

	public List<CityCodeDO> findAll();

	public void savaOrUpdate(CityCodeDO cityCode);
}
