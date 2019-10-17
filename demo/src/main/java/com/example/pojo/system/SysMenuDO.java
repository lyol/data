package com.example.pojo.system;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.example.pojo.BaseHibernateModel;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = SysMenuDO.TABLE)
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Getter
@Setter
public class SysMenuDO extends BaseHibernateModel {

	private static final long	serialVersionUID	= 1L;
	public static final String	TABLE				= "SYS_MENU";

	private String				pid;

	private String				title;

	private Integer				type;

	private String				font;

	private String				icon;

	private String				url;

	private String				perms;

	private Integer				sort;

	private String				param;

	private Boolean				spread;

	private Boolean				children;

	private Boolean				status;

	private String				remark;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "menuList")
	@Fetch(FetchMode.SUBSELECT)
	private List<SysRoleDO>	roleList		= new LinkedList<SysRoleDO>();
}