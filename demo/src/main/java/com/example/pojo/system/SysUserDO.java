package com.example.pojo.system;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.example.pojo.BaseHibernateModel;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = SysUserDO.TABLE)
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Getter
@Setter
public class SysUserDO extends BaseHibernateModel {
	private static final long	serialVersionUID	= 1L;
	public static final String	TABLE				= "SYS_USER";

	private String				userName;

	private String				nickName;

	private String				password;
	
	private String				email;

	private String				telephone;

	private String				roleId;
}
