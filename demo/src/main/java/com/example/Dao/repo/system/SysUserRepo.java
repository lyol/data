package com.example.Dao.repo.system;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pojo.system.SysUserDO;

public interface SysUserRepo extends JpaRepository<SysUserDO, String> {

}
