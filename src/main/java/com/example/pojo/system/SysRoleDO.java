package com.example.pojo.system;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.example.pojo.BaseHibernateModel;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = SysRoleDO.TABLE)
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Getter
@Setter
public class SysRoleDO extends BaseHibernateModel {

	private static final long	serialVersionUID	= 1L;
	public static final String	TABLE				= "SYS_ROLE";

	private String				roleName;

	private String				roleCode;

	private String				remark;

	private Boolean				status;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "sys_role_menu", joinColumns = { @JoinColumn(name = "role_id") }, inverseJoinColumns = { @JoinColumn(name = "menu_id") })
	@Fetch(FetchMode.SUBSELECT)
	private List<SysMenuDO> menuList = new LinkedList<SysMenuDO>();
}