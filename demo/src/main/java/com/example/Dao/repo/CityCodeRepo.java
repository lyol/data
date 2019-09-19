package com.example.Dao.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pojo.CityCodeDO;

public interface CityCodeRepo extends JpaRepository<CityCodeDO, String> {

}
