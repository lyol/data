package com.example.pojo;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.example.common.BaseHibernateModel;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Table(name = CityCodeDO.TABLE)
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Data
public class CityCodeDO extends BaseHibernateModel {
	private static final long	serialVersionUID	= 1L;
	public static final String	TABLE				= "AITOU_CITY_CODE";

	String						cityName;								// 城市名称
	String						code;									// 城市代码
	String						cityPinYin;								// 城市拼音
}
